# Prompt

Interaction with the user is initiated with the method `prompt()` on the terminal object.
Calling this method activates the terminal and makes it ready to capture input from keyboard.

## Prompt Style

In most terminal emulators, the prompt style appears before the cursor. This is from the backing shell (e.g bash, zsh, fish) that prints it in the terminal. 

For example:

```
user@host:~ $ ▊
```

Or even

```
┌[user@host]
└$ ▊
```

In the same way, we can organize the flow of input with a prompt style just before the cursor.

Suppose the state of our app defines the `username` and `hostname` like so

```js
const state = { 
    username: 'root', 
    hostname: 'web' 
};
```

We can create a function to write our prompt style to the terminal, let it be `ask()`.

```js
function ask() {
    term.write(`┌[${state.username}@${state.hostname}]\n`);
    term.write('└$ ');
}
```

Everytime we write the prompt style, we want to be able to capture the next command input from
the user.

```js
function ask() {
    term.writeln(`┌[${state.username}@${state.hostname}]`);
    term.write('└$ ');
    term.prompt(); // [!code ++]
}
```

## Focus & Blur

You can programmatically focus the terminal input, toggling the keyboard in case of mobile devices, using the `focus()` method on the terminal instance.

Let's focus the input everytime we ask for input.

```js
function ask() {
    term.writeln(`┌[${state.username}@${state.hostname}]`);
    term.write('└$ ');
    term.prompt();
    term.focus(); // [!code ++]
}
```

In the same way, we might want to blur the terminal for some reason, let's say after entering
data and pressing the enter key. We can achieve that using the `data` event and the `blur()` method.

```js
term.on('data', () => {
    term.blur();
});
```

## Next Steps

User interaction enhanced with key bindings to the terminal
