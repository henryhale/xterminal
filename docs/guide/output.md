# Output

Information maybe output in a number of ways and logged in the terminal instance with the help of [term.write()](../api/index.md#term-write) or [term.writeln()](../api/index.md#term-writeln).

## Raw Data

Raw data may include strings and numbers. 

Here is a simple `hello world` example:

```js
term.write('Hello World!');
```

<browser-preview>

    Hello World!▊
</browser-preview>

With an optional callback function,

```js
term.write('Hello World!', () => console.log('Done!'));
// Done!
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
    term.write('$ ');
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
term.writeln('Welcome to Space!');
term.writeln('Loading...');
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
    10% { content: "⠙"; }
    20% { content: "⠹"; }
    30% { content: "⠸"; }
    40% { content: "⠼"; }
    50% { content: "⠴"; }
    60% { content: "⠦"; }
    70% { content: "⠧"; }
    80% { content: "⠇"; }
    90% { content: "⠏"; }
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
