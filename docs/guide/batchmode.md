# Batch Mode

This refers to the non interactive mode where the user does not input anything and the terminal receives input from elsewhere.

## Implementation

Suppose that you want the users to only have a readonly interface or you would like to take control from the user for awhile, here is how you can achieve that;

- Pause the terminal input using [term.pause()](./prompt.md#pause--resume)

- Trigger events manually with arguments using [term.emit()](./events.md#arguments)

By default, the `data` event is triggered by the user input followed by `enter` key. You can manually trigger the `data` event to mimic user interaction.

## Example

```js
term.pause();

function handleInput(str) {
    switch (str) {
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

term.on('data', handleInput);

term.emit('data', 'install');
    // installing...
term.emit('data', 'commit');
    // commiting changes...
term.emit('data', 'fetch');
    // fetching state...
```