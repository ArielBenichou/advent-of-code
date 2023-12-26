#pragma once
#include "AlmanacMap.h"

class Almanac {
  std::vector<AlmanacMap> maps;

public:
  Almanac() {}
  AlmanacMap &last() { return maps.back(); }
  void add(AlmanacMap map);
  long long map(std::string from, std::string to, long long val) const;
};
