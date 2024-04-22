import { INSTRUCTIONS_CODE_TO_SYMBOL } from "./instructions";
import { getInstructionPart } from "./parser";

export function formatNumericRepresentation(value: number) {
    return value >= 0
        ? "+" + value.toString().padStart(4, "0")
        : "-" + (-value).toString().padStart(4, "0")
}

export function tryInstructionRepresentation(value: number) {
    if (value < 0)
        return false;

    let instructionPart = getInstructionPart(value);
    let addressPart = value % 100;

    if (!(instructionPart in INSTRUCTIONS_CODE_TO_SYMBOL))
        return false;

    return INSTRUCTIONS_CODE_TO_SYMBOL[instructionPart] + " " + addressPart;
}

