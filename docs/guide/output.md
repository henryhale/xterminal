# Output

Information maybe output in a number of ways and logged in the terminal instance with the help of [term.write()](../api/index.md#term-write), [term.writeln()](../api/index.md#term-writeln), [term.writeSafe()](../api/index.md#term-writesafe) or [term.writelnSafe()](../api/index.md#term-writelnsafe).

## Raw Data

Raw data may include strings and numbers.

Here is a simple `hello world` example:

```js
term.write("Hello World!");
```

<browser-preview>

    Hello World!▊

</browser-preview>

With an optional callback function,

```js
term.write("Hello World!", () => console.log("Done!"));
// Done!
```

When dealing with arbitrary (untrustworthy) data like user input or remote resources,
use `term.writeSafe` to securely print to the terminal. For more details, see [HTML Strings section](#html-strings).

```js
const someData = "...";

term.writeSafe(someData);
```

## Escape characters

Below is a list of available and ready to use escape characters;

- **`\n` - New line**

    When the `\n` character is encountered in the data to output, it moves the cursor to the next line.
    The data, after every instance of the `\n` character, is rendereed on a new line.

    **Example:**

    ```js
    term.write(`Hello World!\n$ `);
    ```

      <browser-preview>

        Hello World!
        $ ▊

      </browser-preview>

    The same can be achieved using [term.writeln()](../api/index.md#term-writeln) which writes the
    data passed on the current line, followed by a new line character.

    ```js
    term.writeln(`Hello World!`);
    term.write("$ ");
    ```

- **`\t` - Tab**

    The tab character defaults to _four_ (4) space characters.

    **Example:**

    ```js
    term.writeln(`Hello World!\tYou're Welcome.`);
    ```

      <browser-preview>

        Hello World!    You're welcome.
        ▊

      </browser-preview>

## HTML Strings

You might want to output some HTML string, here is how you can do it;

```js
term.writeln(`<b>Bold Text</b> - <i>Italics</i>`);
```

<browser-preview>

<b>Bold Text</b> - <i>Italics</i>
<br>▊
</browser-preview>

### Safe Output

::: warning
- Use [term.writeSafe()](../api/index.md#term-writesafe) or [term.writelnSafe()](../api/index.md#term-writelnsafe) to safely output arbitrary data to the terminal.
These methods sanitize the data before being output to the terminal, specifically, before appending it to the DOM.

Avoid outputting data from arbitrary sources like user input or remote sources (such as images).  
Doing so has been proved to allow for malicious attacks like XSS where a user may input some HTML
code that could potentially expose user information such as session cookies or even inject malicious scripts on the page.

For example: `term.writeln("<img onerror=alert('hacked') />")` would run the malicious script and you would see an alert dialog.

Additionally use [XTerminal.escapeHTML()](#xterminal-escapehtml) or external libraries like DOMPurify to sanitize arbitrary data before outputting it using `term.write()` or `term.writeln()`. See examples below.
:::

```js
term.writelnSafe(`<b>Bold Text</b> - <i>Italics</i>`);
```

<browser-preview>

\<b>Bold Text<\/b> - \<i>Italics<\/i>
<br>▊
</browser-preview>

Use [XTerminal.escapeHTML()](#xterminal-escapehtml) to sanitize some data before printing it.

This is helpful when using HTML containers for some other data like showing errors in red.

```js
const err = `<img onerror="alert('hacked')" />`

term.writeln(`<p style="color:red">${XTerminal.escapeHTML(err)}</p>`)
```


### Attributes

To output valid HTML tags with attributes, there must be a **single space** separation between the attributes in every opening tag.

**For example:** The following won't work as expected

```js
term.writeln('<b     class="text-blue">Bold Blue Text</b>');

term.writeln('<b style="color: dodgerblue    ">Bold Blue Text</b>');
```

Here is how it should be done

```js
term.writeln('<b     class="text-blue">Bold Blue Text</b>'); // [!code --]
term.writeln('<b class="text-blue">Bold Blue Text</b>'); // [!code ++]

term.writeln('<b style="color: dodgerblue    ">Bold Blue Text</b>'); // [!code --]
term.writeln('<b style="color: dodgerblue">Bold Blue Text</b>'); // [!code ++]
```

However, multiple spaces are **okay** in between the opening and closing tags.

**For example:**

```js
term.writeln('<b style="color: dodgerblue">Bold      Blue      Text</b>');
```

## Clear Screen

To clear the entire terminal, you can do it programmatically using
[term.clear()](../api/index.md#term-clear).

```js
term.clear();
```

## Clear Last Output

To remove the output for the previous write operation, [term.clearLast()](../api/index.md#term-clearlast) does the job.

:::info
This is like the undo method but for only one output operation.
:::

**Example:**

```js
term.writeln("Welcome to Space!");
term.writeln("Loading...");
term.clearLast();
```

<browser-preview>

Welcome to Space!
<br>▊
</browser-preview>

It is useful in several cases for example when implementing a loader.

:::details Example: 5s loader

- **Styles**

    ```css
    .spinner:after {
        animation: changeContent 0.8s linear infinite;
        content: "⠋";
    }

    @keyframes changeContent {
        10% {
            content: "⠙";
        }
        20% {
            content: "⠹";
        }
        30% {
            content: "⠸";
        }
        40% {
            content: "⠼";
        }
        50% {
            content: "⠴";
        }
        60% {
            content: "⠦";
        }
        70% {
            content: "⠧";
        }
        80% {
            content: "⠇";
        }
        90% {
            content: "⠏";
        }
    }
    ```

- **Script**

    ```js
    term.write('<span class="spinner"></span> Loading...');

    setTimeout(() => term.clearLast(), 5000);
    ```

:::

## Next Step

Work with terminal events that help you trigger actions on the go.
