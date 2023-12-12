#include "../utils/utils.cpp"
#include <iostream>

using namespace std;

int main() {
  // Example usage
  std::string filePath = "2023/01a_example.txt";
  std::string fileContent = loadFileContent(filePath);

  if (!fileContent.empty()) {
    std::cout << "File content:\n" << fileContent << std::endl;
  }
  return 0;
}
