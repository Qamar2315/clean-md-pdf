import * as vscode from 'vscode';
import * as path from 'path';
import { getConfig, validateConfig } from './config';
import { convertMarkdownToPdf } from './converter';
import { getOutputPath, openFile } from './utils';

export function activate(context: vscode.ExtensionContext) {

    // Register the main command (Command Palette + Keyboard Shortcut)
    let convertCommand = vscode.commands.registerCommand('clean-md-pdf.convert', async () => {
        const editor = vscode.window.activeTextEditor;

        if (!editor) {
            vscode.window.showErrorMessage('No active editor found!');
            return;
        }

        const doc = editor.document;
        if (doc.languageId !== 'markdown') {
            vscode.window.showErrorMessage('Active file is not a Markdown file.');
            return;
        }

        await convertSingleFile(doc.fileName);
    });

    // Register context menu command for right-click on .md files
    let contextMenuCommand = vscode.commands.registerCommand('clean-md-pdf.convertFromExplorer', async (uri: vscode.Uri, uris: vscode.Uri[]) => {
        // If multiple files are selected, convert all of them
        const filesToConvert = uris && uris.length > 0 ? uris : [uri];

        const markdownFiles = filesToConvert.filter(fileUri =>
            path.extname(fileUri.fsPath).toLowerCase() === '.md'
        );

        if (markdownFiles.length === 0) {
            vscode.window.showWarningMessage('No Markdown files selected.');
            return;
        }

        // Batch conversion
        if (markdownFiles.length === 1) {
            await convertSingleFile(markdownFiles[0].fsPath);
        } else {
            await convertMultipleFiles(markdownFiles.map(f => f.fsPath));
        }
    });

    context.subscriptions.push(convertCommand, contextMenuCommand);
}

async function convertSingleFile(filePath: string): Promise<void> {
    const config = getConfig();

    // Validate configuration
    const errors = validateConfig(config);
    if (errors.length > 0) {
        vscode.window.showErrorMessage(`Configuration error: ${errors.join(', ')}`);
        return;
    }

    const outputPath = getOutputPath(filePath, config);

    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: "Converting Markdown to PDF",
        cancellable: false
    }, async (progress) => {
        try {
            progress.report({ increment: 0, message: "Parsing Markdown..." });

            await new Promise(resolve => setTimeout(resolve, 100));
            progress.report({ increment: 33, message: "Rendering HTML..." });

            await new Promise(resolve => setTimeout(resolve, 100));
            progress.report({ increment: 33, message: "Generating PDF..." });

            await convertMarkdownToPdf({
                filePath,
                outputPath,
                config
            });

            progress.report({ increment: 34, message: "Complete!" });

            const fileName = path.basename(outputPath);
            vscode.window.showInformationMessage(`PDF created successfully: ${fileName}`);

            // Open PDF if configured
            if (config.openAfterConversion) {
                await openFile(outputPath);
            }

        } catch (error) {
            vscode.window.showErrorMessage(`Failed to convert PDF: ${error}`);
        }
    });
}

async function convertMultipleFiles(filePaths: string[]): Promise<void> {
    const config = getConfig();

    // Validate configuration
    const errors = validateConfig(config);
    if (errors.length > 0) {
        vscode.window.showErrorMessage(`Configuration error: ${errors.join(', ')}`);
        return;
    }

    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `Converting ${filePaths.length} files to PDF`,
        cancellable: false
    }, async (progress) => {
        let successCount = 0;
        let failCount = 0;

        for (let i = 0; i < filePaths.length; i++) {
            const filePath = filePaths[i];
            const fileName = path.basename(filePath);

            progress.report({
                increment: (100 / filePaths.length),
                message: `Converting ${fileName} (${i + 1}/${filePaths.length})...`
            });

            try {
                const outputPath = getOutputPath(filePath, config);
                await convertMarkdownToPdf({
                    filePath,
                    outputPath,
                    config
                });
                successCount++;
            } catch (error) {
                console.error(`Failed to convert ${fileName}:`, error);
                failCount++;
            }
        }

        if (failCount === 0) {
            vscode.window.showInformationMessage(`Successfully converted ${successCount} file(s) to PDF!`);
        } else {
            vscode.window.showWarningMessage(`Converted ${successCount} file(s). Failed: ${failCount}`);
        }
    });
}

export function deactivate() { }
