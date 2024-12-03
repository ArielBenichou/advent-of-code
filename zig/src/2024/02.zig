const std = @import("std");

fn solution(path: []const u8, tolerate_bad_level: bool) !u64 {
    var arena = std.heap.ArenaAllocator.init(std.heap.page_allocator);
    defer arena.deinit();
    const allocator = arena.allocator();
    const reports = try readReports(allocator, path);
    var reports_safe_count: u64 = 0;
    for (reports.items) |report| {
        reports_safe_count += @intFromBool(report.isSafe(@intFromBool(tolerate_bad_level)));
    }
    return reports_safe_count;
}

const Report = struct {
    const Self = @This();
    levels: std.ArrayList(u64),
    allocator: std.mem.Allocator,

    pub fn fromString(allocator: std.mem.Allocator, str: []const u8) !Report {
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

    pub fn deinit(self: Self) void {
        self.allocator.free(self.levels);
    }

    pub fn isSafe(self: Self, bad_levels_tolerence: u64) bool {
        const levels = self.levels.items;
        if (levels.len <= 1) return true;

        var bad_levels_count: u64 = 0;
        var negative_levels: u64 = 0;
        var bad_negative_levels: u64 = 0;
        // 1 2 7 8 9
        for (0..levels.len - 1) |i| {
            const a: i64 = @intCast(levels[i]);
            const b: i64 = @intCast(levels[i + 1]);
            const diff = a - b;
            if (@abs(diff) < 1 or @abs(diff) > 3) {
                bad_levels_count += 1;
                if (diff < 0) {
                    bad_negative_levels += 1;
                }
            }
            if (diff < 0) {
                negative_levels += 1;
            }
        }

        // NOTE: diffs is always one less thatn levels
        const positive_levels: u64 = levels.len - 1 - negative_levels;
        if (positive_levels > negative_levels) {
            bad_levels_count += negative_levels - bad_negative_levels;
        } else {
            bad_levels_count += positive_levels - (bad_levels_count - bad_negative_levels);
        }

        std.debug.print("{any}\n", .{.{
            .levels = levels,
            .bad_levels_tolerence = bad_levels_tolerence,
            .bad_levels_count = bad_levels_count,
            .bad_negative_levels = bad_negative_levels,
            .negative_levels = negative_levels,
            .positive_levels = positive_levels,
            .ok = bad_levels_count <= bad_levels_tolerence,
        }});
        return bad_levels_count <= bad_levels_tolerence;
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

// test "day 2 - part 1 - example" {
//     const path = "../inputs/2024/02_example.txt";
//     try std.testing.expectEqual(2, try solution(path, false));
// }
//
// test "day 2 - part 1" {
//     const path = "../inputs/2024/02_input.txt";
//     try std.testing.expectEqual(606, try solution(path, false));
// }

test "day 2 - part 2 - example" {
    const path = "../inputs/2024/02_example.txt";
    try std.testing.expectEqual(4, try solution(path, true));
}

// test "day 2 - part 2" {
//     const path = "../inputs/2024/02_input.txt";
//     try std.testing.expectEqual(0, try solution(path, true));
// }
