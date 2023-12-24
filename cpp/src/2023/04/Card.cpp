#include "Card.h"

Card::Card(int id, std::vector<int> winningNumbers,
           std::vector<int> myNumbers) {
  this->id = id;
  this->winningNumbers = winningNumbers;
  this->myNumbers = myNumbers;
}

int Card::value() {
  int score = 0;
  for (int num : myNumbers) {
    for (int winNum : winningNumbers) {
      if (num == winNum) {
        score = score == 0 ? 1 : score * 2;
      }
    }
  }
  return score;
};

int Card::matches() {
  if (foundMatches >= 0)
    return foundMatches;
  int m = 0;
  for (int num : myNumbers) {
    for (int winNum : winningNumbers) {
      if (num == winNum) {
        m++;
      }
    }
  }
  foundMatches = m;
  return m;
}
