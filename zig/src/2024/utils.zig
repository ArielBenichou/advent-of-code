const std = @import("std");

pub const LineReader = struct {
    const Self = @This();

    allocator: std.mem.Allocator,
    file: std.fs.File,
    buf_reader: std.io.BufferedReader(4096, std.fs.File.Reader),
    line: std.ArrayList(u8),
    current_line: ?[]const u8 = null,

    pub fn init(allocator: std.mem.Allocator, path: []const u8) !Self {
        const file = try std.fs.cwd().openFile(path, .{});
        return Self{
            .allocator = allocator,
            .file = file,
            .buf_reader = std.io.bufferedReader(file.reader()),
            .line = std.ArrayList(u8).init(allocator),
        };
    }

    pub fn deinit(self: *Self) void {
        self.file.close();
        self.line.deinit();
    }

    pub fn next(self: *Self) ?[]const u8 {
        self.line.clearRetainingCapacity();
        const reader = self.buf_reader.reader();

        reader.streamUntilDelimiter(self.line.writer(), '\n', null) catch |err| switch (err) {
            error.EndOfStream => {
                if (self.line.items.len > 0) {
                    self.current_line = self.line.items;
                    return self.current_line;
                }
                return null;
            },
            else => return null,
        };

        self.current_line = self.line.items;
        return self.current_line;
    }
};
