#include <fstream>
#include <iostream>
#include <string>

int challengeA(const std::string &filePath) {
  std::fstream file(filePath);
  std::string line;

  while (std::getline(file, line)) {
    std::cout << line << std::endl;
  }

  int sum = 0;
  return sum;
}

int main() {

  std::cout << "03 A Example: (should be 4361)" << std::endl;
  int exampleA = challengeA("../inputs/2023/03a_example.txt");
  std::cout << "Sum: " << exampleA << std::endl;

  /* std::cout << "03 A Input: (should be ?)" << std::endl; */
  /* int inputA = challengeA("../inputs/2023/03_input.txt"); */
  /* std::cout << "Sum: " << inputA << std::endl; */
  return 0;
}
