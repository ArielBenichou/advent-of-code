#include "AlmanacMap.h"

void AlmanacMap::add(long long dst, long long src, long long len) {
  ranges.push_back(MapRange(dst, src, len));
}

void AlmanacMap::add(MapRange range) { ranges.push_back(range); }

long long AlmanacMap::map(long long val) const {
  for (auto &range : ranges) {
    long long mapped = range.map(val);
    if (mapped != -1)
      return mapped;
  }
  return val;
}
