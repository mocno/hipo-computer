import { MouseEventHandler } from "react";

type ControlUnitProps = {
  running?: boolean;
  onStop?: MouseEventHandler<HTMLButtonElement>;
  onRun?: MouseEventHandler<HTMLButtonElement>;
  onNext?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

export function ControlUnit({ running = false, onStop, onRun, onNext, disabled=false }: ControlUnitProps) {
  return (
    <div className="control-unit">
      <button className="control-button control-button-stop" disabled={!running || disabled} onClick={onStop}>Parar</button>
      <button className="control-button control-button-run" disabled={running || disabled} onClick={onRun}>Iniciar</button>
      <button className="control-button control-button-next" disabled={disabled} onClick={onNext}>Proximo</button>
    </div>
  )
}
