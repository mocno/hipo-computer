import { useEffect, useState } from "react";
import "./App.css";
import { ControlUnit } from "./components/ControlUnit";
import { Memory } from "./components/Memory";
import { INSTRUCTIONS } from "./utils/instructions";

function InstructionsList() {
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

function App() {
  const [cursor, setCursor] = useState(0);
  const [running, setRunning] = useState(false);

  function incrementCunsor() {
    setCursor(cursor == 99 ? 0 : cursor + 1)
  }

  useEffect(() =>{
    if (running) {
      const id = setTimeout(incrementCunsor, 500);

      return () => clearTimeout(id);
    }
  }, [cursor, running])


  return (
    <div className="App">
      <Memory cursor={cursor} setCursor={setCursor} />
      <ControlUnit
        onStop={() => setRunning(false)}
        onRun={() => setRunning(true)}
        onNext={incrementCunsor}
        running={running}
      />
    </div>
  );
}

export default App;
