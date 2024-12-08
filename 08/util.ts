export const checkRange = (max: number) => (antinode: [number, number]) =>
    antinode[0] >= 0 && antinode[0] < max && antinode[1] >= 0 && antinode[1] < max
