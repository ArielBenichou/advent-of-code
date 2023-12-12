#include <filesystem>
#include <fstream>
#include <iostream>
#include <sstream>

using namespace std;
namespace fs = std::filesystem;

string loadFileContent(const string &filePath) {
  string path = "../inputs/" + filePath;
  ifstream file(path);

  if (!file.is_open()) {
    cerr << "Error: Unable to open file '" << path << "'" << endl;
    std::cout << "Current path is " << fs::current_path() << '\n'; // (1)
    return "";
  }

  stringstream buffer;
  buffer << file.rdbuf();
  file.close();

  return buffer.str();
}
