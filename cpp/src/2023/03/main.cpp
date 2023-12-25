#include "SchematicPart.h"
#include "parseLine.h"
#include <fstream>
#include <iostream>
#include <string>

int challengeA(const std::string &filePath) {
  std::fstream file(filePath);
  std::string line;
  std::vector<SchmaticPart> schmatics;

  // ===== PARSING LINE TO SCHEMATIC SECTION =====
  int y = 0;
  while (std::getline(file, line)) {
    parseLineSchmatics(line, y, schmatics);
    y++;
  }

  // ===== SUMING ADJACENT NUMBERS =====
  int sum = 0;
  for (auto &num : schmatics) {
    if (num.isSymbol()) {
      continue;
    }
    for (auto &sym : schmatics) {
      if (sym.isNumber()) {
        continue;
      }

      if (num.isAdjacent(sym)) {
        sum += std::stoi(num.contents);
        break;
      }
    }
  }

  return sum;
}

int challengeB(const std::string &filePath) {
  std::fstream file(filePath);
  std::string line;
  std::vector<SchmaticPart> schmatics;

  // ===== PARSING LINE TO SCHEMATIC SECTION =====
  int y = 0;
  while (std::getline(file, line)) {
    parseLineSchmatics(line, y, schmatics);
    y++;
  }

  // ===== SUMING ADJACENT NUMBERS =====
  int sum = 0;
  for (auto &gear : schmatics) {
    if (gear.isNumber() || !gear.isGear()) {
      continue;
    }
    std::vector<SchmaticPart *> adjacents;
    for (auto &num : schmatics) {
      if (!num.isNumber()) {
        continue;
      }
      if (gear.isAdjacent(num)) {
        adjacents.push_back(&num);
      }
    }
    if (adjacents.size() == 2) {
      sum +=
          std::stoi(adjacents[0]->contents) * std::stoi(adjacents[1]->contents);
    }
  }

  return sum;
}

int main() {

  std::cout << "03 A Example: (should be 4361)" << std::endl;
  int exampleA = challengeA("../inputs/2023/03a_example.txt");
  std::cout << "Sum: " << exampleA << std::endl;

  std::cout << "03 A Input: (should be 528819)" << std::endl;
  int inputA = challengeA("../inputs/2023/03_input.txt");
  std::cout << "Sum: " << inputA << std::endl;

  std::cout << "03 A Example: (should be 467835)" << std::endl;
  int exampleB = challengeB("../inputs/2023/03a_example.txt");
  std::cout << "Sum: " << exampleB << std::endl;

  std::cout << "03 A Input: (should be 80403602)" << std::endl;
  int inputB = challengeB("../inputs/2023/03_input.txt");
  std::cout << "Sum: " << inputB << std::endl;
  return 0;
}
