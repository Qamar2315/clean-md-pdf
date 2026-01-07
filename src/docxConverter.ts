import * as vscode from 'vscode';
import MarkdownIt from 'markdown-it';
import * as fs from 'fs';
import { PDFConfig } from './config';
import { extractDocumentTitle } from './utils';

export interface DocxConversionOptions {
    filePath: string;
    outputPath: string;
    config: PDFConfig;
}

export async function convertMarkdownToDocx(options: DocxConversionOptions): Promise<void> {
    const { filePath, outputPath } = options;

    try {
        // Use require for CommonJS compatibility in VS Code extension
        const docx = require('docx');
        const { Document, Packer, Paragraph, HeadingLevel, TextRun } = docx;

        // Read markdown file
        const document = await vscode.workspace.openTextDocument(filePath);
        const mdContent = document.getText();

        // Extract title
        const docTitle = extractDocumentTitle(mdContent, filePath);

        // Parse markdown
        const md = new MarkdownIt({
            html: false,
            linkify: true,
            typographer: true
        });

        const tokens = md.parse(mdContent, {});

        // Convert tokens to DOCX paragraphs
        const paragraphs: any[] = [];

        // Add title
        paragraphs.push(
            new Paragraph({
                text: docTitle,
                heading: HeadingLevel.TITLE,
            })
        );

        // Process tokens
        let i = 0;
        while (i < tokens.length) {
            const token = tokens[i];

            if (token.type === 'heading_open') {
                const level = parseInt(token.tag.substring(1));
                const contentToken = tokens[i + 1];
                if (contentToken && contentToken.type === 'inline') {
                    const headingLevels = [
                        HeadingLevel.HEADING_1,
                        HeadingLevel.HEADING_2,
                        HeadingLevel.HEADING_3,
                        HeadingLevel.HEADING_4,
                        HeadingLevel.HEADING_5,
                        HeadingLevel.HEADING_6
                    ];
                    paragraphs.push(
                        new Paragraph({
                            text: contentToken.content,
                            heading: headingLevels[level - 1]
                        })
                    );
                }
                i += 3;
            } else if (token.type === 'paragraph_open') {
                const contentToken = tokens[i + 1];
                if (contentToken && contentToken.type === 'inline') {
                    paragraphs.push(
                        new Paragraph({
                            children: [new TextRun(contentToken.content)]
                        })
                    );
                }
                i += 3;
            } else if (token.type === 'bullet_list_open' || token.type === 'ordered_list_open') {
                i++;
                let listIndex = 0;
                while (i < tokens.length && tokens[i].type === 'list_item_open') {
                    const itemToken = tokens[i + 2];
                    if (itemToken && itemToken.type === 'inline') {
                        paragraphs.push(
                            new Paragraph({
                                text: itemToken.content,
                                bullet: { level: 0 }
                            })
                        );
                    }
                    i += 4;
                    listIndex++;
                }
                i++;
            } else if (token.type === 'code_block' || token.type === 'fence') {
                paragraphs.push(
                    new Paragraph({
                        children: [new TextRun({
                            text: token.content,
                            font: 'Courier New',
                            size: 20
                        })]
                    })
                );
                i++;
            } else {
                i++;
            }
        }

        // Create document
        const doc = new Document({
            sections: [{
                children: paragraphs
            }]
        });

        // Generate and save
        const buffer = await Packer.toBuffer(doc);
        await fs.promises.writeFile(outputPath, buffer);

    } catch (error: any) {
        // Fallback error handling
        throw new Error(`DOCX conversion failed: ${error.message}`);
    }
}
