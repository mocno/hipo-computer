import {
  Component,
  Dispatch,
  MouseEventHandler,
  SetStateAction
} from "react";
import { MdIntegrationInstructions } from "react-icons/md";
import { TiSortNumerically } from "react-icons/ti";
import { formatNumericWord, formatWord, tryInstructionRepresentation } from "../utils/parser";

type MemoryProps = {
  values: Array<Word>;
  cursor: Address;
  setCursor: Dispatch<SetStateAction<Address>>;
  setValues: Dispatch<SetStateAction<Word[]>>;
};

export function Memory({ values, setValues, cursor, setCursor }: MemoryProps) {
  return (
    <div className="memory-ram-display">
      {values.map((value, k: Address) => (
        <WordMemory
          value={value}
          key={k}
          label={k.toString()}
          selected={k === cursor}
          setValue={(newValue) => {
            values[k] = newValue;
            setValues(values);
          }}
          onClick={() => setCursor(k)}
        />
      ))}
    </div>
  );
}

type WordMemoryProps = {
  value: Word;
  setValue?: (value: Word) => void;
  label: string;
  selected?: boolean;
  disableButtons?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

type WordMemoryState = {
  numRepr: boolean;
  value: Word;
};

export class WordMemory extends Component<WordMemoryProps, WordMemoryState> {
  constructor(props: WordMemoryProps) {
    super(props);

    let value = formatWord(this.props.value.toString());

    let numRepr = false;
    let instructionRepr: string | false = tryInstructionRepresentation(this.props.value);

    if (!numRepr && instructionRepr === false) numRepr = true;

    this.state = { numRepr, value };
  }

  componentDidUpdate(prevProps: Readonly<WordMemoryProps>, prevState: Readonly<WordMemoryState>): void {
    if (this.props.value !== prevProps.value) {
      let instructionRepr: string | false = tryInstructionRepresentation(this.props.value.toString());
  
      this.setState({
        value: formatWord(this.props.value.toString()),
        numRepr: this.state.numRepr || instructionRepr === false
      });
    }
  }

  render() {
    let instructionRepr: string | false = tryInstructionRepresentation(
      this.state.value
    );

    return (
      <div className={"memory-word" + (this.props.selected ? " memory-selected" : "")}>
        <div className="memory-word-header">
          <span className="memory-position">{this.props.label}</span>
          {this.props.disableButtons ? undefined : (
            <div className="memory-buttons">
              <MdIntegrationInstructions
                size={15}
                color={
                  this.state.numRepr
                    ? instructionRepr === false
                      ? "#e17784"
                      : "#666666"
                    : "#ffffff"
                }
                onClick={() =>
                  this.state.numRepr && instructionRepr !== false ? this.setState({ numRepr: false }) : undefined
                }
              />
              <TiSortNumerically
                size={15}
                color={this.state.numRepr ? "#ffffff" : "#666666"}
                onClick={() =>
                  !this.state.numRepr ? this.setState({ numRepr: true }) : undefined
                }
              />
            </div>
          )}
        </div>
        <div className="memory-word-value" onClick={this.props.onClick}>
          {this.state.numRepr && this.props.setValue !== undefined ? (
            <input
              className="memory-word-input"
              maxLength={5}
              value={ this.state.value }
              onChange={(event) => {
                let value = event.target.value.replaceAll(/[^\d+-]/g, "");

                this.updateValue(value);
              }}
              onBlur={() => {
                let value = formatWord(this.state.value as string);

                this.updateValue(value);
              }}
            />
          ) : (
            <span>{
              this.state.numRepr ? formatNumericWord(this.state.value) : instructionRepr
            }</span>
          )}
        </div>
      </div>
    );
  }

  updateValue(value: string) {
    this.setState({ value });

    if (this.props.setValue !== undefined)
      this.props.setValue(this.state.value);
  }
}
