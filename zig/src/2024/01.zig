const std = @import("std");

// fn getMinDistanceSum(path: []const u8) !i32 {
//     var gpa = std.heap.GeneralPurposeAllocator(.{}){};
//     const allocator = gpa.allocator();
//
//     var file = try std.fs.cwd().openFile(path, .{});
//     defer file.close();
//     var buf_reader = std.io.bufferedReader(file.reader());
//     var in_stream = buf_reader.reader();
//     var buf: [1024]u8 = undefined;
//
//     const list1 = std.ArrayList(i32).init(allocator);
//     const list2 = std.ArrayList(i32).init(allocator);
//     while (try in_stream.readUntilDelimiterOrEof(&buf, '\n')) |line| {
//         const pair = extractPair(&line);
//         list1.append(pair[0]);
//         list2.append(pair[1]);
//     }
//
//     std.debug.print("{}\n{}\n", .{ list1, list2 });
//
//     var sum: i32 = 0;
//     sum += 1;
//
//     return sum;
// }

fn extractPair(line: *const [7:0]u8) ![2]i32 {
    var pair = [2]i32{ undefined, undefined };
    var i: usize = 0;
    var start: usize = 0;
    var end: usize = 0;
    for (0..line.len) |ch| {
        end += 1;
        if (line[ch] == ' ') {
            pair[i] = try std.fmt.parseInt(i32, line[start..end], 10);
            i += 1;
            start = end;
        }
    }
    return pair;
}

test "extractPair" {
    try std.testing.expectEqual(try extractPair("12   98"), .{ 12, 98 });
}

// test "day 1 - part 1 - example" {
//     const path = "../inputs/2024/01a_example.txt";
//     try std.testing.expectEqual(try getMinDistanceSum(path), 11);
// }
