const term = new XTerminal();

// term.mount('#term');
// or
term.mount(
    document.getElementById('term')
);

term.writeln(`<span style="text-align: center"><pre>  _   _   _   _   _   _   _   _   _  
 / \\ / \\ / \\ / \\ / \\ / \\ / \\ / \\ / \\ 
-  X   T   E   R   M   I   N   A   L  -
 \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ </pre></span>`);

term.writeln('Welcome to XTerminal!')
    .writeln('\nNote: This is just a simple demo with no backing shell,')
    .writeln('Just type anything and hit enter.')
    .writeln('\n[hint] To clear screen, type clear or CTRL+L')
    .writeln('[hint] To quit, type exit')
    .write('\n# ');

term.on('data', data => {
    if (data === 'exit') {
        return term.dispose();
    } else if (data === 'clear') {
        term.clear();
    } else {
        term
            .writeln(data)
            .writeln('Data: ' + data)
            .write('# ');
    }
    term.prompt();
});

term.on('clear', () => term.write('# '));

term.focus();

term.prompt();
