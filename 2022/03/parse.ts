import { Rucksack } from "./Rucksack";

export function parseInput(input: string) {
    return input.split("\n").map(line => Rucksack.fromString(line));
}