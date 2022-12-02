// https://adventofcode.com/2022/day/2
import { Main } from '~/types';

const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;

type Hand = typeof ROCK | typeof PAPER | typeof SCISSORS;
type Result = 'draw' | 'playerOne' | 'playerTwo';

const hands = {
  A: ROCK,
  B: PAPER,
  C: SCISSORS,
  X: ROCK,
  Y: PAPER,
  Z: SCISSORS,
};

const scores = {
  lose: 0,
  draw: 3,
  win: 6,
}

const getResult = (playerOne: Hand, playerTwo: Hand): Result => {
  if (playerOne === playerTwo) {
    return 'draw';
  }

  if (playerOne === ROCK && playerTwo === SCISSORS) {
    return 'playerOne';
  }

  if (playerOne === PAPER && playerTwo === ROCK) {
    return 'playerOne';
  }

  if (playerOne === SCISSORS && playerTwo === PAPER) {
    return 'playerOne';
  }

  return 'playerTwo';
};

const getScores = (input: string): number[] => {
  const lines = input.split('\n');
  let playerOneScore = 0;
  let playerTwoScore = 0;
  lines.forEach(line => {
    if (!line) return;
    const [playerOne, playerTwo] = line.split(' ').map(hand => hands[hand as keyof typeof hands] as Hand);
    playerOneScore += playerOne;
    playerTwoScore += playerTwo;

    const result = getResult(playerOne, playerTwo);
    if (result === 'draw') {
      playerOneScore += scores.draw;
      playerTwoScore += scores.draw;
    } else if (result === 'playerOne') {
      playerOneScore += scores.win;
      playerTwoScore += scores.lose;
    } else if (result === 'playerTwo') {
      playerOneScore += scores.lose;
      playerTwoScore += scores.win;
    }
  });

  return [playerOneScore, playerTwoScore];
};

export const partOne: Main = input => {
  const [_, myScore] = getScores(input);
  return myScore;
};
