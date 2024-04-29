import { INSTRUCTIONS_CODE_TO_SYMBOL } from "./instructions";

const WORD_REGEX = /^.*?(?<sign>[+-]?)(?<value>\d{0,4}).*$/g;
export const WORD_ZERO = "+0000";
export const WORD_NOP = "+5000";
export const WORD_INFINITE = "-0000";

export class Processador {
  values: Word[];
  setValues: React.Dispatch<React.SetStateAction<Word[]>>;
  accumulator: Word;
  setAccumulator: React.Dispatch<React.SetStateAction<Word>>;
  setCursor: React.Dispatch<React.SetStateAction<Address>>;
  print: (value: string | Address) => void;
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;
  addressInput: Address | null;
  setAddressInput: React.Dispatch<React.SetStateAction<Address|null>>;

  constructor(
    values: Word[],
    setValues: React.Dispatch<React.SetStateAction<Word[]>>,
    accumulator: Word,
    setAccumulator: React.Dispatch<React.SetStateAction<Word>>,
    setCursor: React.Dispatch<React.SetStateAction<Address>>,
    print: (value: string | Word) => void,
    setRunning: React.Dispatch<React.SetStateAction<boolean>>,
    addressInput: Address | null,
    setAddressInput: React.Dispatch<React.SetStateAction<Address|null>>
  ) {
    this.values = values;
    this.setValues = setValues;
    this.accumulator = accumulator;
    this.setAccumulator = setAccumulator;
    this.setCursor = setCursor;
    this.print = print;
    this.setRunning = setRunning;
    this.addressInput = addressInput;
    this.setAddressInput = setAddressInput;
  }

  private getValueOfAddress(address: Address) {
    return this.values[address];
  }

  private setValueOfAddress(address: Address, value: Word) {
    this.values[address] = value;
    this.setValues(this.values);
  }

  parse(cursor: Address) {
    const instruction = this.getValueOfAddress(cursor);
    const instructionPart = getInstructionPart(instruction);
    const addressPart = getAddressPart(instruction);

    if (instructionPart === 11) {
      // CEA: Copie o contéudo do endereço EE no acumulador. (AC recebe [EE]).

      this.setAccumulator(this.getValueOfAddress(addressPart));
    } else if (instructionPart === 12) {
      // CAE: Copie o contéudo do acumulador no endereço EE. (EE recebe [AC])

      this.setValueOfAddress(addressPart, this.accumulator);
    } else if (instructionPart === 21) {
      // SOM: Some o contéudo do endereço EE com o contéudo do acumulador e guarde o  resultado no acumulador. (AC recebe [AC] + [EE])

      let value = this.getValueOfAddress(addressPart);

      if (
        value === WORD_INFINITE ||
        this.accumulator === WORD_INFINITE
      )
        this.setAccumulator(WORD_INFINITE);
      else {
        let newAccumulator = (Number(this.accumulator) + Number(value)) % 10000;

        this.setAccumulator(newAccumulator);
      }
    } else if (instructionPart === 22) {
      // SUB: Subtraia o contéudo do endereço EE do contéudo do acumulador e guarde  o resultado no acumulador. (AC recebe [AC] - [EE])

      let value = this.getValueOfAddress(addressPart);

      if (
        value === WORD_INFINITE ||
        this.accumulator === WORD_INFINITE
      )
        this.setAccumulator(WORD_INFINITE);
      else {
        let newAccumulator = (Number(this.accumulator) - Number(value)) % 10000;

        this.setAccumulator(newAccumulator);
      }
    } else if (instructionPart === 23) {
      // MUL: Multiplique o contéudo do endereço EE com o contéudo do acumulador e  guarde o resultado no acumulador. (AC recebe [AC] * [EE])

      let value = this.getValueOfAddress(addressPart);

      if (
        value === WORD_INFINITE ||
        this.accumulator === WORD_INFINITE
      )
        this.setAccumulator(WORD_INFINITE);
      else {
        let newAccumulator = (Number(this.accumulator) * Number(value)) % 10000;

        this.setAccumulator(newAccumulator);
      }
    } else if (instructionPart === 24) {
      // DIV: Divide o contéudo do acumulador pelo contéudo do endereço EE e guarde  o resultado no acumulador. (AC recebe [AC] / [EE])

      let value = this.getValueOfAddress(addressPart);

      if (this.accumulator === WORD_INFINITE || Number(value) === 0)
        this.setAccumulator(WORD_INFINITE);
      else {
        let newAccumulator =
          Math.floor(Number(this.accumulator) / Number(value)) % 10000;

        this.setAccumulator(newAccumulator);
      }
    } else if (instructionPart === 25) {
      // MOD: [AC] recebe o resto da divisão [AC] / [EE].

      let value = this.getValueOfAddress(addressPart);

      if (this.accumulator === WORD_INFINITE || Number(value) === 0)
        this.setAccumulator(WORD_INFINITE);
      else {
        let newAccumulator = (Number(this.accumulator) % Number(value)) % 10000;

        this.setAccumulator(newAccumulator);
      }
    } else if (instructionPart === 31) {
      // LER: Leia um número e guarde-o no endereço EE. (EE recebe o valor lido)

      this.setRunning(false);
      this.setAddressInput(addressPart);
    } else if (instructionPart === 41)
      // IMP: Imprima o contéudo do endereço EE.

      this.print(this.values[addressPart]);
    else if (instructionPart === 50) {
      // NOP: Nenhuma operação é efetuada.
    } else if (instructionPart === 51) {
      // DES: Desvie a execução para o endereço EE, i.e. AI recebe EE.

      this.setCursor(addressPart);
    } else if (instructionPart === 52) {
      // DPO: Se o contéudo do acumulador for maior do que zero, desvie a execução  para o endereço EE. (Se [AC] > 0, AI recebe EE).

      if (
        this.accumulator !== WORD_INFINITE &&
        Number(this.accumulator) > 0
      ) {
        this.setCursor(addressPart);
      }
    } else if (instructionPart === 53) {
      // DPZ: Se o contéudo do acumulador for maior ou igual a zero, desvie a  execução para o endereço EE. (Se [AC] ≥ 0, AI recebe EE).

      if (
        this.accumulator !== WORD_INFINITE &&
        Number(this.accumulator) >= 0
      ) {
        this.setCursor(addressPart);
      }
    } else if (instructionPart === 54) {
      // DNE: Se o contéudo do acumulador for menor do que zero, desvie a execução  para o endereço EE. (Se [AC] < 0, AI recebe EE.)

      if (
        this.accumulator !== WORD_INFINITE &&
        Number(this.accumulator) < 0
      ) {
        this.setCursor(addressPart);
      }
    } else if (instructionPart === 55) {
      // DNZ: Se o contéudo do acumulador for menor ou igual a zero, desvie a  execução para o endereço EE. (Se [AC] ≤ 0, AI recebe EE).

      if (
        this.accumulator !== WORD_INFINITE &&
        Number(this.accumulator) <= 0
      ) {
        this.setCursor(addressPart);
      }
    } else if (instructionPart === 56) {
      // DDZ: Se o contéudo do acumulador for diferente de zero, desvie a execução  para o endereço EE. (Se [AC] != 0, AI recebe EE).

      if (
        this.accumulator !== WORD_INFINITE &&
        Number(this.accumulator) !== 0
      ) {
        this.setCursor(addressPart);
      }
    } else if (instructionPart === 57) {
      // DZZ: Se o contéudo do acumulador for igual a zero, desvie a execução para o  endereço EE. (Se [AC] = 0, AI recebe EE).

      if (
        this.accumulator !== WORD_INFINITE &&
        Number(this.accumulator) === 0
      ) {
        this.setCursor(addressPart);
      }
    } else if (instructionPart === 58) {
      // DDF: Se o conteudo do acumulador for diferente de infinito, desvie a  execução para o endereço EE. (Se [AC] != INF, AI recebe EE).

      if (this.accumulator !== WORD_INFINITE) {
        this.setCursor(addressPart);
      }
    } else if (instructionPart === 59) {
      // DFF: Se o conteudo do acumulador for infinito, desvie a execução para o  endereço EE. (Se [AC] = INF, AI recebe EE).

      if (this.accumulator === WORD_INFINITE) {
        this.setCursor(addressPart);
      }
    } else if (instructionPart === 61) {
      // ADE: Desloque os digitos do acumulador uma posição à esquerda, desprezando  o digito mais significativo.

      if (this.accumulator === WORD_INFINITE)
        this.setAccumulator(WORD_INFINITE);
      else {
        let newAccumulator = (Number(this.accumulator) * 10) % 10000;

        this.setAccumulator(newAccumulator);
      }
    } else if (instructionPart === 62) {
      // ADD: Desloque os digitos do acumulador uma posição à direita, desprezando  o digito menos significativo.

      if (this.accumulator === WORD_INFINITE)
        this.setAccumulator(WORD_INFINITE);
      else {
        let newAccumulator = Math.floor(Number(this.accumulator) / 10);

        this.setAccumulator(newAccumulator);
      }
    } else if (instructionPart === 70) {
      // PAR: Pare a execução do programa. OBS.: Esta instrução deve ser executada para encerrar a execução do programa"

      this.setRunning(false);
    } else {
      this.print(
        "Unknown instruction: " + formatNumericWord(instruction)
      );
      this.setRunning(false);
    }
  }

  getInput(value: string) {
    let word = formatWord(value);

    if (this.addressInput !== null) {
      this.setValueOfAddress(this.addressInput, word);
      this.setAddressInput(null);
    }

    this.setRunning(true);
  }
}

export function getInstructionPart(
  instruction: Word
): keyof typeof INSTRUCTIONS_CODE_TO_SYMBOL {
  return Math.floor(
    Number(instruction) / 100
  ) as keyof typeof INSTRUCTIONS_CODE_TO_SYMBOL;
}
export function getAddressPart(instruction: Word): Address {
  return Number(instruction) % 100;
}

export function formatNumericWord(numeric: Word) {
  let value = Number(numeric);

  return value >= 0
    ? "+" + value.toString().padStart(4, "0")
    : "-" + (-value).toString().padStart(4, "0");
}

export function tryInstructionRepresentation(instruction: Word) {
  let instructionPart = getInstructionPart(instruction);

  if (instructionPart < 0) return false;

  let addressPart = getAddressPart(instruction);

  if (!(instructionPart in INSTRUCTIONS_CODE_TO_SYMBOL)) return false;

  return INSTRUCTIONS_CODE_TO_SYMBOL[instructionPart] + " " + addressPart;
}

export function formatWord(value: string): string
{
  WORD_REGEX.lastIndex = 0;
  let result = WORD_REGEX.exec(value);

  if (result === null || result.groups === undefined)
    return WORD_ZERO;

  let sign = result.groups.sign === "-" ? "-" : "+"

  return sign + result.groups.value.padStart(4, "0")
}
