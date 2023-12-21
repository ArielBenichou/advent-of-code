#pragma once
#include "../../utils/utils.h"
#include <string>

using namespace std;

class Set {
public:
  int green;
  int blue;
  int red;
  Set(int red, int green, int blue) {
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
  int power() { return this->green * this->blue * this->red; }

  string toString() {
    return "(r:" + to_string(this->red) + ", g:" + to_string(this->green) +
           ", b:" + to_string(this->blue) + ")";
  }
};

Set from(string &str);
