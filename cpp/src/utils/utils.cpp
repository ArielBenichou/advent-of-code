#include "utils.h"

using namespace std;

string loadFileContent(const string &filePath) {
  string path = "../inputs/" + filePath;
  ifstream file(path);

  if (!file.is_open()) {
    cerr << "Error: Unable to open file '" << path << "'" << endl;
    return "";
  }

  stringstream buffer;
  buffer << file.rdbuf();
  file.close();

  return buffer.str();
}
