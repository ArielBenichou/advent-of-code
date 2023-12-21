#include "Set.h"
#include "../../utils/utils.h"
#include <string>

using namespace std;

Set from(string &str) {
  Set set = Set(0, 0, 0);
  auto color = split(str, ",");
  for (auto e : color) {
    auto keyValue = split(e.substr(1), " ");
    set.setPart(keyValue[1], stoi(keyValue[0]));
  }
  return set;
}
