#pragma once
#include "MapRange.h"
#include <cwchar>
#include <string>
#include <vector>

class AlmanacMap {
  std::vector<MapRange> ranges;

public:
  std::string from;
  std::string to;

  AlmanacMap(std::string from, std::string to) : from(from), to(to) {}

  void add(long long dst, long long src, long long len);
  void add(MapRange range);

  long long map(long long val) const;
};
