// https://adventofcode.com/2022/day/2
import { Main } from '~/types';

type PlayerOneHand = 'A' | 'B' | 'C';
type PlayerTwoHand = 'X' | 'Y' | 'Z';

const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;

const playerOneHandMap = {
  A: ROCK,
  B: PAPER,
  C: SCISSORS,
};

const WIN = 6;
const DRAW = 3;
const LOSE = 0;

type Hand = typeof ROCK | typeof PAPER | typeof SCISSORS;
type Outcome = typeof WIN | typeof DRAW | typeof LOSE;

interface Scores {
  playerOne: number;
  playerTwo: number;
}

const outcomes = {
  [ROCK]: {
    [WIN]: PAPER,
    [DRAW]: ROCK,
    [LOSE]: SCISSORS,
  },
  [PAPER]: {
    [WIN]: SCISSORS,
    [DRAW]: PAPER,
    [LOSE]: ROCK,
  },
  [SCISSORS]: {
    [WIN]: ROCK,
    [DRAW]: SCISSORS,
    [LOSE]: PAPER,
  },
};

const getScores = (playerOne: Hand, playerTwo: Hand): Scores => {
  const scores: Scores = {
    playerOne,
    playerTwo,
  };

  if (outcomes[playerOne][WIN] === playerTwo) {
    scores.playerTwo += WIN;
  } else if (outcomes[playerOne][DRAW] === playerTwo) {
    scores.playerOne += DRAW;
    scores.playerTwo += DRAW;
  } else {
    scores.playerOne += WIN;
  }

  return scores;
};

export const partOne: Main = input => {
  const playerTwoHandMap = {
    X: ROCK,
    Y: PAPER,
    Z: SCISSORS,
  };

  const scores = input.split('\n').reduce((acc, line) => {
    if (!line) return acc;
    const [playerOne, playerTwo] = line.split(' ') as [PlayerOneHand, PlayerTwoHand];
    const playerOneShape = playerOneHandMap[playerOne] as Hand;
    const playerTwoShape = playerTwoHandMap[playerTwo] as Hand;
    const lineScores = getScores(playerOneShape, playerTwoShape);
    return {
      playerOne: acc.playerOne + lineScores.playerOne,
      playerTwo: acc.playerTwo + lineScores.playerTwo,
    };
  }, { playerOne: 0, playerTwo: 0 } as Scores);

  return scores.playerTwo;
};

export const partTwo: Main = input => {
  const playerTwoOutcomeMap = {
    X: LOSE,
    Y: DRAW,
    Z: WIN,
  };

  const scores = input.split('\n').reduce((acc, line) => {
    if (!line) return acc;
    const [playerOne, playerTwo] = line.split(' ') as [PlayerOneHand, PlayerTwoHand];
    const playerOneShape = playerOneHandMap[playerOne] as Hand;
    const playerTwoOutcome = playerTwoOutcomeMap[playerTwo] as Outcome;
    const playerTwoShape = outcomes[playerOneShape][playerTwoOutcome] as Hand;
    const lineScores = getScores(playerOneShape, playerTwoShape);
    return {
      playerOne: acc.playerOne + lineScores.playerOne,
      playerTwo: acc.playerTwo + lineScores.playerTwo,
    };
  }, { playerOne: 0, playerTwo: 0 } as Scores);

  return scores.playerTwo;
};
