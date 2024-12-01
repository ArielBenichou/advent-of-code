#include "../../utils/utils.h"
#include "Almanac.h"
#include "AlmanacMap.h"
#include <algorithm>
#include <fstream>
#include <iostream>
#include <string>

long long getLowestLocation(const std::vector<long long> &seeds,
                            const Almanac &almanac) {
  long long lowestLocation = -1;
  for (long long seed : seeds) {
    long long loc = almanac.map("seed", "location", seed);
    lowestLocation = lowestLocation < 0 ? loc : std::min(lowestLocation, loc);
  }
  return lowestLocation;
}

void parseSeeds(std::vector<long long> &seeds, const std::string &line) {
  for (auto seed : split(line.substr(7), " ")) {
    seeds.push_back(std::stoll(seed));
  }
}

void parseSeedsRange(std::vector<long long> &seeds, const std::string &line) {
  auto pairs = split(line.substr(7), " ");
  for (int i = 0; i < pairs.size(); i += 2) {
    long long start = std::stoll(pairs[i]);
    long long length = std::stoll(pairs[i + 1]);
    for (int j = 0; j < length; j++) {
      seeds.push_back(start + j);
    }
  }
}

void parseMap(Almanac &almanac, const std::string &line) {
  std::string name = line.substr(0, line.find(' '));
  std::vector<std::string> names = split(name, "-to-");
  almanac.add(AlmanacMap(names[0], names[1]));
}

void parseRange(Almanac &almanac, const std::string &line) {
  auto parts = split(line, " ");
  almanac.last().add(std::stoll(parts[0]), std::stoll(parts[1]),
                     std::stoll(parts[2]));
}

enum ParseMode { SEEDS, SEEDS_RANGE, MAP, RANGES };

long long challenge(const std::string &filePath, ParseMode mode) {
  std::fstream file(filePath);
  std::string line;

  std::vector<long long> seeds;
  Almanac almanac;

  while (std::getline(file, line)) {
    if (line.length() == 0) {
      // empty line reset mode to take next map
      mode = ParseMode::MAP;
      continue;
    }

    if (mode == ParseMode::SEEDS) {
      parseSeeds(seeds, line);
      mode = ParseMode::MAP;
    } else if (mode == ParseMode::SEEDS_RANGE) {
      parseSeedsRange(seeds, line);
      mode = ParseMode::MAP;
    } else if (mode == ParseMode::MAP) {
      parseMap(almanac, line);
      mode = ParseMode::RANGES;
    } else if (mode == ParseMode::RANGES) {
      parseRange(almanac, line);
    }
  }
  std::cout << "Parsing done" << std::endl;

  return getLowestLocation(seeds, almanac);
}

int main() {
  std::cout << "05 A Example: (should be 35)" << std::endl;
  long long exampleA =
      challenge("../../../inputs/2023/05a_example.txt", ParseMode::SEEDS);
  std::cout << "Sum: " << exampleA << std::endl;

  std::cout << "05 A Input: (should be 331445006)" << std::endl;
  long long inputA = challenge("../../../inputs/2023/05_input.txt", ParseMode::SEEDS);
  std::cout << "Sum: " << inputA << std::endl;

  std::cout << "05 B Example: (should be 46)" << std::endl;
  long long exampleB =
      challenge("../../../inputs/2023/05a_example.txt", ParseMode::SEEDS_RANGE);
  std::cout << "Sum: " << exampleB << std::endl;

  std::cout << "05 B Input: (should be ?)" << std::endl;
  long long inputB =
      challenge("../../../inputs/2023/05_input.txt", ParseMode::SEEDS_RANGE);
  std::cout << "Sum: " << inputB << std::endl;
  return 0;
}
