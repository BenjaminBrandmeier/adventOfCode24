import {Lists} from "./types.ts";

export const sum = (arr: number[]) => arr.reduce((acc, b) => acc + b)
export const toLists = (acc: Lists, b: number[]) => {
    return {left: [...acc.left, b[0]], right: [...acc.right, b[1]]}
}
