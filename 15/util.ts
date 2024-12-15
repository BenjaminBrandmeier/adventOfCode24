export function getRobotsInitialPosition(rawState: any) {
    const size = rawState.indexOf('\n')
    const robotIndex = rawState.split(/\n/).join('').indexOf('@');
    return {y: Math.floor(robotIndex/size), x: Math.floor(robotIndex%size)}
}

export function calcSumOfGpsCoordinates(state: string[][]): number {
    return state.reduce((totalSum, line, y) =>
        totalSum + line.reduce((lineSum, point, x) =>
            lineSum + (point === 'O' ? 100 * y + x : 0), 0), 0);
}

export function findNextFreeSpace(state: string[][], check: { y: number; x: number; }, motion: {dy: number, dx: number}) {
    if (state[check.y][check.x] === '#') {
        return undefined;
    }
    if (state[check.y][check.x] === '.') {
        return {y: check.y, x: check.x};
    }
    return findNextFreeSpace(state, {y: check.y+motion.dy, x: check.x+motion.dx}, motion)
}