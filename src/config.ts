import * as vscode from 'vscode';

export interface PDFConfig {
    outputFolder: string;
    pageSize: 'A4' | 'Letter' | 'Legal';
    includeTOC: boolean;
    theme: 'github' | 'academic' | 'modern' | 'minimal' | 'dark';
    openAfterConversion: boolean;
}

export function getConfig(): PDFConfig {
    const config = vscode.workspace.getConfiguration('clean-md-pdf');
    
    return {
        outputFolder: config.get<string>('outputFolder', ''),
        pageSize: config.get<'A4' | 'Letter' | 'Legal'>('pageSize', 'A4'),
        includeTOC: config.get<boolean>('includeTOC', true),
        theme: config.get<'github' | 'academic' | 'modern' | 'minimal' | 'dark'>('theme', 'github'),
        openAfterConversion: config.get<boolean>('openAfterConversion', false)
    };
}

export function validateConfig(config: PDFConfig): string[] {
    const errors: string[] = [];
    
    const validPageSizes = ['A4', 'Letter', 'Legal'];
    if (!validPageSizes.includes(config.pageSize)) {
        errors.push(`Invalid page size: ${config.pageSize}. Must be one of: ${validPageSizes.join(', ')}`);
    }
    
    const validThemes = ['github', 'academic', 'modern', 'minimal', 'dark'];
    if (!validThemes.includes(config.theme)) {
        errors.push(`Invalid theme: ${config.theme}. Must be one of: ${validThemes.join(', ')}`);
    }
    
    return errors;
}
