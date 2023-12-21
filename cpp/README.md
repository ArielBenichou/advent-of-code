# CPP Solutions

## Prequisites
you need to have the following tools installed:
- `clang++`
- `premake5`

## Build
Ensure you are in the `cpp` directory. (`cd cpp`)

Run `premake5 gmake2` to generate the makefiles.

Then run `(cd build; make)` to compile the solutions or `(cd build; make --file 2023Day01.make)` to build only one project.

Then you can run the solutions in the `cpp/bin` directory.
For example: `./bin/Debug/2023Day01`

## Release Build
for some reason if you want to build this for release, run `premake5 gmake2` and then `(cd build; make --config=release)` to build the release version.

Then run the solutions in the `cpp/bin` directory.
For example: `./bin/Release/2023Day01`
