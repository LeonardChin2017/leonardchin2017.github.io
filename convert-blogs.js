/**
 * Blog Converter: Markdown → HTML
 * ─────────────────────────────────
 * Reads all .md files in blogs/posts/, converts them to styled HTML,
 * writes the HTML to blogs/, and auto-regenerates scripts/blogdata.js.
 *
 * Usage:  node convert-blogs.js
 */

const fs   = require('fs');
const path = require('path');

// ── Load dependencies ──────────────────────────────────────────────────────
let marked, hljs;
try {
    ({ marked } = require('marked'));
    hljs = require('highlight.js');
} catch (e) {
    console.error('\n  Missing dependencies. Run this first:\n\n    npm install\n');
    process.exit(1);
}

// ── Configure marked with syntax highlighting ──────────────────────────────
const renderer = new marked.Renderer();

renderer.code = function(code, language) {
    const lang = (language && hljs.getLanguage(language)) ? language : 'plaintext';
    const highlighted = hljs.highlight(code, { language: lang }).value;
    return `<pre><code class="hljs language-${lang}">${highlighted}</code></pre>\n`;
};

// Open external links in new tab
renderer.link = function(href, title, text) {
    const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'));
    const titleAttr = title ? ` title="${title}"` : '';
    const target = isExternal ? ' target="_blank" rel="noopener"' : '';
    return `<a href="${href}"${titleAttr}${target}>${text}</a>`;
};

marked.use({ renderer, gfm: true, breaks: true });

// ── Helpers ────────────────────────────────────────────────────────────────
function escHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function readTime(text) {
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.round(words / 200)) + ' min read';
}

/**
 * Parse YAML-ish front matter between --- delimiters.
 * Handles both LF and CRLF line endings.
 */
function parseFrontMatter(raw) {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!match) return { meta: {}, body: raw };

    const meta = {};
    match[1].split(/\r?\n/).forEach(line => {
        const m = line.match(/^(\w+):\s*(.+)$/);
        if (m) meta[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '');
    });

    return { meta, body: match[2] };
}

/**
 * Extract first plain-text paragraph as summary fallback.
 */
function autoSummary(markdown) {
    const lines = markdown.split(/\r?\n/);
    const para = [];
    let started = false;

    for (const line of lines) {
        const trimmed = line.trim();
        if (!started) {
            if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('!')) started = true;
            else continue;
        }
        if (trimmed === '') break;
        para.push(trimmed);
    }

    const text = para.join(' ').replace(/[*_`#\[\]]/g, '').replace(/\(https?[^)]+\)/g, '').trim();
    return text.length > 200 ? text.slice(0, 197) + '...' : text;
}

// ── HTML template ──────────────────────────────────────────────────────────
function buildHtml(meta, bodyHtml) {
    const title   = meta.title || 'Blog Post';
    const date    = meta.date  || '';
    const rt      = meta._readTime || '';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escHtml(title)}</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css">
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
            --text:    #111;
            --muted:   #666;
            --border:  #e5e5e5;
            --code-bg: #f6f6f6;
        }

        html { scroll-behavior: smooth; }

        body {
            background: #fff;
            color: var(--text);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
            font-size: 17px;
            line-height: 1.75;
            padding: 0 20px 80px;
        }

        #progress-bar {
            position: fixed;
            top: 0; left: 0;
            height: 2px;
            width: 0%;
            background: var(--text);
            z-index: 100;
            transition: width 0.1s linear;
        }

        .post {
            max-width: 720px;
            margin: 0 auto;
            padding-top: 48px;
        }

        .post-nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 48px;
        }

        .back-link {
            font-size: 14px;
            color: var(--muted);
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 5px;
        }
        .back-link:hover { color: var(--text); }

        .read-time { font-size: 13px; color: var(--muted); }

        .post-header { margin-bottom: 40px; }

        .post-header h1 {
            font-size: 2rem;
            font-weight: 700;
            line-height: 1.25;
            letter-spacing: -0.02em;
            margin-bottom: 12px;
        }

        .post-date { font-size: 14px; color: var(--muted); }

        .post-divider {
            border: none;
            border-top: 1px solid var(--border);
            margin: 32px 0;
        }

        /* ── Body content ── */
        #post-body h1 { font-size: 1.75rem; font-weight: 700; margin: 2em 0 0.5em; letter-spacing: -0.02em; }
        #post-body h2 { font-size: 1.35rem; font-weight: 600; margin: 2em 0 0.5em; letter-spacing: -0.01em; }
        #post-body h3 { font-size: 1.1rem;  font-weight: 600; margin: 1.75em 0 0.4em; }
        #post-body h4 { font-size: 1rem;    font-weight: 600; margin: 1.5em 0 0.4em; }

        #post-body p { margin-bottom: 1.25em; }

        #post-body a { color: var(--text); text-decoration: underline; text-underline-offset: 3px; }
        #post-body a:hover { opacity: 0.6; }

        #post-body ul, #post-body ol { padding-left: 1.5em; margin-bottom: 1.25em; }
        #post-body li { margin-bottom: 0.35em; }
        #post-body li > ul, #post-body li > ol { margin-top: 0.35em; margin-bottom: 0; }

        #post-body hr { border: none; border-top: 1px solid var(--border); margin: 2em 0; }

        #post-body blockquote {
            border-left: 3px solid var(--border);
            padding-left: 1em;
            color: var(--muted);
            margin: 1.5em 0;
            font-style: italic;
        }

        #post-body img {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 1.5em auto;
            border-radius: 4px;
        }

        /* Tables */
        #post-body table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5em 0;
            font-size: 14px;
            display: block;
            overflow-x: auto;
        }
        #post-body th, #post-body td {
            padding: 8px 14px;
            border: 1px solid var(--border);
            text-align: left;
            vertical-align: top;
        }
        #post-body th {
            background: var(--code-bg);
            font-weight: 600;
            font-size: 13px;
        }
        #post-body tr:nth-child(even) td { background: #fafafa; }

        /* Code */
        #post-body code {
            font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
            font-size: 0.85em;
            background: var(--code-bg);
            padding: 2px 5px;
            border-radius: 3px;
        }
        #post-body pre {
            background: var(--code-bg);
            border: 1px solid var(--border);
            border-radius: 6px;
            padding: 16px;
            overflow-x: auto;
            margin: 1.5em 0;
            line-height: 1.55;
        }
        #post-body pre code {
            background: none;
            padding: 0;
            font-size: 14px;
            border-radius: 0;
        }
        /* Override highlight.js background so our border shows */
        #post-body pre code.hljs { background: transparent; padding: 0; }

        @media (max-width: 600px) {
            body { font-size: 16px; padding: 0 16px 60px; }
            .post { padding-top: 32px; }
            .post-header h1 { font-size: 1.6rem; }
        }
    </style>
</head>
<body>
    <div id="progress-bar"></div>
    <div class="post">
        <nav class="post-nav">
            <a class="back-link" href="javascript:history.back()">
                &#8592; Back
            </a>
            <span class="read-time">${escHtml(rt)}</span>
        </nav>

        <header class="post-header">
            <h1>${escHtml(title)}</h1>
            ${date ? `<p class="post-date">Published on ${escHtml(date)}</p>` : ''}
        </header>

        <hr class="post-divider">

        <article id="post-body">
${bodyHtml}        </article>
    </div>

    <script>
        window.addEventListener('scroll', function() {
            var doc = document.documentElement;
            var scrolled = doc.scrollTop / (doc.scrollHeight - doc.clientHeight);
            document.getElementById('progress-bar').style.width = Math.min(scrolled * 100, 100) + '%';
        });
    </script>
</body>
</html>`;
}

// ── Main ───────────────────────────────────────────────────────────────────
const POSTS_DIR  = path.join(__dirname, 'blogs', 'posts');
const OUTPUT_DIR = path.join(__dirname, 'blogs');
const BLOGDATA   = path.join(__dirname, 'scripts', 'blogdata.js');

const mdFiles = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));

if (mdFiles.length === 0) {
    console.log('No .md files found in blogs/posts/');
    process.exit(0);
}

const entries = [];
let converted = 0;

for (const file of mdFiles) {
    const slug    = path.basename(file, '.md');
    const srcPath = path.join(POSTS_DIR, file);
    const outPath = path.join(OUTPUT_DIR, slug + '.html');

    const raw = fs.readFileSync(srcPath, 'utf8');
    const { meta, body } = parseFrontMatter(raw);

    meta._readTime = readTime(body);
    const bodyHtml = marked.parse(body);
    const html     = buildHtml(meta, bodyHtml);

    fs.writeFileSync(outPath, html, 'utf8');
    converted++;
    console.log(`  ✓  ${slug}.html`);

    entries.push({
        title:   meta.title   || slug,
        date:    meta.date    || '',
        content: meta.summary || autoSummary(body),
        link:    `blogs/${slug}.html`,
        _order:  meta.date    || '0000'
    });
}

// Sort by date descending (most recent first)
entries.sort((a, b) => {
    const da = new Date(a._order);
    const db = new Date(b._order);
    if (isNaN(da) || isNaN(db)) return 0;
    return db - da;
});

// Write blogdata.js
const rows = entries.map(e =>
`    {
        title: ${JSON.stringify(e.title)},
        date: ${JSON.stringify(e.date)},
        content: ${JSON.stringify(e.content)},
        link: ${JSON.stringify(e.link)}
    }`
).join(',\n');

const blogdataContent = `var blogData = [\n${rows},\n];\n`;
fs.writeFileSync(BLOGDATA, blogdataContent, 'utf8');

console.log(`\n  Done! Converted ${converted} post(s) → blogs/*.html`);
console.log('  blogdata.js updated.\n');
