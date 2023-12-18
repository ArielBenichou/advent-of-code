#pragma once
#include <fstream>
#include <iostream>
#include <sstream>
#include <vector>

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

vector<string> split(string s, string delimiter) {
  vector<string> vec;
  size_t pos = 0;
  string token;
  while ((pos = s.find(delimiter)) != string::npos) {
    token = s.substr(0, pos);
    vec.push_back(token);
    s.erase(0, pos + delimiter.length());
  }
  if (s.length() > 0) {
    vec.push_back(s);
  }
  return vec;
}
