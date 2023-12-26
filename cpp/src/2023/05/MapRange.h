#pragma once

class MapRange {
  long long dst;
  long long src;
  long long len;

public:
  MapRange(long long dst, long long src, long long len)
      : dst(dst), src(src), len(len) {}

  long long map(long long val) const;
};
