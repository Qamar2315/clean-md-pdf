# Testing Guide for Clean MD-PDF Extension

## Prerequisites
1. Extension must be compiled (`npm run compile`)
2. VS Code should be ready to debug the extension

## Testing Steps

### 1. Launch Extension in Debug Mode
1. Open VS Code
2. Press `F5` to start debugging the extension
3. A new VS Code window will open with the extension loaded

### 2. Test Basic Conversion
1. Open `test-document.md` in the debug window
2. Press `Ctrl+Shift+M` (keyboard shortcut)
3. Verify PDF is generated in the same folder

### 3. Test Configuration Settings
1. Open Settings (`Ctrl+,`)
2. Search for "Clean MD to PDF"
3. Test each setting:

#### Theme Testing
- Change `clean-md-pdf.theme` to each option:
  - GitHub (default)
  - Academic
  - Modern
  - Minimal
  - Dark
- Convert the test document with each theme
- Verify visual differences in generated PDFs

#### Page Size Testing
- Change `clean-md-pdf.pageSize`:
  - A4 (default)
  - Letter
  - Legal
- Convert and verify page dimensions

#### Output Folder Testing
- Set `clean-md-pdf.outputFolder` to `pdfs`
- Convert a document
- Verify PDF is saved in `pdfs` folder

#### Table of Contents Testing
- Set `clean-md-pdf.includeTOC` to `false`
- Convert and verify TOC is missing
- Set back to `true` and verify TOC appears

#### Open After Conversion
- Set `clean-md-pdf.openAfterConversion` to `true`
- Convert a document
- Verify PDF opens automatically

### 4. Test Context Menu
1. In Explorer, right-click on `test-document.md`
2. Look for "Convert to PDF (Clean)" option
3. Click it and verify conversion

### 5. Test Batch Conversion
1. Create multiple `.md` files
2. Select multiple files in Explorer
3. Right-click and select "Convert to PDF (Clean)"
4. Verify all files are converted

### 6. Test Progress Indicators
- Watch for progress notification showing:
  - "Parsing Markdown..."
  - "Rendering HTML..."
  - "Generating PDF..."
  - "Complete!"

## Expected Results

✅ All features work as expected
✅ Configuration changes take effect immediately
✅ Themes render correctly
✅ PDFs are clean with no watermarks
✅ Batch conversion handles multiple files
✅ Progress notifications appear and are informative
✅ Keyboard shortcut works in markdown files
✅ Context menu appears on .md files
