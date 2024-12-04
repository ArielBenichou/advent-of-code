const std = @import("std");

fn solution(path: []const u8) !u64 {
    var arena = std.heap.ArenaAllocator.init(std.heap.page_allocator);
    defer arena.deinit();
    const allocator = arena.allocator();
    const sum = try readCommandsSum(allocator, path);
    return sum;
}

fn readCommandsSum(allocator: std.mem.Allocator, path: []const u8) !u64 {
    var file = try std.fs.cwd().openFile(path, .{});
    defer file.close();

    var buf_reader = std.io.bufferedReader(file.reader());
    const reader = buf_reader.reader();

    var line = std.ArrayList(u8).init(allocator);
    defer line.deinit();

    const writer = line.writer();
    var sum: u64 = 0;

    while (reader.streamUntilDelimiter(writer, '\n', null)) {
        // Clear the line so we can reuse it.
        defer line.clearRetainingCapacity();

        // ACTION
        sum += sumMulCommandInLine(line.items);
        // std.debug.print("BIG SUM: {}\n", .{sum});
    } else |err| switch (err) {
        error.EndOfStream => { // end of file
            if (line.items.len > 0) {
                sum += sumMulCommandInLine(line.items);
            }
        },
        else => return err, // Propagate error
    }
    return sum;
}

fn sumMulCommandInLine(line: []const u8) u64 {
    const command = "mul(";
    var sum: u64 = 0;
    var i: usize = 0;
    var end: usize = 0;
    while (i < line.len - command.len) {
        if (std.mem.eql(u8, line[i .. i + command.len], command)) {
            end += command.len;
            while (line[end] != ')' and end < line.len) {
                end += 1;
            }
            if (line[end] == ')') {
                // std.debug.print("{s}\n", .{line[i .. end + 1]});
                sum += calcMulCommand(line[i .. end + 1]) catch 0;
                // std.debug.print("    sum: {}\n", .{sum});
                i += command.len;
            }
        } else {
            i += 1;
        }
        end = i;
    }
    return sum;
}

const CalcMulCommandError = error{
    InvalidCommand,
    MalformCommand,
    ParameterTooLong,
};
fn calcMulCommand(line: []const u8) !u64 {
    if (!std.mem.eql(u8, line[0..4], "mul(")) {
        return CalcMulCommandError.InvalidCommand;
    }
    if (line[line.len - 1] != ')') {
        return CalcMulCommandError.MalformCommand;
    }
    var sum: u64 = 1;
    var it = std.mem.splitScalar(u8, line[4 .. line.len - 1], ',');
    while (it.next()) |part| {
        if (part.len > 3) {
            return CalcMulCommandError.ParameterTooLong;
        }
        sum *= try std.fmt.parseInt(u64, part, 10);
    }
    return sum;
}

test "calcMulCommand" {
    try std.testing.expectEqual(400, try calcMulCommand("mul(100,4)"));
    try std.testing.expectEqual(4, try calcMulCommand("mul(1,4)"));
    try std.testing.expectEqual(400, try calcMulCommand("mul(10,40)"));
    try std.testing.expectError(CalcMulCommandError.InvalidCommand, calcMulCommand("add(10,40)"));
    try std.testing.expectError(CalcMulCommandError.MalformCommand, calcMulCommand("mul(10,40]"));
    try std.testing.expectError(CalcMulCommandError.ParameterTooLong, calcMulCommand("mul(132,4000)"));
    try std.testing.expectError(std.fmt.ParseIntError.InvalidCharacter, calcMulCommand("mul(10,40))"));
}

test "day 3 - part 1 - example" {
    const path = "../inputs/2024/03_example.txt";
    try std.testing.expectEqual(161, try solution(path));
}

// test "day 3 - part 1" {
//     const path = "../inputs/2024/03_input.txt";
//     try std.testing.expectEqual(0, try solution(path));
// }

// test "day 3 - part 2 - example" {
//     const path = "../inputs/2024/03_example.txt";
//     try std.testing.expectEqual(4, try solution(path));
// }

// test "day 3 - part 2" {
//     const path = "../inputs/2024/03_input.txt";
//     try std.testing.expectEqual(0, try solution(path));
// }
