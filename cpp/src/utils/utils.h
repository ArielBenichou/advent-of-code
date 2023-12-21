#pragma once
#include <fstream>
#include <iostream>
#include <sstream>
#include <vector>

using namespace std;

string loadFileContent(const string &filePath);
vector<string> split(string s, string delimiter);
