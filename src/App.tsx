import { useEffect, useState } from "react";
import "./App.css";
import { ControlUnit } from "./components/ControlUnit";
import { Memory, WordMemory } from "./components/Memory";
// import { INSTRUCTIONS } from "./utils/instructions";
import { Output } from "./components/Output";
import { Processador } from "./utils/parser";

// function InstructionsList() {
//   return (
//     <div className="instructions-list">
//       {INSTRUCTIONS.map(({ code, symbol, help }) => (
//         <div className="instruction-list">
//           <div>{code}</div>
//           <div>{symbol}</div>
//           <div>{help}</div>
//         </div>
//       ))}
//     </div>
//   );
// }

function App() {
  const [cursor, setCursor] = useState(0);
  const [running, setRunning] = useState(false);
  const [values, setValues] = useState(Array.from({ length: 100 }, (_, k) => 1100 + k + 2));
  const [accumulator, setAccumulator] = useState(0);
  const [outputs, setOutputs] = useState("");

  const process = new Processador(values, setValues, accumulator, setAccumulator, setCursor, printInOutput);
  
  function printInOutput(value: string|number) {
    setOutputs(value.toString() + "\n" + outputs)
  }

  function incrementCunsor() {
    setCursor(cursor === 99 ? 0 : cursor + 1)
  }

  useEffect(() =>{
    if (running) {
      process.parse(cursor);

      const id = setTimeout(incrementCunsor, 500);

      return () => clearTimeout(id);
    }
  }, [cursor, running])


  return (
    <div className="App">
      <Memory cursor={cursor} setCursor={setCursor} values={values} />
      <ControlUnit
        onStop={() => setRunning(false)}
        onRun={() => setRunning(true)}
        onNext={incrementCunsor}
        running={running}
      />
      <WordMemory
        value={accumulator}
        position={"Acumulador"}
        disableButtons
      />
      <Output value={outputs} />
    </div>
  );
}

export default App;
