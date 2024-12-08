import {checkRange} from './util.ts'

const input = Deno.readTextFileSync('02/input2.txt').split(/\n/);
const isValid = checkRange(input.length)

function prepareAntennas(input: string[]) {
    const mapOfAntennas = new Map<string, [string, string]>();

    input.forEach((line: string, y: number) => line.split('')
        .forEach((frequency: string, x: number) => {
            if (mapOfAntennas.has(frequency)) {
                mapOfAntennas.get(frequency).push([y, x])
            } else if (frequency !== '.') {
                mapOfAntennas.set(frequency, [[y, x]])
            }
        }))

    const antennas = [...mapOfAntennas.values()].flat().map(a => a[0] + ',' + a[1])
    return [mapOfAntennas, antennas]
}

function calcAntinodes(mapOfAntennas: Map<string, [number, number][]>, antennas: []): Set<string> {
    const antinodes = new Set<string>()

    mapOfAntennas.forEach((frequencies: [number, number][]) => frequencies
        .forEach((frequency: [number, number]) => {
            frequencies.forEach((other: [number, number]) => {
                const distance = [frequency[0] - other[0], frequency[1] - other[1]]
                let candidate: [number, number] = [frequency[0], frequency[1]]

                for (let i = 0; i < input.length; i++) {
                    candidate = [candidate[0] + distance[0], candidate[1] + distance[1]]

                    if (!isValid(candidate)) break;

                    const antinode = candidate[0] + ',' + candidate[1]
                    if (!antennas.some(a => antinode === a)) {
                        antinodes.add(antinode)
                    }
                }
            })
        }))

    return [...antinodes]
}

const [mapOfAntennas, antennas] = prepareAntennas(input)
const antinodes = calcAntinodes(mapOfAntennas, antennas)

console.log(antinodes.length + antennas.length)