const std = @import("std");

fn part1(path: []const u8) !u64 {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    const allocator = gpa.allocator();
    const content = try readFile(allocator, path);
    const lists = try getSortedLists(allocator, content);

    return getMinDistanceSum(lists[0], lists[1]);
}

fn part2(path: []const u8) !u64 {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    const allocator = gpa.allocator();
    const content = try readFile(allocator, path);
    const lists = try getSortedLists(allocator, content);

    return getSimilarityScore(lists[0], lists[1]);
}

fn getSortedLists(allocator: std.mem.Allocator, content: []u8) ![2]std.ArrayList(u64) {
    // TODO: fix /r/n to use for windows only
    var lines = std.mem.tokenizeSequence(u8, content, "\r\n");

    var list_left = std.ArrayList(u64).init(allocator);
    var list_right = std.ArrayList(u64).init(allocator);
    while (lines.next()) |line| {
        var parts = std.mem.tokenizeScalar(u8, line, ' ');
        try list_left.append(try std.fmt.parseInt(u64, parts.next().?, 10));
        try list_right.append(try std.fmt.parseInt(u64, parts.next().?, 10));
    }

    std.sort.pdq(u64, list_left.items, {}, std.sort.asc(u64));
    std.sort.pdq(u64, list_right.items, {}, std.sort.asc(u64));

    return .{ list_left, list_right };
}

fn readFile(allocator: std.mem.Allocator, path: []const u8) ![]u8 {
    var file = try std.fs.cwd().openFile(path, .{});
    defer file.close();
    const content = try file.readToEndAlloc(allocator, 100 * 1024);
    return content;
}

fn getMinDistanceSum(list_left: std.ArrayList(u64), list_right: std.ArrayList(u64)) u64 {
    var sum: u64 = 0;
    for (list_left.items, list_right.items) |l, r| {
        sum += if (l > r) (l - r) else (r - l);
    }
    return sum;
}

fn getSimilarityScore(list_left: std.ArrayList(u64), list_right: std.ArrayList(u64)) u64 {
    var sum: u64 = 0;
    for (list_left.items) |l| {
        var occur: usize = 0;
        for (list_right.items) |r| {
            if (l == r) {
                occur += 1;
            } else if (occur > 0) {
                break;
            }
        }
        sum += occur * l;
    }
    return sum;
}

test "day 1 - part 1 - example" {
    const path = "../inputs/2024/01_example.txt";
    try std.testing.expectEqual(11, try part1(path));
}

test "day 1 - part 1" {
    const path = "../inputs/2024/01_input.txt";
    try std.testing.expectEqual(2756096, try part1(path));
}

test "day 1 - part 2 - example" {
    const path = "../inputs/2024/01_example.txt";
    try std.testing.expectEqual(31, try part2(path));
}

test "day 1 - part 2" {
    const path = "../inputs/2024/01_input.txt";
    try std.testing.expectEqual(23117829, try part2(path));
}
