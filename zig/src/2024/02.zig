const std = @import("std");

fn solution(path: []const u8, bad_levels_allowed: u64) !u64 {
    var arena = std.heap.ArenaAllocator.init(std.heap.page_allocator);
    defer arena.deinit();
    const allocator = arena.allocator();
    const reports = try readReports(allocator, path);
    var reports_safe_count: u64 = 0;
    for (reports.items) |report| {
        reports_safe_count += @intFromBool(report.isSafe(bad_levels_allowed));
    }
    return reports_safe_count;
}

const Report = struct {
    const Self = @This();
    levels: std.ArrayList(u64),
    allocator: std.mem.Allocator,

    fn fromString(allocator: std.mem.Allocator, str: []const u8) !Report {
        var levels = std.ArrayList(u64).init(allocator);
        var it = std.mem.splitScalar(u8, str, ' ');
        while (it.next()) |part| {
            try levels.append(try std.fmt.parseInt(u64, part, 10));
        }
        return .{
            .levels = levels,
            .allocator = allocator,
        };
    }

    fn deinit(self: Self) void {
        self.allocator.free(self.levels);
    }

    fn isSafe(self: Self, bad_levels_allowed: u64) bool {
        const levels = self.levels.items;
        if (levels.len <= 1) return true;
        var bad_levels_count: u64 = 0;
        var bad_level_index: ?usize = null;
        const is_desc = levels[0] > levels[1];
        for (0..levels.len - 1) |i| {
            const skip_bad_level = bad_levels_allowed > 0 and i == bad_level_index;
            const a = if (skip_bad_level) levels[i - 1] else levels[i];
            const b = levels[i + 1];
            if (is_desc) {
                if (a < b or (a - b < 1 or a - b > 3)) {
                    bad_level_index = i + 1;
                    bad_levels_count += 1;
                }
            } else {
                if (a > b or (b - a < 1 or b - a > 3)) {
                    bad_level_index = i + 1;
                    bad_levels_count += 1;
                }
            }
        }
        return bad_levels_count <= bad_levels_allowed;
    }
};

fn readReports(allocator: std.mem.Allocator, path: []const u8) !std.ArrayList(Report) {
    var file = try std.fs.cwd().openFile(path, .{});
    defer file.close();

    var buf_reader = std.io.bufferedReader(file.reader());
    const reader = buf_reader.reader();

    var line = std.ArrayList(u8).init(allocator);
    defer line.deinit();

    const writer = line.writer();
    var reports = std.ArrayList(Report).init(allocator);

    while (reader.streamUntilDelimiter(writer, '\n', null)) {
        // Clear the line so we can reuse it.
        defer line.clearRetainingCapacity();
        const line_trim = std.mem.trim(u8, line.items, "\r");
        try reports.append(try Report.fromString(allocator, line_trim));
    } else |err| switch (err) {
        error.EndOfStream => { // end of file
            if (line.items.len > 0) {
                const line_trim = std.mem.trim(u8, line.items, "\r");
                try reports.append(try Report.fromString(allocator, line_trim));
            }
        },
        else => return err, // Propagate error
    }
    return reports;
}

test "day 2 - part 1 - example" {
    const path = "../inputs/2024/02_example.txt";
    try std.testing.expectEqual(2, try solution(path, 0));
}

test "day 2 - part 1" {
    const path = "../inputs/2024/02_input.txt";
    try std.testing.expectEqual(606, try solution(path, 0));
}

test "day 2 - part 2 - example" {
    const path = "../inputs/2024/02_example.txt";
    try std.testing.expectEqual(4, try solution(path, 1));
}

test "day 2 - part 2" {
    const path = "../inputs/2024/02_input.txt";
    // FIXME: not right answer
    try std.testing.expectEqual(632, try solution(path, 1));
}
