import { basicState, derivedState } from "triggerchain";
import { makeCancelable } from "triggerchain/src/promiseTools";

const module = "derived";
export const operandAState = basicState<number>(`${module}.operandAState`, {init: 0});
export const operandBState = basicState<number>(`${module}.operandBState`, {init: 0});
export const additionState = derivedState<number>(`${module}.additionState`, {
    derive: ({get}) => {
        const [a, b] = get([operandAState, operandBState]);
        return a + b;
    }
});

export const catFactState = derivedState<string>(`${module}.catFactState`, {
    derive: () => {
        const abort = new AbortController();
        const res = fetch("https://catfact.ninja/fact?max_length=140", {method: "GET", signal: abort.signal});
        const ret = res.then(r => r.json()).then(obj => obj.fact);
        return makeCancelable(ret, abort);
    }
});

export const catBreedsCountState = derivedState<number>(`${module}.catBreedsCountState`, {
    derive: ({use, unwrap}) => {
        const response = unwrap(use(() => fetch("https://catfact.ninja/breeds?limit=1", {method: "GET"}), []));
        const json = unwrap(use(() => response.json(), []));
        return json.last_page;
    }
});

export const catBreedPageState = basicState<number>(`${module}.catBreedPageState`, {init: 1});

export interface CatBreed {
    breed: string;
    country: string;
    origin: string;
    coat: string;
    pattern: string;
}

export const catBreedInfoState = derivedState<CatBreed>(`${module}.catBreedInfoState`, {
    derive: async ({get}) => {
        const page = get(catBreedPageState);
        const res = await fetch("https://catfact.ninja/breeds?limit=1&page=" + page, {method: "GET"});
        const obj = await res.json();
        return obj.data[0];
    }
});
