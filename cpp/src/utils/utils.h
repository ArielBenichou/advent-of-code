#pragma once
#include <fstream>
#include <iostream>
#include <sstream>
#include <vector>

std::string loadFileContent(const std::string &filePath);
std::vector<std::string> split(std::string s, std::string delimiter);
std::string trim(std::string s);
