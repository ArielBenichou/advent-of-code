#pragma once
#include <string>

class SchmaticPart {
public:
  int y;
  int x;
  std::string contents;
  SchmaticPart(int y, int x, std::string contents);
  int width() const { return contents.size(); }
  bool isAdjacent(const SchmaticPart &other) const;
  bool isNumber() const { return isdigit(contents[0]); }
  bool isSymbol() const { return !this->isNumber(); }
  bool isGear() const { return contents[0] == '*'; }
  std::string toString() const;
};
