import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";

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

  return (
    <div
      onClick={onClick}
      className={selected ? "memory-word memory-selected" : "memory-word"}
    >
      <div>
        <span className="memory-position">{position.toString()}</span>
      </div>
      <div className="memory-value">
        <span>
          {value >= 0
            ? "+" + value.toString().padStart(4, "0")
            : "-" + (-value).toString().padStart(4, "0")}
        </span>
      </div>
    </div>
  );
}
