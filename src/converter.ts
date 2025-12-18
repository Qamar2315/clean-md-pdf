import * as vscode from 'vscode';
import MarkdownIt from 'markdown-it';
import * as puppeteer from 'puppeteer';
import { PDFConfig } from './config';
import { getThemeCSS } from './themes';
import { extractDocumentTitle, generateTOC, addHeadingIds } from './utils';

export interface ConversionOptions {
    filePath: string;
    outputPath: string;
    config: PDFConfig;
}

export async function convertMarkdownToPdf(options: ConversionOptions): Promise<void> {
    const { filePath, outputPath, config } = options;

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

    // Generate full HTML
    const html = generateHTML(toc, bodyContent, themeCSS);

    // Convert to PDF using Puppeteer
    await renderPDF(html, outputPath, config.pageSize);
}

function generateHTML(toc: string, bodyContent: string, themeCSS: string): string {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
            <style>
                ${themeCSS}
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
        </html>
    `;
}

async function renderPDF(html: string, outputPath: string, pageSize: string): Promise<void> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Map page size to Puppeteer format
    const pageSizeMap: { [key: string]: any } = {
        'A4': 'A4',
        'Letter': 'Letter',
        'Legal': 'Legal'
    };

    await page.pdf({
        path: outputPath,
        format: pageSizeMap[pageSize] || 'A4',
        printBackground: true,
        margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' },
        displayHeaderFooter: false
    });

    await browser.close();
}
