#pragma once
#include "Set.h"
#include <vector>

using namespace std;

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

  Set minmum() {
    Set minSet = Set(0, 0, 0);
    for (Set s : this->sets) {
      if (s.red > minSet.red)
        minSet.red = s.red;
      if (s.green > minSet.green)
        minSet.green = s.green;
      if (s.blue > minSet.blue)
        minSet.blue = s.blue;
    }
    return minSet;
  }
};

vector<Game> parseGames(string fileContent);
