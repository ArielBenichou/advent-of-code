#pragma once
#include "SchematicPart.h"

void parseLineSchmatics(const std::string &line, int y,
                        std::vector<SchmaticPart> &schmatics);
