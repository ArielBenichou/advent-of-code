#include "SchematicPart.h"
#include <string>

SchmaticPart::SchmaticPart(int y, int x, std::string contents) {
  this->y = y;
  this->x = x;
  this->contents = contents;
}

bool SchmaticPart::isAdjacent(const SchmaticPart &other) const {
  bool isAdjacentY = other.y >= this->y - 1 && other.y <= this->y + 1;
  bool isAdjacentX =
      other.x >= this->x - other.width() && other.x <= this->x + +this->width();
  if (isAdjacentX && isAdjacentY) {
    return true;
  }
  return false;
}

std::string SchmaticPart::toString() const {
  return "[" + contents + "] (" + std::to_string(y) + ", " + std::to_string(x) +
         ")";
}
