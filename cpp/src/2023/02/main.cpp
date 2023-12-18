#include "main.h"
#include <string>
#include <vector>
#define PRINT_ARR(arr)                                                         \
  for (auto e : arr)                                                           \
    cout << e << " ";

// TODO: class?
// TODO: overload the <= operator, true if all parts are less than or equal
struct Set {
  int green;
  int blue;
  int red;
};

// TODO: add to struct
string to_string(Set set) {
  return "(r:" + to_string(set.red) + ", g:" + to_string(set.green) +
         ", b:" + to_string(set.blue) + ")";
}

// TODO: parse the string to set
Set from(string &str) { return {0, 0, 0}; }

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
      res = res + "  " + to_string(s) + "\n";
    }

    return res;
  }

  // TODO: return false if one of the set is bigger the the bag
  bool isPossible(Set bag) { return true; }
};

// TODO: refactor: challangeA, challangeB, parseGames
int main() {
  const string filePath = "2023/02a_example.txt";
  const string fileContent = loadFileContent(filePath);
  const Set bag = {12, 13, 14};

  if (fileContent.empty()) {
    throw "file " + filePath + " is empty!";
  }

  vector<Game> games;

  for (auto line : split(fileContent, "\n")) {
    auto game = split(line, ":");
    int id = stoi(split(game[0], " ")[1]);
    vector<Set> sets;
    for (auto setStr : split(game[1], ";")) {
      cout << "'" << setStr << "'" << endl;
      sets.push_back(from(setStr));
    }

    games.push_back(Game(id, sets));
  }

  int sumId = 0;
  for (auto game : games) {
    cout << game.toString() << endl;
    if (game.isPossible(bag)) {
      sumId += game.id;
    }
  }

  cout << "01 a example: (should be 8)" << endl;
  cout << "Sum: " << sumId << endl;

  /* cout << "01 a input: (should be 2593)" << endl; */
  /* cout << "Sum: " << sumId << endl; */
  return 0;
}
