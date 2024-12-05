const std = @import("std");
const utils = @import("./utils.zig");

fn solution1(path: []const u8) !u64 {
    var arena = std.heap.ArenaAllocator.init(std.heap.page_allocator);
    defer arena.deinit();
    const allocator = arena.allocator();
    var parser = Parser.init();
    var lines = try utils.LineReader.init(allocator, path);
    defer lines.deinit();
    while (lines.next()) |line| {
        const line_trim = std.mem.trimRight(u8, line, "\r");
        parser.parse(line_trim);
    }
    return parser.sum;
}

const Parser = struct {
    const Self = @This();

    sum: u64,

    fn init() Self {
        return Self{
            .sum = 0,
        };
    }

    /// all this 'last' stuff is that if in the
    /// middle of sequence we have a problem we keep the last 'bad'
    /// one and check if this is the start of a good sequence
    fn parse(self: *Self, line: []const u8) void {
        var it = Tokenizer.init(line);
        var last: Tokenizer.Token = .Invalid;
        while (true) {
            if (last != .mul) {
                last = it.next() orelse break;
                continue;
            }
            last = it.next() orelse break;
            if (last != .ParanLeft) continue;
            last = it.next() orelse break;
            const first = last.digit() orelse continue;
            last = it.next() orelse break;
            if (last != .Comma) continue;
            last = it.next() orelse break;
            const second = last.digit() orelse continue;
            last = it.next() orelse break;
            if (last != .ParanRight) continue;

            self.sum += first * second;
        }
    }
};

const Tokenizer = struct {
    const Self = @This();

    buffer: []const u8,
    cursor: usize,

    fn init(buffer: []const u8) Self {
        return Self{
            .buffer = buffer,
            .cursor = 0,
        };
    }

    const Token = union(enum) {
        mul,
        do,
        @"don't",
        ParanLeft,
        Comma,
        ParanRight,
        Operand: u64,
        Invalid,

        pub fn digit(self: Token) ?u64 {
            return switch (self) {
                .Operand => |n| n,
                else => null,
            };
        }
    };

    fn next(self: *Self) ?Token {
        if (self.cursor == self.buffer.len) return null;
        switch (self.buffer[self.cursor]) {
            'm' => {
                if (std.mem.eql(
                    u8,
                    self.buffer[self.cursor .. self.cursor + @tagName(Token.mul).len],
                    @tagName(Token.mul),
                )) {
                    self.cursor += @tagName(Token.mul).len;
                    return .mul;
                }
                self.cursor += 1;
                return .Invalid;
            },
            // 'd' => {
            //     self.cursor += 1;
            //     return .do;
            // },
            '(' => {
                self.cursor += 1;
                return .ParanLeft;
            },
            ')' => {
                self.cursor += 1;
                return .ParanRight;
            },
            ',' => {
                self.cursor += 1;
                return .Comma;
            },
            '0'...'9' => {
                const start = self.cursor;
                const end_from_start = std.mem.indexOfNone(u8, self.buffer[start..], "0123456789") orelse self.buffer.len;
                const end = start + end_from_start;
                const op: Token = .{
                    .Operand = std.fmt.parseInt(
                        u64,
                        self.buffer[start..end],
                        10,
                    ) catch unreachable,
                };
                self.cursor += end_from_start;
                return op;
            },
            else => {
                self.cursor += 1;
                return .Invalid;
            },
        }
    }
};

test "day 3 - part 1 - example" {
    const path = "../inputs/2024/03_example.txt";
    try std.testing.expectEqual(161, try solution1(path));
}

test "day 3 - part 1" {
    const path = "../inputs/2024/03_input.txt";
    try std.testing.expectEqual(163931492, try solution1(path));
}

// test "day 3 - part 2 - example" {
//     const path = "../inputs/2024/03_example.txt";
//     try std.testing.expectEqual(4, try solution(path));
// }

// test "day 3 - part 2" {
//     const path = "../inputs/2024/03_input.txt";
//     try std.testing.expectEqual(0, try solution(path));
// }
