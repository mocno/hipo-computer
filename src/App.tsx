import { useEffect, useState } from "react";
import "./App.css";
import { ControlUnit } from "./components/ControlUnit";
import { Input } from "./components/Input";
import { Memory, WordMemory } from "./components/Memory";
import { Output } from "./components/Output";
import { Processador, WORD_NOP, WORD_ZERO } from "./utils/parser";

function App() {
  const [cursor, setCursor] = useState<Address>(0);
  const [running, setRunning] = useState(false);
  const [values, setValues] = useState<Word[]>(Array.from({ length: 100 }, (_, k) => WORD_NOP));
  const [accumulator, setAccumulator] = useState<Word>(WORD_ZERO);
  const [outputs, setOutputs] = useState("");
  const [addressInput, setAddressInput] = useState<null|Address>(null);

  const processor = new Processador(values, setValues, accumulator, setAccumulator, setCursor, printInOutput, setRunning, addressInput, setAddressInput);

  function printInOutput(value: Word) {
    setOutputs(value.toString() + "\n" + outputs)
  }

  function incrementCunsor() {
    setCursor(cursor === 99 ? 0 : cursor + 1)
  }

  function step() {
    let lastCursor = cursor;
    incrementCunsor();
    processor.parse(lastCursor);
  }

  useEffect(() =>{
    if (running) {
      const id = setTimeout(step, 500);

      return () => clearTimeout(id);
    }
  })


  return (
    <div className="App">
      <h1>Computador HIPO</h1>
      <Memory
        cursor={cursor}
        setCursor={setCursor}
        values={values}
        setValues={setValues}
      />
      <div className="container-registers">
        <WordMemory
          setValue={setAccumulator}
          value={accumulator}
          label={"Acumulador"}
          disableButtons
        />
        <WordMemory
          value={cursor}
          label={"A.I."}
          disableButtons
        />
      </div>
      <ControlUnit
        onStop={() => setRunning(false)}
        onRun={() => setRunning(true)}
        onNext={incrementCunsor}
        running={running}
        disabled={addressInput!==null}
      />
      <div className="io-container">
        <Output value={outputs} />
        <Input setInput={processor.getInput.bind(processor)} enable={addressInput!==null} />
      </div>
    </div>
  );
}

export default App;
