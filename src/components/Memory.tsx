import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";
import { MdIntegrationInstructions } from "react-icons/md";
import { TiSortNumerically } from "react-icons/ti";
import { INSTRUCTIONS_CODE_TO_SYMBOL } from "../utils/instructions";

type MemoryProps = {
  cursor: number,
  setCursor: Dispatch<SetStateAction<number>>
}

export function Memory({cursor, setCursor}: MemoryProps) {
  return (
    <div className="memory-ram-display">
      {Array.from({ length: 100 }, (_, k) => (
        <WordMemory
          key={k}
          position={k}
          selected={k === cursor}
          onClick={() => setCursor(k)}
        />
      ))}
    </div>
  );
}

type WordMemoryParms = {
  position: Number;
  selected: Boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
};

function WordMemory({ position, selected, onClick }: WordMemoryParms) {
  const [value, _setValue] = useState(
    Math.floor(Math.random() * 9999 * 2 - 9999)
  );
  const [numRepr, setNumRepr] = useState(false);

  function formatNumericRepresentation(value: number) {
    return value >= 0
      ? "+" + value.toString().padStart(4, "0")
      : "-" + (-value).toString().padStart(4, "0")
  }

  function tryInstructionRepresentation(value: number) {
    if (value < 0)
      return false;

    let instructionPart = Math.floor(value / 100) as (keyof typeof INSTRUCTIONS_CODE_TO_SYMBOL);
    let addressPart = value % 100;

    if (!(instructionPart in INSTRUCTIONS_CODE_TO_SYMBOL))
      return false;
  
    return INSTRUCTIONS_CODE_TO_SYMBOL[instructionPart] + " " + addressPart;
  }

  let instructionRepr = tryInstructionRepresentation(value);

  if (instructionRepr === false && !numRepr) {
    setNumRepr(true);
  }

  return (
    <div
      className={selected ? "memory-word memory-selected" : "memory-word"}
    >
      <div className="memory-word-header">
        <span className="memory-position">{position.toString()}</span>
        <div className="memory-buttons">
          <MdIntegrationInstructions size={15} color={
            numRepr ? (instructionRepr === false ? "#e17784" : "#666666") : "#ffffff"
          } />
          <TiSortNumerically size={15} color={
            numRepr ? "#ffffff" : "#666666"
          }/>
        </div>
      </div>
      <div className="memory-word-value" onClick={onClick}>
        <span>{
          instructionRepr !== false ?
          instructionRepr :
          formatNumericRepresentation(value)
        }</span>
      </div>
    </div>
  );
}
