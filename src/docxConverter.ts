// Simplified DOCX converter - disabled pending library compatibility fix
import * as vscode from 'vscode';
import { PDFConfig } from './config';

export interface DocxConversionOptions {
    filePath: string;
    outputPath: string;
    config: PDFConfig;
}

export async function convertMarkdownToDocx(options: DocxConversionOptions): Promise<void> {
    vscode.window.showWarningMessage('DOCX export is temporarily unavailable. Use PDF or HTML export instead.');
    throw new Error('DOCX export temporarily disabled');
}
