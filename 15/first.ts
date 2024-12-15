import {calcSumOfGpsCoordinates, findNextFreeSpace, getRobotsInitialPosition} from './util.ts'

const [rawState, moves] = Deno.readTextFileSync('15/input.txt').split(/\n\n/)

function step(state: string[][], robot: { y: number; x: number }, motion: { dx: number; dy: number }) {
    const nextFreeSpace = findNextFreeSpace(state, robot, motion)
    if (state[robot.y + motion.dy][robot.x + motion.dx] === '.' || state[robot.y + motion.dy][robot.x + motion.dx] === 'O' && nextFreeSpace) {
        if (state[robot.y + motion.dy][robot.x + motion.dx] === 'O') {
            state[nextFreeSpace.y][nextFreeSpace.x] = 'O'
        }
        state[robot.y][robot.x] = '.'
        state[robot.y + motion.dy][robot.x + motion.dx] = '@'
        robot.y = robot.y + motion.dy
        robot.x = robot.x + motion.dx
    }
}

function watchRobot(state: string[][], moves: string, robot: { y: number, x: number }) {
    const directions = {
        '<': { dy: 0, dx: -1 },
        '^': { dy: -1, dx: 0 },
        '>': { dy: 0, dx: 1 },
        'v': { dy: 1, dx: 0 }
    };

    for (const move of moves) {
        step(state, robot, directions[move]);
    }

    return state
}

const robot = getRobotsInitialPosition(rawState)
const state = rawState.split(/\n/).map(line => line.split(''))
const finalState = watchRobot(state, moves.replaceAll('\n',''), robot)
const sumOfGpsCoordinates = calcSumOfGpsCoordinates(finalState)

console.log(sumOfGpsCoordinates)