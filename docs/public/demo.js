/**
 * Create a demo shell object 
 */

// #region shell
function createShell() {

    // Help
    const manual = `XTerminal : version ${XTerminal.version}

Type 'help' to see this list
  
Commands:
  
  gh (username)   search for github users
  js [expr]       execute a JS expression
  clear           clear the terminal screen
  help            display this list
`;

    // Get public github user information
    async function fetchGitHubUser(username) {
        return fetch('https://api.github.com/users/' + username)
            .then(res => res.json())
            .then(res => {
                return(
                    '<table border="0">' + 
                        '<tr>' +
                            `<td rowspan="3" width="100"><img width="75" src="${res.avatar_url}" alt="${res.name}" /></td>` +
                            `<td>Name</td>` +
                            `<td>${res.name}</td>` +
                        '</tr>' +
                        '<tr>' +
                            `<td>Bio</td>` +
                            `<td>${res.bio}</td>` +
                        '</tr>' +
                        '<tr>' +
                            `<td>Repos</td>` +
                            `<td>${res.public_repos}</td>` +
                        '</tr>' +
                    '</table>'
                );
            });
    }

    // evaluate user input from the terminal
    // -> can be shared among several terminal objects
    function execute(term, command = '') {
        let args = command.split(' ');
        let cmd = args.shift();
        // GitHub User Search
        if (cmd == 'gh') {
            return new Promise(async (res, rej) => {
                let output, error;
                term.write('<span class="spinner"></span> Searching...');
                await fetchGitHubUser(args.join(''))
                    .then(val => output = val)
                    .catch(err => error = ':( Not found!')
                    .finally(() => term.clearLast());
                if (error) rej(error);
                else res(output);
            });
        }
        // JavaScript Evaluation
        else if (cmd == 'js') {
            return new Promise((res, rej) => {
                try {
                    let output = eval(args.join(' ')) + '\n';
                    res(output);
                } catch (error) {
                    rej(error);
                }
            });
        } 
        // Help menu
        else if (cmd == 'help') {
            return Promise.resolve(manual);
        } 
        // Clear the terminal
        else if (cmd == 'clear') {
            term.clear();
            return Promise.resolve(null);
        } 
        // Oopps!
        else {
            return Promise.reject(`sh: '${cmd}' command not found`);
        }
    }

    return { execute };

}
// #endregion shell

/**
 * Create a fresh terminal object
 */

// #region terminal
function createTerminal(target) {
    
    const term = new XTerminal({ target });

    const state = { 
        username: "user",
        hostname: "web"
    };

    // input evaluator
    const shell = createShell();

    // print prompt and get ready for user input
    function promptUser() {
        term.write(`┌[${state.username}@${state.hostname}]\n`);
        term.write("└$ ");
        term.resume();
        term.focus();
    }

    term.on('keypress', event => {
        console.debug(['keypress', event.key]);
    })

    // user input handler
    term.on("data", async input => {

        // write back
        term.writeln(input);

        // deactivate until the execution is done
        term.pause();

        // execute command
        await shell.execute(term, input)
            .then(res => res && term.writeln(res))
            .catch(err => err && term.writeln(`<span class="error">${err}</span>\n`))
            .finally(promptUser);
    });

    // greeting message
    term.writeln("Welcome to XTerminal (v" + XTerminal.version + ")");
    term.writeln("Type `help` for available commands\n");
    
    // kickstart
    promptUser();

    // remember to free resources
    window.addEventListener('unload', () => term.dispose());
}
// #endregion terminal