
export function delayed<T>(ms: number, v: T | (() => T)): Promise<T> {
    //need to use any see https://github.com/microsoft/TypeScript/issues/37663
    return new Promise((res) => setTimeout(() => res(typeof v === "function" ? (v as any)() : v), ms));
}
