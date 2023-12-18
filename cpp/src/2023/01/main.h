#pragma once
#include "../../utils/utils.cpp"
#include <array>
#include <iostream>
#include <map>
#include <string>

using namespace std;

int main();

template <int SIZE>
void challenge(const string &filePath, const array<const string, SIZE> &domain);

template <int SIZE>
int algo(const std::string &content, const array<const string, SIZE> &domain);

int findTermAndConvertToNumber(const string &content, const int index,
                               const string &term);
