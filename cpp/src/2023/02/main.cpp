#include "main.h"
#include <string>
#include <vector>

class Set {
public:
  int green;
  int blue;
  int red;
  Set(int green, int blue, int red) {
    this->green = green;
    this->blue = blue;
    this->red = red;
  }
  void setPart(string part, int value) {
    if (part == "green")
      this->green = value;
    else if (part == "blue")
      this->blue = value;
    else if (part == "red")
      this->red = value;
    else
      throw "setPart";
  }
  bool operator<=(const Set &set) {
    if (this->green > set.green)
      return false;
    if (this->blue > set.blue)
      return false;
    if (this->red > set.red)
      return false;
    return true;
  }

  string toString() {
    return "(r:" + to_string(this->red) + ", g:" + to_string(this->green) +
           ", b:" + to_string(this->blue) + ")";
  }
};

Set from(string &str) {
  Set set = Set(0, 0, 0);
  auto color = split(str, ",");
  for (auto e : color) {
    auto keyValue = split(e.substr(1), " ");
    set.setPart(keyValue[1], stoi(keyValue[0]));
  }
  return set;
}

class Game {
public:
  int id;
  vector<Set> sets;

  Game(int id, vector<Set> sets) {
    this->id = id;
    this->sets = sets;
  }

  string toString() {
    string res = "===\nid: " + to_string(this->id) + "\nsets:\n";
    for (auto s : this->sets) {
      res = res + "  " + s.toString() + "\n";
    }

    return res;
  }

  bool isPossible(Set bag) {
    for (auto set : this->sets) {
      if (!(set <= bag))
        return false;
    }
    return true;
  }
};

vector<Game> parseGames(string fileContent) {
  vector<Game> games;
  for (auto line : split(fileContent, "\n")) {
    auto game = split(line, ":");
    int id = stoi(split(game[0], " ")[1]);
    vector<Set> sets;
    for (auto setStr : split(game[1], ";")) {
      sets.push_back(from(setStr));
    }
    games.push_back(Game(id, sets));
  }
  return games;
}

int challengeA(const string filePath) {
  const string fileContent = loadFileContent(filePath);
  const Set bag = {12, 13, 14};

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

int main() {
  cout << "01 a example: (should be 8)" << endl;
  int exampleA = challengeA("2023/02a_example.txt");
  cout << "Sum: " << exampleA << endl;

  cout << "01 a input: (should be 2593)" << endl;
  int inputA = challengeA("2023/02a_input.txt");
  cout << "Sum: " << inputA << endl;
  return 0;
}
