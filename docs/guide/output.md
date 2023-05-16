<script setup>
import BrowserPreview from '../.vitepress/theme/components/BrowserPreview.vue';
</script>

# Output

Information maybe output in a number of ways and logged in the terminal instance. With the help of [write()](../api/index.md) we can log data in `raw` format, as `html`.

## Raw Data

Raw data may include strings and numbers. 

Here is a simple `hello world` example:

```js
term.write('Hello World!');
```

<browser-preview>

    Hello World!▊
</browser-preview>

## Escape characters

Below is a list of available and ready to use escape characters;

- **`\n` - New line**

    When the `\n` character is encountered in the data to output, it moves the cursor to the next line.
    The data, after every instance of the `\n` character, is rendereed on a new line.

    Here is an example:

    ```js
    term.write(`Hello World!\n$ `);
    ```

    <browser-preview>

      Hello World!
      $ ▊
    </browser-preview>

    The same can be achieved using [writeln()](../api/index.md) which writes the
    data passed on the current line, followed by a new line character.

    ```js
    term.writeln(`Hello World!`);
    term.write('$ ');
    ```


- **`\t` - Tab**

    The tab character defaults to four (4) space characters.

    Example: 

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

For example: The following won't work as expected

```js
term.writeln('<b     class="text-blue">Bold Blue Text</b>');

term.writeln('<b style="color: dodgerblue    ">Bold Blue Text</b>');
```

Here is how it should be done

```js
term.writeln('<b     class="text-blue">Bold Blue Text</b>'); // [!code --]
term.writeln('<b class="text-blue">Bold Blue Text</b>'); // [!code ++]

term.writeln('<b style="color: dodgerblue    ">Bold Blue Text</b>'); // [!code --]
term.writeln('<b style="color: dodgerblue;">Bold Blue Text</b>'); // [!code ++]
```

However, multiple spaces are **okay** in between the opening and closing tags. For example:

```js
term.writeln('<b style="color: dodgerblue;">Bold      Blue      Text</b>');
```

## Clear Screen

To clear the entire terminal, you can do it programmatically using
[clear()](../api/index.md). 

```js
term.clear();
```

## Next Steps

Work with terminal events that help you trigger actions on the go.
