import { MouseEventHandler } from "react";

type ControlUnitProps = {
    running?: boolean;
    onStop?: MouseEventHandler<HTMLButtonElement>;
    onRun?: MouseEventHandler<HTMLButtonElement>;
    onNext?: MouseEventHandler<HTMLButtonElement>;
};

export function ControlUnit({ running, onStop, onRun, onNext }: ControlUnitProps) {
    return (
    <div className="control-unit">
        <button className="control-button control-button-stop" disabled={!running} onClick={onStop}>Parar</button>
        <button className="control-button control-button-run" disabled={running} onClick={onRun}>Iniciar</button>
        <button className="control-button control-button-next" onClick={onNext}>Proximo</button>
    </div>
    )
}