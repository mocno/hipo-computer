import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";
import { MdIntegrationInstructions } from "react-icons/md";
import { TiSortNumerically } from "react-icons/ti";
import { formatNumericRepresentation, tryInstructionRepresentation } from "../utils/representations";

type MemoryProps = {
  values: number[];
  cursor: number;
  setCursor: Dispatch<SetStateAction<number>>;
}

export function Memory({ values, cursor, setCursor}: MemoryProps) {
  return (
    <div className="memory-ram-display">
      {
        values.map((value, k) => (
          <WordMemory
            value={value}
            key={k}
            position={k}
            selected={k === cursor}
            onClick={() => setCursor(k)}
          />
        ))
      }
    </div>
  );
}

type WordMemoryParms = {
  value: number;
  position: number|string;
  selected?: boolean;
  disableButtons?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

export function WordMemory({ value, position, selected=false, disableButtons=false, onClick }: WordMemoryParms) {
  const [numRepr, setNumRepr] = useState(false);

  let instructionRepr = tryInstructionRepresentation(value);

  if (instructionRepr === false && !numRepr) {
    setNumRepr(true);
  }

  let representation;
  if (numRepr)
    representation = formatNumericRepresentation(value)
  else if (instructionRepr === false)
    setNumRepr(true);
  else 
    representation = instructionRepr;

  return (
    <div
      className={selected ? "memory-word memory-selected" : "memory-word"}
    >
      <div className="memory-word-header">
        <span className="memory-position">{position.toString()}</span>
        {
          disableButtons ? null :
          <div className="memory-buttons">
            <MdIntegrationInstructions size={15} color={
              numRepr ? (instructionRepr === false ? "#e17784" : "#666666") : "#ffffff"
            } onClick={() => numRepr ? setNumRepr(false) : null} />
            <TiSortNumerically size={15} color={
              numRepr ? "#ffffff" : "#666666"
            } onClick={() => !numRepr ? setNumRepr(true) : null}/>
          </div>
        }
      </div>
      <div className="memory-word-value" onClick={onClick}>
        {
          numRepr ?
          <input className="memory-word-input" maxLength={5} value={ representation as string }/> :
          <span>{ representation }</span>
        }
      </div>
    </div>
  );
}
