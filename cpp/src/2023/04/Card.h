#pragma once
#include <vector>

class Card {
  int id;
  std::vector<int> winningNumbers;
  std::vector<int> myNumbers;
  int foundMatches = -1;

public:
  Card(int id, std::vector<int> winningNumbers, std::vector<int> myNumbers);
  int value();
  int getId() { return id; }
  int matches();
};
