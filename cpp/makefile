CXX = clang++
CXXFLAGS = -std=c++17 -Wall

# Directories
SRC_DIR = src
BIN_DIR = bin
UTILS_DIR = utils

# Get all source files
SRC_FILES = $(wildcard $(SRC_DIR)/2023/**/*.cpp)
UTILS_FILES = $(wildcard $(UTILS_DIR)/*.cpp)

# Get all entry points and corresponding executable names
EXE_NAMES = $(patsubst $(SRC_DIR)/%.cpp,%,$(SRC_FILES))
EXECUTABLES = $(addprefix $(BIN_DIR)/,$(EXE_NAMES))

# Build target
all: $(EXECUTABLES)

# Rule to create executables
$(BIN_DIR)/%: $(SRC_DIR)/%.cpp $(UTILS_FILES)
	@mkdir -p $(@D)
	$(CXX) $(CXXFLAGS) $^ -o $@

# Clean target
clean:
	rm -rf $(BIN_DIR)

.PHONY: all clean
