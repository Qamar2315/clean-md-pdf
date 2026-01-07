import * as vscode from 'vscode';
import * as path from 'path';
import { getConfig, validateConfig } from './config';
import { convertMarkdownToPdf } from './converter';
import { convertMarkdownToHTML } from './htmlConverter';
import { convertMarkdownToDocx } from './docxConverter';
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

    // Register format picker command
    let formatPickerCommand = vscode.commands.registerCommand('clean-md-pdf.convertWithFormatPicker', async () => {
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

        await showFormatPickerAndConvert([doc.fileName]);
    });

    // Register HTML export command
    let htmlCommand = vscode.commands.registerCommand('clean-md-pdf.convertToHTML', async (uri: vscode.Uri, uris: vscode.Uri[]) => {
        const filesToConvert = uris && uris.length > 0 ? uris.map(u => u.fsPath) : uri ? [uri.fsPath] : [];

        if (filesToConvert.length === 0) {
            const editor = vscode.window.activeTextEditor;
            if (editor && editor.document.languageId === 'markdown') {
                filesToConvert.push(editor.document.fileName);
            }
        }

        if (filesToConvert.length === 0) {
            vscode.window.showErrorMessage('No Markdown file selected');
            return;
        }

        await convertFilesToFormat(filesToConvert, 'html');
    });

    // Register DOCX export command
    let docxCommand = vscode.commands.registerCommand('clean-md-pdf.convertToWord', async (uri: vscode.Uri, uris: vscode.Uri[]) => {
        const filesToConvert = uris && uris.length > 0 ? uris.map(u => u.fsPath) : uri ? [uri.fsPath] : [];

        if (filesToConvert.length === 0) {
            const editor = vscode.window.activeTextEditor;
            if (editor && editor.document.languageId === 'markdown') {
                filesToConvert.push(editor.document.fileName);
            }
        }

        if (filesToConvert.length === 0) {
            vscode.window.showErrorMessage('No Markdown file selected');
            return;
        }

        await convertFilesToFormat(filesToConvert, 'docx');
    });

    context.subscriptions.push(convertCommand, contextMenuCommand, formatPickerCommand, htmlCommand, docxCommand);
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

async function showFormatPickerAndConvert(filePaths: string[]): Promise<void> {
    const format = await vscode.window.showQuickPick([
        { label: '📄 PDF', description: 'Clean, professional PDF format', value: 'pdf' },
        { label: '🌐 HTML', description: 'Web-ready HTML format', value: 'html' },
        { label: '📝 Word/DOCX', description: 'Editable Microsoft Word format', value: 'docx' }
    ], {
        placeHolder: 'Select output format'
    });

    if (!format) {
        return; // User cancelled
    }

    await convertFilesToFormat(filePaths, format.value as 'pdf' | 'html' | 'docx');
}

async function convertFilesToFormat(filePaths: string[], format: 'pdf' | 'html' | 'docx'): Promise<void> {
    const config = getConfig();
    const errors = validateConfig(config);
    if (errors.length > 0) {
        vscode.window.showErrorMessage(`Configuration error: ${errors.join(', ')}`);
        return;
    }

    const formatNames = {
        pdf: 'PDF',
        html: 'HTML',
        docx: 'Word/DOCX'
    };

    const formatIcons = {
        pdf: '📄',
        html: '🌐',
        docx: '📝'
    };

    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `${formatIcons[format]} Converting to ${formatNames[format]}`,
        cancellable: false
    }, async (progress) => {
        let successCount = 0;
        let failCount = 0;

        for (let i = 0; i < filePaths.length; i++) {
            const filePath = filePaths[i];
            const fileName = path.basename(filePath);

            progress.report({
                increment: (100 / filePaths.length),
                message: filePaths.length > 1 ? `Converting ${fileName} (${i + 1}/${filePaths.length})...` : `Converting ${fileName}...`
            });

            try {
                const outputPath = getOutputPathForFormat(filePath, format, config);

                if (format === 'pdf') {
                    await convertMarkdownToPdf({ filePath, outputPath, config });
                } else if (format === 'html') {
                    await convertMarkdownToHTML({ filePath, outputPath, config, standalone: true });
                } else if (format === 'docx') {
                    await convertMarkdownToDocx({ filePath, outputPath, config });
                }

                successCount++;

                // Open file if it's a single file conversion and openAfterConversion is enabled
                if (filePaths.length === 1 && config.openAfterConversion) {
                    await openFile(outputPath);
                }
            } catch (error) {
                console.error(`Failed to convert ${fileName}:`, error);
                failCount++;
            }
        }

        if (failCount === 0) {
            vscode.window.showInformationMessage(`${formatIcons[format]} Successfully converted ${successCount} file(s) to ${formatNames[format]}!`);
        } else {
            vscode.window.showWarningMessage(`Converted ${successCount} file(s). Failed: ${failCount}`);
        }
    });
}

function getOutputPathForFormat(filePath: string, format: 'pdf' | 'html' | 'docx', config: any): string {
    const ext = {
        pdf: '.pdf',
        html: '.html',
        docx: '.docx'
    }[format];

    const basePath = getOutputPath(filePath, config);
    return basePath.replace(/\.pdf$/, ext);
}

export function deactivate() { }
