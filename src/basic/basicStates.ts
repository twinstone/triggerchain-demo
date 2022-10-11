import { basicState } from "triggerchain";
import { selectorState } from "triggerchain";

const module = "basic";
export const simpleState = basicState<string>(`${module}.simpleState`, {init: "Init"});
export const mappedSimpleState = selectorState(simpleState, (fv => fv.map(s => s + "  mapped")));