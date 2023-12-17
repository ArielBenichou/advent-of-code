#include "01.h"
#include "../utils/utils.cpp"
#include <array>
#include <iostream>
#include <limits>
#include <map>
#include <string>

using namespace std;

map<string, int> TERMS{{"0", 0},   {"1", 1},     {"2", 2},     {"3", 3},
                       {"4", 4},   {"5", 5},     {"6", 6},     {"7", 7},
                       {"8", 8},   {"9", 9},     {"zero", 0},  {"one", 1},
                       {"two", 2}, {"three", 3}, {"four", 4},  {"five", 5},
                       {"six", 6}, {"seven", 7}, {"eight", 8}, {"nine", 9}};

int main() {
  const array<const string, 10> domain{"0", "1", "2", "3", "4",
                                       "5", "6", "7", "8", "9"};
  cout << "01 a example: (should be 142)" << endl;
  challenge<10>("2023/01a_example.txt", domain);
  cout << "01 a input: (should be 54927)" << endl;
  challenge<10>("2023/01a_input.txt", domain);
  cout << "01 b example: (should be 281)" << endl;

  const array<const string, 20> domain2{
      "0",    "1",    "2",   "3",     "4",     "5",    "6",
      "7",    "8",    "9",   "zero",  "one",   "two",  "three",
      "four", "five", "six", "seven", "eight", "nine",
  };
  challenge<20>("2023/01b_example.txt", domain2);
  cout << "01 b input: (should be 54581)" << endl;
  challenge<20>("2023/01a_input.txt", domain2);
  return 0;
}

template <int SIZE>
void challenge(const string &filePath,
               const array<const string, SIZE> &domain) {
  string fileContent = loadFileContent(filePath);

  if (fileContent.empty()) {
    throw "file " + filePath + " is empty!";
  }
  int sum = algo<SIZE>(fileContent, domain);
  cout << "Sum: " << sum << endl;
}

template <int SIZE>
int algo(const std::string &content, const array<const string, SIZE> &domain) {
  int greedy = -1;
  int lazy = -1;
  int sum = 0;
  for (int i = 0; i < content.length(); i++) {
    char curr = content[i];

    if (curr == '\n') {
      sum += lazy * 10 + greedy;
      greedy = -1;
      lazy = -1;
      continue;
    }

    for (auto term : domain) {
      auto conv = findTermAndConvertToNumber(content, i, term);
      if (conv != -1) {
        greedy = conv;
        if (lazy == -1) {
          lazy = conv;
        }
      }
    }
  }
  return sum;
}

int findTermAndConvertToNumber(const string &content, const int index,
                               const string &term) {
  if (term.length() > content.length() - index)
    return -1;

  for (int i = 0; i < term.length(); i++) {
    if (term[i] != content[i + index])
      return -1;
  }
  return TERMS[term];
}
