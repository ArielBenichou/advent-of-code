#include "parseLine.h"
#include "SchematicPart.h"
#include <cctype>

void parseLineSchmatics(const std::string &line, int y,
                        std::vector<SchmaticPart> &schmatics) {
  std::string word = "";
  for (int x = 0; x < line.size(); x++) {
    char ch = line[x];
    if (ch == '.') {
      if (word.size() > 0) {
        schmatics.push_back(SchmaticPart(y, x - word.size(), word));
        word = "";
      }
    } else if (isdigit(ch)) {
      word += ch;
    } else {
      if (word.size() > 0) {
        schmatics.push_back(SchmaticPart(y, x - word.size(), word));
        word = "";
      }
      schmatics.push_back(SchmaticPart(y, x, std::string(1, ch)));
    }
  }
  if (word.size() > 0) {
    schmatics.push_back(SchmaticPart(y, line.size() - word.size(), word));
  }
}
