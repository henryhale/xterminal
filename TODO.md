I've identified **multiple XSS (Cross-Site Scripting) vulnerabilities** in the xterminal repository. Here's a comprehensive analysis and solutions:

## Security Issues Found

### 1. **CRITICAL: Unsafe `innerHTML` in `source/renderer/dom.ts`** (Line 52)
The `h()` function accepts untrusted `html` property and directly assigns it to `innerHTML` without sanitization.

```typescript
// VULNERABLE CODE
if (options?.html) {
    elem.innerHTML = options.html;  // XSS vulnerability!
}
```

**Impact:** Any caller of `h()` with user-controlled data could inject malicious scripts.

---

### 2. **CRITICAL: Unescaped GitHub API Data in `docs/public/demo.js`** (Lines 29-40)
The GitHub user search displays API response data directly without sanitization:

```javascript
// VULNERABLE CODE
`<td rowspan="3" width="100"><img width="75" src="${res.avatar_url}" alt="${res.name}" /></td>` +
`<td>${res.name}</td>` +  // Not escaped!
`<td>${res.bio}</td>`     // Not escaped! Could contain malicious HTML
```

**Impact:** A GitHub user with a malicious name or bio could execute scripts in viewers' browsers.

---

### 3. **HIGH: HTML String Output in `source/output/index.ts`** (Line 42)
The `parseOutput()` function is used with `innerHTML` to render arbitrary text:

```typescript
// VULNERABLE CODE
public write(data: string, callback?: () => void): void {
    this.lastOutput = h<HTMLSpanElement>("span", {
        html: parseOutput(data)  // parseOutput just adds HTML, doesn't sanitize!
    });
}
```

**Impact:** Using `term.write()` with untrusted data is unsafe. The library correctly provides `term.writeSafe()` as recommended.

---

## Solutions

Here are the fixes I'm committing:

### **Commit 1: Sanitize the `h()` function in dom.ts**
```typescript
// Add a validation check - only allow html when it's from trusted sources
// Better: provide separate safe method or use textContent by default
if (options?.html) {
    // Only set innerHTML if explicitly marked as safe
    if (options.isSafe) {
        elem.innerHTML = options.html;
    } else {
        // Default to safe text content
        elem.textContent = options.html;
    }
}
```

### **Commit 2: Escape GitHub API data in demo.js**
```javascript
// Escape all user data from external sources
.then(res => {
    const escapedName = escapeHTML(res.name);
    const escapedBio = escapeHTML(res.bio);
    return(
        '<table border="0">' + 
            '<tr>' +
                `<td rowspan="3" width="100"><img width="75" src="${res.avatar_url}" alt="${escapedName}" /></td>` +
                `<td>Name</td>` +
                `<td>${escapedName}</td>` +
            '</tr>' +
            '<tr>' +
                `<td>Bio</td>` +
                `<td>${escapedBio}</td>` +
            '</tr>' +
            ...
```

### **Commit 3: Add security documentation**
Update documentation to emphasize:
- Always use `term.writeSafe()` for untrusted data
- Never use `term.write()` with external API data
- Use `XTerminal.escapeHTML()` for embedded HTML content
