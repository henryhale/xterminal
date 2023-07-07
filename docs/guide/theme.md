# Theme

Personalize the terminal interface to your desired appearance.

The entire structure and appearance of the terminal is defined in the CSS file (`xterminal.css`) included during [installation](./installation.md#installation).

To customize anything, ensure that the new styles are include after the default styles.

```html
<link rel="stylesheet" href="path/to/xterminal.css"/>

<link rel="stylesheet" href="custom-styles.css"/>
<!-- OR -->
<style>
    /* custom styles */
</style>
```

## Width & Height

By default, the terminal occupies the full width and height of the parent element `#app`.

```html
<div id="app"></div>
```

To adjust the dimensions, use one of the following:

- Parent Element

```css
#app {
    width: 400px;
    height: 400px;
}
```

- Terminal CSS classname: `xt`

```css
.xt {
    width: 400px;
    height: 400px;
}
```

## Background

The default background depends on the value of the css variable: `--xt-bg`

**Example:**

```css
:root {
    --xt-bg: black;
}
```

## Text Color

To change the color of text, change `--xt-fg` css variable to the desired color

**Example:**

```css
:root {
    --xt-fg: lime;
}
```

## Font Size

Adjust the font size using `--xt-font-size` 

**Example:**

```css
:root {
    --xt-font-size: 1.5rem;
}
```

## Font Family

Set your favourite font style using `--xt-font-family`

**Example:**

```css
:root {
    --xt-font-family: 'Lucida Console', monospace;
}
```

Using Font URLS

```css
@import url('https://fonts.googleapis.com/css2?family=Fira+Code&display=swap');

:root {
    --xt-font-family: 'Fira Code', monospace;
}
```

## Padding

Adjust the padding of the terminal container using `--xt-padding` css variable

**Example:**

```css
:root {
    --xt-padding: 10px;
}
```

## Line Height

The default line height depends on the current font size. Adjust the line height using the css classname: `xt-stdout` for the output component 

**Example**

```css
.xt-stdout {
    line-height: 1.25;
}
```

## Blinking Cursor

To add the blinking effect to the cursor, apply the animation using the class name: `xt-cursor`

**Example:**

```css
@keyframes blink {
    0% { opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 0; }
}

.xt-cursor {
    animation: blink 1s linear infinite;
}
```