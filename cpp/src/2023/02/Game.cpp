#include "Game.h"
#include <vector>

using namespace std;

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
