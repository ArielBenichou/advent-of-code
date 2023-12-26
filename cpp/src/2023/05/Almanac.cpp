#include "Almanac.h"
#include <iostream>

void Almanac::add(AlmanacMap map) { maps.push_back(map); }

long long Almanac::map(std::string from, std::string to, long long val) const {
  bool infiniteLoop = false;

  while (from != to) {
    infiniteLoop = true;
    for (auto &map : maps) {
      if (map.from == from) {
        long long nval = map.map(val);

        val = nval;
        from = map.to;
        infiniteLoop = false;
        break;
      }
    }
    if (infiniteLoop) {
      std::cout << "No map found for '" << from << "'" << std::endl;
      break;
    }
  }
  return val;
}
