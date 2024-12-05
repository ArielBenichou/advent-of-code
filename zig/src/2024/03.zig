const std = @import("std");
const utils = @import("./utils.zig");

fn solution(path: []const u8, parse_do_dont: bool) !u64 {
    var arena = std.heap.ArenaAllocator.init(std.heap.page_allocator);
    defer arena.deinit();
    const allocator = arena.allocator();
    var parser = Parser.init(parse_do_dont);
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
    skip: bool = false,
    parse_do_dont: bool,

    fn init(parse_do_dont: bool) Self {
        return Self{
            .sum = 0,
            .parse_do_dont = parse_do_dont,
        };
    }

    /// all this 'last' stuff is that if in the
    /// middle of sequence we have a problem we keep the last 'bad'
    /// one and check if this is the start of a good sequence
    fn parse(self: *Self, line: []const u8) void {
        var it = Tokenizer.init(line);
        var last: Tokenizer.Token = .Invalid;
        while (true) {
            if (self.parse_do_dont) {
                switch (last) {
                    .do => {
                        last = it.next() orelse break;
                        if (last != .ParanLeft) continue;
                        last = it.next() orelse break;
                        if (last != .ParanRight) continue;
                        self.skip = false;
                    },
                    .@"don't" => {
                        last = it.next() orelse break;
                        if (last != .ParanLeft) continue;
                        last = it.next() orelse break;
                        if (last != .ParanRight) continue;
                        self.skip = true;
                    },
                    else => {},
                }
            }
            if (self.skip) {
                last = it.next() orelse break;
                continue;
            }
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
                {
                    const token: Token = Token.mul;
                    if (std.mem.eql(
                        u8,
                        self.buffer[self.cursor .. self.cursor + @tagName(token).len],
                        @tagName(token),
                    )) {
                        self.cursor += @tagName(token).len;
                        return token;
                    }
                }
                self.cursor += 1;
                return .Invalid;
            },
            'd' => {
                {
                    const token: Token = Token.@"don't";
                    if (std.mem.eql(
                        u8,
                        self.buffer[self.cursor .. self.cursor + @tagName(token).len],
                        @tagName(token),
                    )) {
                        self.cursor += @tagName(token).len;
                        return token;
                    }
                }

                {
                    const token: Token = Token.do;
                    if (std.mem.eql(
                        u8,
                        self.buffer[self.cursor .. self.cursor + @tagName(token).len],
                        @tagName(token),
                    )) {
                        self.cursor += @tagName(token).len;
                        return token;
                    }
                }

                self.cursor += 1;
                return .Invalid;
            },
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
    const path = "../inputs/2024/03a_example.txt";
    try std.testing.expectEqual(161, try solution(path, false));
}

test "day 3 - part 1" {
    const path = "../inputs/2024/03_input.txt";
    try std.testing.expectEqual(163931492, try solution(path, false));
}

test "day 3 - part 2 - example" {
    const path = "../inputs/2024/03b_example.txt";
    try std.testing.expectEqual(48, try solution(path, true));
}

test "day 3 - part 2" {
    const path = "../inputs/2024/03_input.txt";
    try std.testing.expectEqual(76911921, try solution(path, true));
}
