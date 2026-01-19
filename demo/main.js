import XTerminal from "../out/index.js";

// create a new terminal instance
const term = new XTerminal();

// mount the terminal to page
term.mount('#app');

// prompt style
const promptStyle = '[user] $ ';

// write prompt style and prepare for input
function ask() {
    term.write(promptStyle);
    term.resume();
    term.focus();
}

// capture data event
term.on('data', input => {
    if (input == 'clear') {
        // clear screen
        term.clear();
    } else {
        // do something with the input
        term.writelnSafe('Data: ' + input);
        term.writelnSafe('Data: ' + input);
    }
    // then prompt user for more input
    ask();
});

// print greeting message
term.writeln('Hello World!');

// initiate
ask();
