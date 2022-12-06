import { readInput } from "../../utils/load-input";

enum GameMove {
  Rock = "Rock",
  Paper = "Paper",
  Scissor = "Scissor",
}

class Move {
  constructor(
    public name: string,
    public value: number,
    public win?: Move,
    public lose?: Move
  ) {}
}

function createMoves() {
  const ROCK_MOVE = new Move(GameMove.Rock, 1);
  const PAPER_MOVE = new Move(GameMove.Paper, 2);
  const SCISSOR_MOVE = new Move(GameMove.Scissor, 3);
  ROCK_MOVE.lose = PAPER_MOVE;
  ROCK_MOVE.win = SCISSOR_MOVE;
  PAPER_MOVE.lose = SCISSOR_MOVE;
  PAPER_MOVE.win = ROCK_MOVE;
  SCISSOR_MOVE.lose = ROCK_MOVE;
  SCISSOR_MOVE.win = PAPER_MOVE;
  return { ROCK_MOVE, PAPER_MOVE, SCISSOR_MOVE };
}

const MOVES = createMoves();

class StrategyLine {
  constructor(private opponentMove: Move, private myMove: Move) {}
  calculateScore() {
    const roundValue = this.calculateWinValue();
    return this.myMove.value + roundValue;
  }

  private calculateWinValue() {
    if (this.opponentMove === this.myMove) return 3;
    else if (this.myMove.win === this.opponentMove) return 6;
    else return 0;
  }
}

class Strategy {
  constructor(private lines: StrategyLine[]) {}

  calculateTotalScore() {
    return this.lines.reduce((acc, line) => acc + line.calculateScore(), 0);
  }
}



function inputCharToOpponentGameMove(ch: string) {
  if (ch === "A") return MOVES.ROCK_MOVE;
  else if (ch === "B") return MOVES.PAPER_MOVE;
  else if (ch === "C") return MOVES.SCISSOR_MOVE;
  else throw new Error("invalid input char");
}

enum Tactic {
  Lose = "X",
  Draw = "Y",
  Win = "Z",
}

function calculateStrategy(opponentMove: Move, tactic: Tactic) {
  if (tactic === Tactic.Draw) {
    return opponentMove;
  } else if (tactic === Tactic.Lose) {
    return opponentMove.win;
  } else {
    return opponentMove.lose;
  }
}

function inputLineToStrategyLine(line: string) {
  const [a, b] = line.split(" ");
  const op = inputCharToOpponentGameMove(a);
  if (b !== "X" && b !== "Y" && b !== "Z") {
    throw new Error("invalid input, not XYZ");
  }
  const input2Tactic = { X: Tactic.Lose, Y: Tactic.Draw, Z: Tactic.Win };
  const my = calculateStrategy(op, input2Tactic[b]);
  if (!my) {
    throw new Error("Error in config of moves, undefined");
  }
  return new StrategyLine(op, my);
}

function parseInput(input: string) {
  return input.split("\n").map((line) => inputLineToStrategyLine(line));
}

function main() {
  const input = readInput(__dirname + "/input.txt");
  if (!input) {
    throw new Error("input is falsy");
  }
  const strategyLines = parseInput(input);
  const strategy = new Strategy(strategyLines);
  console.log(strategy.calculateTotalScore());
}

main();
