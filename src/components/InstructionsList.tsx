import { INSTRUCTIONS } from "../utils/instructions";

export default function InstructionsList() {
  return (
    <div className="instructions-list">
      {INSTRUCTIONS.map(({ code, symbol, help }) => (
        <div className="instruction-list">
          <div>{code}</div>
          <div>{symbol}</div>
          <div>{help}</div>
        </div>
      ))}
    </div>
  );
}