import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import MarkdownIt from 'markdown-it';
import * as puppeteer from 'puppeteer';

export function activate(context: vscode.ExtensionContext) {

    // Register the command
    let disposable = vscode.commands.registerCommand('clean-md-pdf.convert', async () => {

        const editor = vscode.window.activeTextEditor;

        if (!editor) {
            vscode.window.showErrorMessage('No active editor found!');
            return;
        }

        // 1. Get the current document details
        const doc = editor.document;
        if (doc.languageId !== 'markdown') {
            vscode.window.showErrorMessage('Active file is not a Markdown file.');
            return;
        }

        // 2. Prepare paths
        // This puts the PDF in the same folder as the MD file
        const mdPath = doc.fileName;
        const pdfPath = mdPath.replace(/\.md$/i, '.pdf');

        // 3. Convert Markdown to HTML with syntax highlighting enabled
        const md = new MarkdownIt({
            html: true,
            linkify: true,
            typographer: true,
            highlight: function (str, lang) {
                return `<pre class="hljs"><code>${str}</code></pre>`;
            }
        });
        const mdContent = doc.getText();
        const bodyContent = md.render(mdContent);

        // Extract document title (first h1) for header
        const titleMatch = mdContent.match(/^#\s+(.+)$/m);
        const docTitle = titleMatch ? titleMatch[1] : path.basename(mdPath, '.md');

        // Generate Table of Contents from headings
        const headings = mdContent.match(/^#{1,3}\s+.+$/gm) || [];
        let toc = '';
        if (headings.length > 1) {
            toc = '<div class="toc"><h2>Table of Contents</h2><ul>';
            headings.forEach((heading, index) => {
                const levelMatch = heading.match(/^#+/);
                if (!levelMatch) return;
                const level = levelMatch[0].length;
                const text = heading.replace(/^#+\s+/, '');
                const indent = level === 1 ? '' : level === 2 ? 'toc-indent-1' : 'toc-indent-2';
                toc += `<li class="${indent}"><a href="#heading-${index}">${text}</a></li>`;
            });
            toc += '</ul></div>';
        }

        // Add IDs to headings for TOC links
        let bodyWithIds = bodyContent;
        let headingIndex = 0;
        bodyWithIds = bodyWithIds.replace(/<h([1-3])>/g, () => {
            return `<h$1 id="heading-${headingIndex++}">`;
        });

        // 4. Wrap HTML with enhanced CSS
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css">
                <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
                <style>
                    /* Page setup with headers */
                    @page {
                        margin: 2.5cm 2cm 2cm 2cm;
                        @top-center {
                            content: "${docTitle}";
                            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
                            font-size: 10px;
                            color: #666;
                        }
                        @top-right {
                            content: "Page " counter(page);
                            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
                            font-size: 10px;
                            color: #666;
                        }
                    }

                    /* Base typography */
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif;
                        font-size: 16px;
                        line-height: 1.6;
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 30px;
                        color: #24292e;
                        background-color: #ffffff;
                    }

                    /* Enhanced headings */
                    h1, h2, h3, h4, h5, h6 {
                        margin-top: 24px;
                        margin-bottom: 16px;
                        font-weight: 600;
                        line-height: 1.25;
                        page-break-after: avoid;
                    }

                    h1 {
                        font-size: 2em;
                        border-bottom: 2px solid #e1e4e8;
                        padding-bottom: 0.3em;
                        margin-top: 0;
                        letter-spacing: -0.5px;
                    }

                    h2 {
                        font-size: 1.5em;
                        border-bottom: 1px solid #e1e4e8;
                        padding-bottom: 0.3em;
                        letter-spacing: -0.3px;
                    }

                    h3 {
                        font-size: 1.25em;
                    }

                    /* Better paragraph spacing */
                    p {
                        margin-top: 0;
                        margin-bottom: 16px;
                    }

                    /* Enhanced links */
                    a {
                        color: #0366d6;
                        text-decoration: none;
                        border-bottom: 1px solid #0366d633;
                        transition: all 0.2s;
                    }

                    a:hover {
                        color: #0056b3;
                        border-bottom-color: #0056b3;
                    }

                    /* Print URLs after links */
                    @media print {
                        a[href]:after {
                            content: " (" attr(href) ")";
                            font-size: 0.8em;
                            color: #666;
                        }
                        a[href^="#"]:after {
                            content: "";
                        }
                    }

                    /* Enhanced code blocks with syntax highlighting */
                    code {
                        background-color: #f6f8fa;
                        padding: 0.2em 0.4em;
                        border-radius: 3px;
                        font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
                        font-size: 0.85em;
                        color: #e83e8c;
                    }

                    pre {
                        background-color: #f6f8fa;
                        padding: 16px;
                        overflow: auto;
                        border-radius: 6px;
                        font-size: 0.85em;
                        line-height: 1.45;
                        border: 1px solid #e1e4e8;
                        page-break-inside: avoid;
                    }

                    pre code {
                        background-color: transparent;
                        padding: 0;
                        color: inherit;
                        border-radius: 0;
                    }

                    /* Enhanced tables */
                    table {
                        border-collapse: collapse;
                        width: 100%;
                        margin: 20px 0;
                        overflow: hidden;
                        border-radius: 6px;
                        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                        page-break-inside: avoid;
                    }

                    th {
                        background-color: #f6f8fa;
                        color: #24292e;
                        font-weight: 600;
                        padding: 12px 16px;
                        text-align: left;
                        border: 1px solid #e1e4e8;
                    }

                    td {
                        padding: 12px 16px;
                        border: 1px solid #e1e4e8;
                    }

                    tr:nth-child(even) {
                        background-color: #f9fafb;
                    }

                    tr:hover {
                        background-color: #f3f4f6;
                    }

                    /* Enhanced blockquotes */
                    blockquote {
                        border-left: 4px solid #dfe2e5;
                        color: #6a737d;
                        padding: 0 1em;
                        margin: 16px 0;
                        background-color: #f6f8fa;
                        border-radius: 0 4px 4px 0;
                        page-break-inside: avoid;
                    }

                    /* Images */
                    img {
                        max-width: 100%;
                        height: auto;
                        border-radius: 6px;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                        margin: 16px 0;
                        page-break-inside: avoid;
                    }

                    /* Lists */
                    ul, ol {
                        padding-left: 2em;
                        margin: 16px 0;
                    }

                    li {
                        margin: 4px 0;
                    }

                    /* Horizontal rule */
                    hr {
                        height: 2px;
                        border: 0;
                        background-color: #e1e4e8;
                        margin: 24px 0;
                    }

                    /* Table of Contents */
                    .toc {
                        background-color: #f6f8fa;
                        border: 1px solid #e1e4e8;
                        border-radius: 6px;
                        padding: 20px;
                        margin: 30px 0;
                        page-break-inside: avoid;
                    }

                    .toc h2 {
                        margin-top: 0;
                        border-bottom: none;
                        font-size: 1.3em;
                    }

                    .toc ul {
                        list-style: none;
                        padding-left: 0;
                    }

                    .toc li {
                        margin: 8px 0;
                    }

                    .toc a {
                        color: #0366d6;
                        text-decoration: none;
                        border-bottom: none;
                    }

                    .toc a:hover {
                        text-decoration: underline;
                    }

                    .toc-indent-1 {
                        padding-left: 20px;
                    }

                    .toc-indent-2 {
                        padding-left: 40px;
                    }

                    /* Page break control */
                    h1, h2, h3, h4, h5, h6 {
                        page-break-after: avoid;
                    }

                    pre, blockquote, table, img {
                        page-break-inside: avoid;
                    }

                    /* Cover page (if first h1 exists) */
                    .cover-page {
                        text-align: center;
                        padding: 100px 0;
                        page-break-after: always;
                    }

                    .cover-page h1 {
                        font-size: 3em;
                        margin-bottom: 20px;
                        border-bottom: none;
                    }

                    .cover-page .meta {
                        font-size: 1.2em;
                        color: #666;
                        margin-top: 30px;
                    }
                </style>
            </head>
            <body>
                ${toc}
                ${bodyWithIds}
                <script>
                    document.addEventListener('DOMContentLoaded', (event) => {
                        document.querySelectorAll('pre code').forEach((block) => {
                            hljs.highlightElement(block);
                        });
                    });
                </script>
            </body>
            </html>
        `;

        // 5. Progress Indicator (User feedback)
        vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Generating PDF...",
            cancellable: false
        }, async (progress, token) => {

            try {
                // 6. Launch Puppeteer (Headless Chrome)
                const browser = await puppeteer.launch();
                const page = await browser.newPage();

                // Set content
                await page.setContent(html, { waitUntil: 'networkidle0' });

                // 7. Print to PDF
                // displayHeaderFooter: false ensures NO watermarks/filenames at the bottom
                await page.pdf({
                    path: pdfPath,
                    format: 'A4',
                    printBackground: true,
                    margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' },
                    displayHeaderFooter: false
                });

                await browser.close();
                vscode.window.showInformationMessage(`PDF created successfully: ${path.basename(pdfPath)}`);

            } catch (error) {
                vscode.window.showErrorMessage(`Failed to convert PDF: ${error}`);
            }
        });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() { }
