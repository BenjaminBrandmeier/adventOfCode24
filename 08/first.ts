import {checkRange} from './util.ts'

const input = Deno.readTextFileSync('02/input2.txt').split(/\n/);
const isValid = checkRange(input.length)

function prepareAntennas(input: string[]) {
    const antennas = new Map<string, [string, string]>();

    input.forEach((line: string, y: number) => line.split('')
        .forEach((frequency: string, x: number) => {
            if (antennas.has(frequency)) {
                antennas.get(frequency).push([y, x])
            } else if (frequency !== '.') {
                antennas.set(frequency, [[y, x]])
            }
        }))
    return antennas;
}

function calcAntinodes(antennas) {
    const antinodes = new Set<string>()

    antennas.forEach(frequencies => frequencies
        .forEach((frequency) => {
            frequencies.forEach(other => {
                const distance = [frequency[0] - other[0], frequency[1] - other[1]]
                const candidate: [number, number] = [frequency[0] + distance[0], frequency[1] + distance[1]]

                if (isValid(candidate) && candidate[0] !== frequency[0] && candidate[1] !== frequency[1]) {
                    antinodes.add(candidate[0] + ',' + candidate[1])
                }
            })
        }))
    return [...antinodes]
}

const antennas = prepareAntennas(input);
const antinodes = calcAntinodes(antennas);

console.log(antinodes.length);