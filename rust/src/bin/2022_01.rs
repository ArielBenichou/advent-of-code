use std::fs::read_to_string;

fn main() {
    read_to_string("../inputs/2022/01_input.txt")
        .expect("input file should exist")
        .lines()
        .for_each(|line| println!("{}", line));
}
