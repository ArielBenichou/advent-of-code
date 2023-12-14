#include "01.h"
#include "../utils/utils.cpp"
#include <iostream>
#include <string>

using namespace std;

int main() {
  cout << "01 a example: (should be 142)" << endl;
  challenge("2023/01a_example.txt");
  cout << "01 a input: (should be 54927)" << endl;
  challenge("2023/01a_input.txt");
  /* cout << "01 b example: (should be 281)" << endl; */
  /* challenge("2023/01b_example.txt"); */
  /* cout << "01 b input: (should be 54581)" << endl; */
  /* challenge("2023/01b_input.txt"); */
  return 0;
}

void challenge(const string &filePath) {
  string fileContent = loadFileContent(filePath);

  if (fileContent.empty()) {
    throw "file " + filePath + " is empty!";
  }
  int sum = algo(fileContent);
  cout << "Sum: " << sum << endl;
}

int algo(const std::string &content) {
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

    auto conv = convertToNum(curr);
    if (conv != -1) {
      greedy = conv;
      if (lazy == -1) {
        lazy = conv;
      }
    }
  }
  return sum;
}

int convertToNum(char ch) {
  auto conv = int(ch - '0');
  if (conv >= 10 || conv <= 0) {
    return -1;
  }
  return conv;
}
