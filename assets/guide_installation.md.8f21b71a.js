import{_ as s,o as a,c as l,X as n}from"./chunks/framework.59e5cd05.js";const h=JSON.parse('{"title":"Getting Started with XTerminal","description":"","frontmatter":{},"headers":[],"relativePath":"guide/installation.md","filePath":"guide/installation.md"}'),e={name:"guide/installation.md"},t=n(`<h1 id="getting-started-with-xterminal" tabindex="-1">Getting Started with XTerminal <a class="header-anchor" href="#getting-started-with-xterminal" aria-label="Permalink to &quot;Getting Started with XTerminal&quot;">​</a></h1><h2 id="installation" tabindex="-1">Installation <a class="header-anchor" href="#installation" aria-label="Permalink to &quot;Installation&quot;">​</a></h2><p>Below are some of the ways <code>XTerminal</code> can be installed;</p><ul><li><a href="./installation.html#using-cdn">CDN</a> - (for development with a simple setup)</li><li><a href="./installation.html#using-npm">NPM</a> - (use this if you are using bundlers or having a build step)</li></ul><h3 id="production-builds" tabindex="-1">Production Builds <a class="header-anchor" href="#production-builds" aria-label="Permalink to &quot;Production Builds&quot;">​</a></h3><p>There are two production ready builds:</p><ul><li><code>xterminal.umd.js</code> - for the browser (no build tools), it&#39;s minified</li><li><code>xterminal.esm.js</code> - in case of build tools like <a href="https://vitejs.dev" target="_blank" rel="noreferrer">Vite</a> or Webpack</li></ul><h2 id="using-npm" tabindex="-1">Using NPM <a class="header-anchor" href="#using-npm" aria-label="Permalink to &quot;Using NPM&quot;">​</a></h2><p><a href="https://npmjs.org" target="_blank" rel="noreferrer">NPM</a> is a popular javascript package manager on which <a href="https://npmjs.org/xterminal" target="_blank" rel="noreferrer">XTerminal</a> is a public npm package that can be installed by anyone.</p><p>To install it, run one of the following commands;</p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-DS_Ok" id="tab-jXJlkQH" checked="checked"><label for="tab-jXJlkQH">npm</label><input type="radio" name="group-DS_Ok" id="tab-XCi1bFu"><label for="tab-XCi1bFu">pnpm</label><input type="radio" name="group-DS_Ok" id="tab-Ov-ry1c"><label for="tab-Ov-ry1c">yarn</label></div><div class="blocks"><div class="language-sh active"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">xterminal</span></span></code></pre></div><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">pnpm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">add</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">xterminal</span></span></code></pre></div><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">yarn</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">add</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">xterminal</span></span></code></pre></div></div></div><p>It provides a production build of the latest release from it&#39;s <a href="https://github.com/henryhale/xterminal/" target="_blank" rel="noreferrer">GitHub repository</a>.</p><p><strong>Usage</strong></p><p>First include the styles in your markup:</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">link</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">rel</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">stylesheet</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./node_modules/xterminal/dist/xterminal.css</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>Then import the script into your application (ESM build by default).</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> XTerminal </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">xterminal</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(XTerminal</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">version)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><h2 id="using-cdn" tabindex="-1">Using CDN <a class="header-anchor" href="#using-cdn" aria-label="Permalink to &quot;Using CDN&quot;">​</a></h2><p>You can use any CDN that serves npm packages;</p><p>Install via CDN using one of the following;</p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-LSv3G" id="tab-6SDsdKl" checked="checked"><label for="tab-6SDsdKl">unpkg</label><input type="radio" name="group-LSv3G" id="tab-Z0BhJJU"><label for="tab-Z0BhJJU">jsdelivr</label></div><div class="blocks"><div class="language-html active"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">link</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">rel</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">stylesheet</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">https://unpkg.com/xterminal/dist/xterminal.css</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">https://unpkg.com/xterminal/dist/xterminal.umd.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">link</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">rel</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">stylesheet</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">https://cdn.jsdelivr.net/npm/xterminal/dist/xterminal.css</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">https://cdn.jsdelivr.net/npm/xterminal/dist/xterminal.umd.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div></div></div><p>Including <code>XTerminal</code> javascript file defines a global property <code>window.XTerminal</code> on the <code>window</code> object. This implies that the <code>XTerminal</code> class is globally accessible.</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(XTerminal</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">version)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//or</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(window</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">XTerminal</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">version)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><h2 id="next-step" tabindex="-1">Next Step <a class="header-anchor" href="#next-step" aria-label="Permalink to &quot;Next Step&quot;">​</a></h2><p>Now that you have installed <code>XTerminal</code>, it is time to dive into the essential parts.</p>`,25),o=[t];function p(r,i,c,d,D,y){return a(),l("div",null,o)}const u=s(e,[["render",p]]);export{h as __pageData,u as default};