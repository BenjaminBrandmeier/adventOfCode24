import {Lists} from "./types.ts";
import {toLists, sum} from "./util.ts";

export const locationIds = Deno.readTextFileSync('01/input2.txt')
    .split(/\n/)
    .map((line: string) => /(\d+)\s{3}(\d+)/.exec(line))
    .map((match: number[]) => [Number(match[1]), Number(match[2])])
    .reduce(toLists, {left: [], right: []})

const sortedLocationIds: Lists = {left: locationIds.left.sort(), right: locationIds.right.sort()}
const distances = sortedLocationIds.left.map((a, index) => Math.abs(a - sortedLocationIds.right[index]))
const similarities = sortedLocationIds.left.map(a => a * sortedLocationIds.right.filter(b => b === a).length)

console.log(sum(distances), sum(similarities))