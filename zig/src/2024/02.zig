const std = @import("std");

fn part1(path: []const u8) !u64 {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    const allocator = gpa.allocator();
    const reports = try readReports(allocator, path);
    _ = reports;
    return 0;
}

// fn part2(path: []const u8) !64 {
//     var gpa = std.heap.GeneralPurposeAllocator(.{}){};
//     const allocator = gpa.allocator();
//     const content = try readFile(allocator, path);
//     _ = content;
//     return;
// }

const Report = struct {
    const Self = @This();
    levels: []u64,

    fn init(levels: []u64) Report {
        return .{
            .levels = levels,
        };
    }

    fn fromString(str: []u8) !Report {
        return Self.init();
    }
};

fn readReports(allocator: std.mem.Allocator, path: []const u8) ![]Report {
    var file = try std.fs.cwd().openFile(path, .{});
    defer file.close();

    var buf_reader = std.io.bufferedReader(file.reader());
    const reader = buf_reader.reader();

    var line = std.ArrayList(u8).init(allocator);
    defer line.deinit();

    const writer = line.writer();
    // TODO: support windows and mac
    while (try reader.streamUntilDelimiter(writer, '\n', null)) {
        // Clear the line so we can reuse it.
        defer line.clearRetainingCapacity();

        // TODO: parse line to Report
    }
}

test "day 2 - part 1 - example" {
    const path = "../inputs/2024/02_example.txt";
    try std.testing.expectEqual(1, try part1(path));
}

// test "day 2 - part 1" {
//     const path = "../inputs/2024/02_input.txt";
//     try std.testing.expectEqual(undefined, try part1(path));
// }

// test "day 2 - part 2 - example" {
//     const path = "../inputs/2024/02_example.txt";
//     try std.testing.expectEqual(undefined, try part2(path));
// }
//
// test "day 2 - part 2" {
//     const path = "../inputs/2024/02_input.txt";
//     try std.testing.expectEqual(undefined, try part2(path));
// }
