import 'xterminal/dist/xterminal.css';
import './style.css';

import XTerminal from 'xterminal';

const term = new XTerminal();

term.mount('#app');
// or
/*
  const root = document.getElementById('app');
  if (root) term.mount(root);
*/

function showIntro() {
    term.writeln(`<span class="center"><pre>  _   _   _   _   _   _   _   _   _  
 / \\ / \\ / \\ / \\ / \\ / \\ / \\ / \\ / \\ 
-  X   T   E   R   M   I   N   A   L  -
 \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ </pre></span>`)
        .writeln('Welcome to XTerminal!')
        .writeln('\nNote: This is just a simple demo with no backing shell,')
        .writeln('Just type anything and hit enter.')
        .writeln('\n[hint] To clear screen, type clear or CTRL+L')
        .writeln('[hint] To quit, type exit');
}

function promptUser() {
    term.write('\n# ').prompt();
    term.focus();
}

term.on('data', data => {
    if (data === 'exit') {
        return term.dispose();
    } else if (data === 'clear') {
        term.clear();
    } else {
        term
            .writeln(data)
            .writeln('Data: ' + data)
    }
    promptUser();
});

term.on('clear', () => {
    showIntro();
    promptUser();
});

term.emit('clear');
