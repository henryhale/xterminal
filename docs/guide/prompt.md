# Prompt

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

## Pause & Resume

Using [term.pause()](../api/index.md#term-pause) will pause or deactivate the terminal from recieving user input whereas [term.resume()](../api/index.md#term-resume) will do the opposite.

:::warning Note
In both cases, _input_ is affected but not the _output_. You can still do write operations even when the input is deactivated.
:::

**Example:** Pause input for five (5) seconds and resume thereafter. 

```js
const term = new XTerminal();
term.mount('#app');

term.pause();

setTimeout(() => term.resume(), 5000);
```

In the five seconds, any keypress won't do anything.

---

Suppose that you want to do an async operation, it is a good 
practice to [pause](../api/index.md#term-pause) the terminal for input and [resume](../api/index.md#term-resume) later when the operation is done.

Whenever the input is recieved, we can pause the terminal and handle the async operation first.

```js
term.on("data", input => {
    term.pause();
    // ...
    // do something
    // ...
    term.resume();
});
```

Everytime we write the prompt style, we may want to be able to capture the next command input from the user. In this case, we can use the 
[term.resume()](../api/index.md#term-resume) method.

```js
function ask() {
    term.write(`┌[${state.username}@${state.hostname}]\n`);
    term.write('└$ ');
    term.resume(); // [!code ++]
}
```

## Focus & Blur

You can programmatically focus the terminal input, toggling the keyboard in case of mobile devices, using the [term.focus()](../api/index.md#term-focus) method on the terminal instance.

Let's focus the input everytime we ask for input.

```js
function ask() {
    term.writeln(`┌[${state.username}@${state.hostname}]`);
    term.write('└$ ');
    term.resume();
    term.focus(); // [!code ++]
}
```

In the same way, we might want to blur the terminal for some reason, let's say after entering
data and pressing the enter key. We can achieve that using the `data` event and the [term.blur()](../api/index.md#term-blur) method.

```js
term.on('data', () => {
    term.blur();
});
```

## Next Step

Learn about the history stack that stores all inputs
