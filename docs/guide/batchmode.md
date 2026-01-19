# Batch Mode

This refers to the non interactive mode where the user does not input anything and the terminal receives input from elsewhere.

## Implementation

Suppose that you want the users to only have a readonly interface or you would like to take control from the user for awhile, here is how you can achieve that;

- Pause the terminal input using [term.pause()](./prompt.md#pause-resume)

- Trigger events manually with arguments using [term.emit()](./events.md#arguments)

By default, the `data` event is triggered by the user input followed by `Enter` key. You can manually trigger the `data` event to mimic user interaction.

## Example

```js
// no user interactivity
term.pause();

// executes command
function handleInput(command) {
    switch (command) {
        case 'install':
            // ...
            console.log('installing...');
            // ...
            break;
        case 'commit':
            // ...
            console.log('commiting changes...');
            // ...
            break;
        case 'fetch':
            // ...
            console.log('fetching state...');
            // ...
        default:
            break;
    }
}

// register input callback
term.on('data', handleInput);

// demo shell script
const script = `
# install deps...
install

# save changes...
commit

# load state/resource...
fetch
`;

// run it
for (const line of script.split(/\n/)) {
    // skip empty lines and comments
    if (!line || line.startsWith("#")) continue;
    // execute line
    term.emit('data', line);
}
```