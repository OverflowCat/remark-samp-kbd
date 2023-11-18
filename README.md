# ``remark-samp-kbd``

`remark-samp-kbd` is a [remark](https://github.com/remarkjs/remark/) plugin
thats add semantic distinctions between
code fragments (`<code>`),
program outputs (`<samp>`),
keyboard keys (`<kbd>`),
and variables (`<var>`)
by using different numbers of backticks.

## Features

- **Code Fragments ([`<code>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/code)):** 4k+1 for inline code references.
- **Program Outputs ([`<samp>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/samp)):** 4k+2 backticks, suitable for displaying names, paths, URIs (if not made a link) and any program output.
- **Keyboard Keys ([`<kbd>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/kbd)):** 4k+3 backticks to denote key strokes.
- **Mathematical Variables ([`<var>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/var)):** 4k+4 for variables.

(Here, <var>k<var> is a non-negative integer.)

## Attribution

This plugin is inspired by [@GeeLaw](https://github.com/GeeLaw)'s [blog(post)](https://geelaw.blog/entries/meta-blog/#:~:text=Use%204k%2B1%20to%204k%2B4%20numbers%20of%20%60%20to%20represent%20different%20semantics).

> To remember this rule, remember that longer tag uses fewer backticks, and for the same length, the order is the lexicographical order.

## License

[WTFPL](./LICENSE).
