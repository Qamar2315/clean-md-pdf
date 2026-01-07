import * as vscode from 'vscode';
import MarkdownIt from 'markdown-it';
import * as fs from 'fs';
import * as path from 'path';
import { PDFConfig } from './config';
import { getThemeCSS } from './themes';
import { extractDocumentTitle, generateTOC, addHeadingIds } from './utils';

export interface HTMLConversionOptions {
    filePath: string;
    outputPath: string;
    config: PDFConfig;
    standalone?: boolean; // true = embedded CSS, false = separate CSS file
}

export async function convertMarkdownToHTML(options: HTMLConversionOptions): Promise<void> {
    const { filePath, outputPath, config, standalone = true } = options;

    // Read markdown file
    const document = await vscode.workspace.openTextDocument(filePath);
    const mdContent = document.getText();

    // Extract title
    const docTitle = extractDocumentTitle(mdContent, filePath);

    // Convert Markdown to HTML
    const md = new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true,
        highlight: function (str, lang) {
            return `<pre class="hljs"><code>${str}</code></pre>`;
        }
    });

    let bodyContent = md.render(mdContent);

    // Generate Table of Contents if enabled
    let toc = '';
    if (config.includeTOC) {
        toc = generateTOC(mdContent);
    }

    // Add IDs to headings for TOC links
    bodyContent = addHeadingIds(bodyContent);

    // Get theme CSS
    const themeCSS = getThemeCSS(config.theme, docTitle);

    if (standalone) {
        // Export as single HTML file with embedded CSS
        const html = generateStandaloneHTML(toc, bodyContent, themeCSS, docTitle);
        await fs.promises.writeFile(outputPath, html, 'utf-8');
    } else {
        // Export as HTML + separate CSS file
        const cssPath = outputPath.replace(/\.html$/, '.css');
        const html = generateHTMLWithLinkedCSS(toc, bodyContent, docTitle, path.basename(cssPath));
        await fs.promises.writeFile(outputPath, html, 'utf-8');
        await fs.promises.writeFile(cssPath, themeCSS, 'utf-8');
    }
}

function generateStandaloneHTML(toc: string, bodyContent: string, themeCSS: string, docTitle: string): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${docTitle}</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
    <style>
        ${themeCSS}
        
        /* Responsive design */
        @media (max-width: 768px) {
            body {
                padding: 20px;
                font-size: 14px;
            }
        }
        
        /* Smooth scrolling for TOC links */
        html {
            scroll-behavior: smooth;
        }
    </style>
</head>
<body>
    ${toc}
    ${bodyContent}
    <script>
        document.addEventListener('DOMContentLoaded', (event) => {
            document.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightElement(block);
            });
        });
    </script>
</body>
</html>`;
}

function generateHTMLWithLinkedCSS(toc: string, bodyContent: string, docTitle: string, cssFileName: string): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${docTitle}</title>
    <link rel="stylesheet" href="${cssFileName}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
    <style>
        /* Responsive design */
        @media (max-width: 768px) {
            body {
                padding: 20px;
                font-size: 14px;
            }
        }
        
        /* Smooth scrolling for TOC links */
        html {
            scroll-behavior: smooth;
        }
    </style>
</head>
<body>
    ${toc}
    ${bodyContent}
    <script>
        document.addEventListener('DOMContentLoaded', (event) => {
            document.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightElement(block);
            });
        });
    </script>
</body>
</html>`;
}
