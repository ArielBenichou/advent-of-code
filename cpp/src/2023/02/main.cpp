#include "main.h"
#include "Game.h"
#include "Set.h"

int challengeA(const string filePath) {
  const string fileContent = loadFileContent(filePath);
  const Set bag = Set(12, 13, 14);

  if (fileContent.empty()) {
    throw "file " + filePath + " is empty!";
  }

  auto games = parseGames(fileContent);

  int sumId = 0;
  for (auto game : games) {
    if (game.isPossible(bag)) {
      sumId += game.id;
    }
  }

  return sumId;
}

int challengeB(const string filePath) {
  const string fileContent = loadFileContent(filePath);

  if (fileContent.empty()) {
    throw "file " + filePath + " is empty!";
  }

  auto games = parseGames(fileContent);

  int sumPower = 0;
  for (auto game : games) {
    sumPower += game.minmum().power();
  }
  return sumPower;
}

int main() {
  cout << "01 a example: (should be 8)" << endl;
  int exampleA = challengeA("2023/02a_example.txt");
  cout << "Sum: " << exampleA << endl;

  cout << "01 a input: (should be 2593)" << endl;
  int inputA = challengeA("2023/02a_input.txt");
  cout << "Sum: " << inputA << endl;

  cout << "01 a example: (should be 2286)" << endl;
  int exampleB = challengeB("2023/02a_example.txt");
  cout << "Sum: " << exampleB << endl;

  cout << "01 a input: (should be 54699)" << endl;
  int inputB = challengeB("2023/02a_input.txt");
  cout << "Sum: " << inputB << endl;
  return 0;
}
