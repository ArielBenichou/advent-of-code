use std::fs::read_to_string;
fn main() {
    println!("--- Part 1 ---");
    part1();
    println!("--- Part 2 - Memory Efficient ---");
    part2();
    println!("--- Part 2 - Classic ---");
    part2alt();
}

// Part 2

fn part1() {
    let mut max = 0;
    let mut current = 0;

    read_to_string("../inputs/2022/01_input.txt")
        .expect("input file should exist")
        .lines()
        .for_each(|line| {
            if line.is_empty() {
                max = if max >= current { max } else { current };
                current = 0;
                return;
            }
            current += line
                .parse::<u32>()
                .expect("string to be parsed as a number");
        });
    if current != 0 {
        max = if max >= current { max } else { current };
    }
    println!("the max calorie carried by one elf is {max}");
}

// Part 2

fn part2alt() {
    let mut max = Vec::new();
    let mut current = 0;

    read_to_string("../inputs/2022/01_input.txt")
        .expect("input file should exist")
        .lines()
        .for_each(|line| {
            if line.is_empty() {
                max.push(current);
                current = 0;
                return;
            }
            current += line
                .parse::<u32>()
                .expect("string to be parsed as a number");
        });
    if current != 0 {
        max.push(current);
    }
    max.sort();
    println!(
        "the max calorie carried by the top three elves is {:?}, ({:?})",
        max.iter().rev().take(3).sum::<u32>(),
        max.iter().rev().take(3).collect::<Vec<&u32>>()
    );
}
fn part2() {
    let mut max = [0; 3];
    let mut current = 0;

    read_to_string("../inputs/2022/01_input.txt")
        .expect("input file should exist")
        .lines()
        .for_each(|line| {
            if line.is_empty() {
                shift_if_bigger(&mut max, current);
                current = 0;
                return;
            }
            current += line
                .parse::<u32>()
                .expect("string to be parsed as a number");
        });
    if current != 0 {
        shift_if_bigger(&mut max, current);
    }
    println!(
        "the max calorie carried by the top three elves is {:?}, ({:?})",
        max.iter().sum::<u32>(),
        max
    );
}

fn shift_if_bigger<T: PartialOrd + Copy + std::fmt::Debug>(arr: &mut [T], value: T) {
    for i in 0..arr.len() {
        if value > arr[i] {
            shift_from_index(arr, i);
            arr[i] = value;
            break;
        }
    }
}

fn shift_from_index<T: Copy + std::fmt::Debug>(arr: &mut [T], idx: usize) {
    let mut i = arr.len() - 2;
    while i >= idx {
        arr[i + 1] = arr[i];
        if i == 0 {
            break;
        } else {
            i -= 1;
        }
    }
}

#[cfg(test)]
mod tests {
    use crate::shift_from_index;

    #[test]
    fn shift_from_start() {
        let mut result = [1, 2, 3, 4];
        shift_from_index(&mut result, 0);
        assert_eq!(result, [1, 1, 2, 3]);
    }

    #[test]
    fn shift_from_middle() {
        let mut result = [1, 2, 3, 4];
        shift_from_index(&mut result, 2);
        assert_eq!(result, [1, 2, 3, 3]);
    }

    #[test]
    fn shift_from_end() {
        let mut result = [1, 2, 3, 4];
        let len = result.len().clone() - 1;
        shift_from_index(&mut result, len);
        assert_eq!(result, [1, 2, 3, 4]);
    }
}
