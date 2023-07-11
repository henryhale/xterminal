# Changelog

## 2.0.1 (2023-07-11)


### Bug Fixes

* trigger keypress event on every key pressed ([#12](https://github.com/henryhale/xterminal/issues/12)) ([501d43c](https://github.com/henryhale/xterminal/commit/501d43cbc78a817a0e7915526b250e0c1b3377a4))

# 2.0.0 (2023-07-07)


### chore

* next codebase  ([#10](https://github.com/henryhale/xterminal/issues/10)) ([1816cc3](https://github.com/henryhale/xterminal/commit/1816cc362920be8a623ab10d0144b10baf5166f3))


### BREAKING CHANGES

* Removed methods(prompt & terminate) and events(clear, close)

- Added new internal structure with input and output components
- Refactored states of objects to private for improved security
- Fixed text selection issue to allow users copy text
- Added extensive support for mobile devices (touchscreen)
- Added callback functions in for write and writeln methods
- Added comments and specific references to the code for extensive research
- Refactored the rendering module to provide separate builds for input and output
- Added pause and resume methods for handling input control
- Added history array getter for access a list of previous input
- Added clearLast method for removing one last output after a write operation
- Added a keypress event for accessing the keyboard event on every keypress
- Refactored the code with separation of concerns (interfaces of each class)

* docs: update documentation with the new api and typos

* docs(readme): updated and added development section

## 1.1.2 (2023-07-06)