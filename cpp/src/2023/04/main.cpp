#include "../../utils/utils.h"
#include "Card.h"
#include <deque>
#include <iostream>
#include <vector>

using namespace std;

vector<int> parseNumbers(vector<string> strs) {
  vector<int> numbers;
  for (auto str : strs) {
    if (str.length() == 0)
      continue;
    numbers.push_back(stoi(trim(str)));
  }
  return numbers;
}

Card parseCard(string str) {
  auto parts = split(str, ":");
  auto id = stoi(parts[0].substr(parts[0].find_last_not_of(' ')));
  auto cardParts = split(parts[1], "|");
  auto winningNumbers = parseNumbers(split(trim(cardParts[0]), " "));
  auto numbers = parseNumbers(split(trim(cardParts[1]), " "));

  return Card(id, winningNumbers, numbers);
}

int challengeA(const string &filePath) {
  auto content = loadFileContent(filePath);
  auto lines = split(content, "\n");
  int sumPoints = 0;
  for (auto line : lines) {
    Card card = parseCard(line);
    sumPoints += card.value();
  }
  return sumPoints;
}

int challengeB(const string &filePath) {
  auto content = loadFileContent(filePath);
  auto lines = split(content, "\n");
  vector<Card> cards;
  deque<int> queue;
  for (auto line : lines) {
    Card c = parseCard(line);
    cards.push_back(c);
    queue.push_back(c.getId());
  }

  int sumCards = 0;
  while (queue.size() > 0) {
    int id = queue.front();
    queue.pop_front();
    sumCards++;
    Card card = cards[id - 1];
    for (int i = 0; i < card.matches(); i++) {
      queue.push_back(i + 1 + id);
    }
  }

  return sumCards;
}

int main() {
  cout << "04 A Example: (should be 13)" << endl;
  int exampleA = challengeA("2023/04a_example.txt");
  cout << "Sum: " << exampleA << endl;

  cout << "04 A Input: (should be 22897)" << endl;
  int inputA = challengeA("2023/04_input.txt");
  cout << "Sum: " << inputA << endl;

  cout << "04 B Example: (should be 30)" << endl;
  int exampleB = challengeB("2023/04b_example.txt");
  cout << "Sum: " << exampleB << endl;

  cout << "04 B Input: (should be 5095824)" << endl;
  int inputB = challengeB("2023/04_input.txt");
  cout << "Sum: " << inputB << endl;

  return 0;
}
