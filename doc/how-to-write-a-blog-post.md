# How to Write and Publish a Blog Post

## Prerequisites

You only need to do this **once**.

1. Install [Node.js](https://nodejs.org/) (LTS version recommended)
2. Open a terminal in the project root folder
3. Run:
   ```
   npm install
   ```

---

## Writing a New Post

### Step 1 — Create a Markdown file

Create a new `.md` file inside the `blogs/posts/` folder.

**Naming convention:** use lowercase letters and hyphens only.

```
blogs/posts/my-new-post.md
blogs/posts/how-i-learned-rust.md
blogs/posts/docker-tips-2026.md
```

---

### Step 2 — Add front matter

Every post must start with a **front matter block** — a section between `---` lines that defines the post's metadata.

```markdown
---
title: "Your Post Title Here"
date: May 1, 2026
summary: "A short one or two sentence description. This appears on the blog listing page."
---
```

| Field     | Required | Description |
|-----------|----------|-------------|
| `title`   | Yes      | The post title shown at the top of the page |
| `date`    | Yes      | Publication date (any readable format) |
| `summary` | Yes      | Short description shown on the blog listing page |

---

### Step 3 — Write your content in Markdown

After the closing `---`, write your post content using standard Markdown.

#### Headings

```markdown
## Section Title
### Subsection
#### Sub-subsection
```

#### Text formatting

```markdown
**bold text**
*italic text*
`inline code`
```

#### Links

```markdown
[Link text](https://example.com)
```

#### Images

Place your image files in `resource/images/` and reference them like this:

```markdown
![Alt text](../resource/images/your-image.png)
```

#### Code blocks

Wrap code with triple backticks and specify the language for syntax highlighting:

````markdown
```python
def hello():
    print("Hello, world!")
```
````

````markdown
```cpp
#include <iostream>
int main() {
    std::cout << "Hello" << std::endl;
}
```
````

````markdown
```javascript
const greet = () => console.log("Hello");
```
````

Supported languages include: `python`, `cpp`, `c`, `javascript`, `typescript`, `bash`, `sql`, `json`, `html`, `css`, `go`, `rust`, and many more.

#### Tables

```markdown
| Column A | Column B | Column C |
|----------|----------|----------|
| Value 1  | Value 2  | Value 3  |
| Value 4  | Value 5  | Value 6  |
```

#### Lists

```markdown
- Item one
- Item two
  - Nested item

1. First
2. Second
3. Third
```

#### Blockquotes

```markdown
> This is a blockquote. Good for notes or callouts.
```

#### Horizontal rule

```markdown
---
```

---

### Full example post

```markdown
---
title: "Getting Started with Rust"
date: May 1, 2026
summary: "A beginner-friendly introduction to Rust — why it exists, how to set it up, and your first program."
---

Rust is a systems programming language focused on safety, speed, and concurrency.

## Why Rust?

- No garbage collector
- Memory safety guaranteed at compile time
- Great performance comparable to C/C++

## Installation

Download Rust via [rustup](https://rustup.rs/):

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

## Hello World

```rust
fn main() {
    println!("Hello, world!");
}
```

Run it:

```bash
cargo run
```

## Summary

| Feature        | Rust | C++ | Python |
|----------------|------|-----|--------|
| Memory safety  | ✓    |     | ✓      |
| Performance    | ✓    | ✓   |        |
| Easy to learn  |      |     | ✓      |
```

---

## Converting to HTML

### Step 1 — Run the converter

Double-click **`convert.bat`** in the project root.

Or from a terminal:

```
node convert-blogs.js
```

### What the script does automatically

- Converts every `.md` file in `blogs/posts/` to a styled `.html` file in `blogs/`
- Applies syntax highlighting to all code blocks
- Calculates reading time
- Sorts posts by date (newest first)
- Regenerates `scripts/blogdata.js` with all post metadata

### Output

```
blogs/
  posts/
    my-new-post.md        ← you write this
  my-new-post.html        ← auto-generated, do not edit
scripts/
  blogdata.js             ← auto-regenerated, do not edit
```

---

## Publishing to GitHub Pages

1. Run `convert.bat` to generate the HTML files
2. Commit and push to GitHub:

   ```bash
   git add .
   git commit -m "add new blog post: your post title"
   git push
   ```

3. GitHub Pages will serve the updated site automatically.

---

## Tips

- **Never edit the generated `.html` files** in `blogs/` directly. They will be overwritten the next time you run the converter. Always edit the `.md` source file.
- **Always run `convert.bat`** before pushing to GitHub, otherwise your new post won't appear on the site.
- You can write and preview Markdown in VS Code using the built-in Markdown preview (`Ctrl+Shift+V`).
- If you use GitHub's web editor, you can create `.md` files directly in the browser — then just pull the changes locally and run `convert.bat`.
