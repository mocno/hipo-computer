import { INSTRUCTIONS_CODE_TO_SYMBOL } from "./instructions";
import { formatNumericRepresentation } from "./representations";

export class Processador
{
    values: number[]
    setValues: React.Dispatch<React.SetStateAction<number[]>>
    accumulator: number
    setAccumulator: React.Dispatch<React.SetStateAction<number>>
    setCursor: React.Dispatch<React.SetStateAction<number>>
    print: (value: string|number) => void

    constructor(
        values: number[],
        setValues: React.Dispatch<React.SetStateAction<number[]>>,
        accumulator: number,
        setAccumulator: React.Dispatch<React.SetStateAction<number>>,
        setCursor: React.Dispatch<React.SetStateAction<number>>,
        print: (value: string|number) => void
    ) {
        this.values = values
        this.setValues = setValues
        this.accumulator = accumulator
        this.setAccumulator = setAccumulator
        this.setCursor = setCursor
        this.print = print
    }

    private getValueOfAddress(address: number) {
        return this.values[address]
    }

    private setValueOfAddress(address: number, value: number)
    {
        this.values[address] = value;
        this.setValues(this.values);
    }

    parse(cursor: number)
    {
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

            let newAccumulator = (this.accumulator + this.getValueOfAddress(addressPart)) % 10000;
            
            this.setAccumulator(newAccumulator);
        } else if (instructionPart === 22) {
            // SUB: Subtraia o contéudo do endereço EE do contéudo do acumulador e guarde  o resultado no acumulador. (AC recebe [AC] - [EE])
            let newAccumulator = (this.accumulator - this.getValueOfAddress(addressPart)) % 10000;

            this.setAccumulator(newAccumulator);
        } else if (instructionPart === 23) {
            // MUL: Multiplique o contéudo do endereço EE com o contéudo do acumulador e  guarde o resultado no acumulador. (AC recebe [AC] * [EE])
            let newAccumulator = (this.accumulator * this.getValueOfAddress(addressPart)) % 10000;

            this.setAccumulator(newAccumulator);
        } else if (instructionPart === 24) {
            // DIV: Divide o contéudo do acumulador pelo contéudo do endereço EE e guarde  o resultado no acumulador. (AC recebe [AC] / [EE])
            let newAccumulator = Math.floor(this.accumulator / this.getValueOfAddress(addressPart)) % 10000;

            this.setAccumulator(newAccumulator);
        } else if (instructionPart === 25) {
            // MOD: [AC] recebe o resto da divisão [AC] / [EE].

            let newAccumulator = (this.accumulator % this.getValueOfAddress(addressPart)) % 10000;

            this.setAccumulator(newAccumulator);
        } else if (instructionPart === 31) {
            // LER: Leia um número e guarde-o no endereço EE. (EE recebe o valor lido)
            
            this.print("Error: o comando LER ainda não foi implementado.");
        } else if (instructionPart === 41)
            // IMP: Imprima o contéudo do endereço EE.

            this.print(this.values[addressPart]);
        else if (instructionPart === 50) {
            // NOP: Nenhuma operação é efetuada.
        } else if (instructionPart === 51) {
            // DES: Desvie a execução para o endereço EE, i.e. AI recebe EE.

            this.setCursor(addressPart)
        } else if (instructionPart === 52) {
            // DPO: Se o contéudo do acumulador for maior do que zero, desvie a execução  para o endereço EE. (Se [AC] > 0, AI recebe EE).

            if (this.accumulator > 0) {
                this.setCursor(addressPart)
            }
        } else if (instructionPart === 53) {
            // DPZ: Se o contéudo do acumulador for maior ou igual a zero, desvie a  execução para o endereço EE. (Se [AC] ≥ 0, AI recebe EE).

            if (this.accumulator >= 0) {
                this.setCursor(addressPart)
            }
        } else if (instructionPart === 54) {
            // DNE: Se o contéudo do acumulador for menor do que zero, desvie a execução  para o endereço EE. (Se [AC] < 0, AI recebe EE.)

            if (this.accumulator < 0) {
                this.setCursor(addressPart)
            }
        } else if (instructionPart === 55) {
            // DNZ: Se o contéudo do acumulador for menor ou igual a zero, desvie a  execução para o endereço EE. (Se [AC] ≤ 0, AI recebe EE).

            if (this.accumulator <= 0) {
                this.setCursor(addressPart)
            }
        } else if (instructionPart === 56) {
            // DDZ: Se o contéudo do acumulador for diferente de zero, desvie a execução  para o endereço EE. (Se [AC] != 0, AI recebe EE).

            if (this.accumulator != 0) {
                this.setCursor(addressPart)
            }
        } else if (instructionPart === 57) {
            // DZZ: Se o contéudo do acumulador for igual a zero, desvie a execução para o  endereço EE. (Se [AC] = 0, AI recebe EE).

            if (this.accumulator == 0) {
                this.setCursor(addressPart)
            }
        } else if (instructionPart === 58) {
            // DDF: Se o conteudo do acumulador for diferente de infinito, desvie a  execução para o endereço EE. (Se [AC] != INF, AI recebe EE).

            this.print("Error: o comando DDF ainda não foi implementado, pois infinito não existe ainda.");
            // if (this.accumulator != -0) { ?
            //     this.setCursor(addressPart)
            // }
        } else if (instructionPart === 59) {
            // DFF: Se o conteudo do acumulador for infinito, desvie a execução para o  endereço EE. (Se [AC] = INF, AI recebe EE).

            this.print("Error: o comando DFF ainda não foi implementado, pois infinito não existe ainda.");
            // if (this.accumulator == -0) { ?
            //     this.setCursor(addressPart)
            // }
        } else if (instructionPart === 61) {
            // ADE: Desloque os digitos do acumulador uma posição à esquerda, desprezando  o digito mais significativo.

            let newAccumulator = (this.accumulator * 10) % 10000;

            this.setAccumulator(newAccumulator);
        } else if (instructionPart === 62) {
            // ADD: Desloque os digitos do acumulador uma posição à direita, desprezando  o digito menos significativo.

            let newAccumulator = Math.floor(this.accumulator / 10);

            this.setAccumulator(newAccumulator);
        } else if (instructionPart === 70) {
            // PAR: Pare a execução do programa. OBS.: Esta instrução deve ser executada para encerrar a execução do programa"

            this.print("Error: o comando PAR ainda não foi implementado.");
        } else
            this.print("Unexpected instruction: " + formatNumericRepresentation(instruction))
    }
}

export function getInstructionPart(instruction: number): keyof typeof INSTRUCTIONS_CODE_TO_SYMBOL
{
    return Math.floor(instruction / 100) as (keyof typeof INSTRUCTIONS_CODE_TO_SYMBOL)
}
export function getAddressPart(instruction: number): number
{
    return instruction % 100;
}
