import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';
import { PDFConfig } from './config';

const execAsync = promisify(exec);

export function getOutputPath(sourcePath: string, config: PDFConfig): string {
    const sourceDir = path.dirname(sourcePath);
    const baseName = path.basename(sourcePath, '.md');
    const pdfFileName = `${baseName}.pdf`;

    if (config.outputFolder && config.outputFolder.trim() !== '') {
        // Handle both absolute and relative paths
        let outputDir: string;

        if (path.isAbsolute(config.outputFolder)) {
            outputDir = config.outputFolder;
        } else {
            // Relative to workspace root or source file directory
            const workspaceFolder = vscode.workspace.getWorkspaceFolder(vscode.Uri.file(sourcePath));
            if (workspaceFolder) {
                outputDir = path.join(workspaceFolder.uri.fsPath, config.outputFolder);
            } else {
                outputDir = path.join(sourceDir, config.outputFolder);
            }
        }

        ensureDirectoryExists(outputDir);
        return path.join(outputDir, pdfFileName);
    }

    // Default: same directory as source file
    return path.join(sourceDir, pdfFileName);
}

export function ensureDirectoryExists(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

export async function openFile(filePath: string): Promise<void> {
    const platform = process.platform;

    try {
        if (platform === 'win32') {
            // Windows
            await execAsync(`start "" "${filePath}"`);
        } else if (platform === 'darwin') {
            // macOS
            await execAsync(`open "${filePath}"`);
        } else {
            // Linux
            await execAsync(`xdg-open "${filePath}"`);
        }
    } catch (error) {
        // If exec fails, show the file in VS Code
        const doc = await vscode.workspace.openTextDocument(filePath);
        await vscode.window.showTextDocument(doc);
    }
}

export function generateTOC(mdContent: string): string {
    const headings = mdContent.match(/^#{1,3}\s+.+$/gm) || [];

    if (headings.length <= 1) {
        return '';
    }

    let toc = '<div class="toc"><h2>Table of Contents</h2><ul>';
    headings.forEach((heading, index) => {
        const levelMatch = heading.match(/^#+/);
        if (!levelMatch) return;
        const level = levelMatch[0].length;
        const text = heading.replace(/^#+\s+/, '');
        const indent = level === 1 ? '' : level === 2 ? 'toc-indent-1' : 'toc-indent-2';
        toc += `<li class="${indent}"><a href="#heading-${index}">${text}</a></li>`;
    });
    toc += '</ul></div>';

    return toc;
}

export function addHeadingIds(htmlContent: string): string {
    let headingIndex = 0;
    return htmlContent.replace(/<h([1-3])>/g, () => {
        return `<h$1 id="heading-${headingIndex++}">`;
    });
}

export function extractDocumentTitle(mdContent: string, filePath: string): string {
    const titleMatch = mdContent.match(/^#\s+(.+)$/m);
    return titleMatch ? titleMatch[1] : path.basename(filePath, '.md');
}
