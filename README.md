# Clean MD to PDF

Convert Markdown files to beautiful, professional PDFs without any watermarks or footers. This VS Code extension produces clean, publication-ready PDFs with GitHub-style formatting, syntax highlighting, and professional typography.

## ✨ Features

- **🚫 No Watermarks**: Clean PDF output without any unwanted headers, footers, or watermarks
- **🎨 Syntax Highlighting**: Colorful code blocks using highlight.js with GitHub theme
- **📐 Professional Typography**: Modern font stack with perfect spacing and readability
- **📊 Enhanced Tables**: Beautiful tables with alternating row colors and clean borders
- **📑 Auto Table of Contents**: Automatically generated from your document headings
- **📄 Page Headers**: Document title and page numbers at the top of each page
- **🔗 Smart Links**: Enhanced link styling with automatic URL printing for PDFs
- **📖 Page Break Control**: Intelligent page breaks that keep content together
- **🎯 Bold Headings**: Large, bold, black headings that stand out clearly

## 📋 Requirements

- VS Code 1.107.0 or higher
- The extension automatically downloads required dependencies (markdown-it, puppeteer)

## 🚀 Installation

### Option 1: Install from VSIX (Recommended)

1. Download or build the `.vsix` file
2. In VS Code, press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
3. Type: **"Extensions: Install from VSIX..."**
4. Select the `.vsix` file
5. Reload VS Code

### Option 2: Build from Source

```bash
# Clone or navigate to the project directory
cd clean-md-pdf

# Install dependencies
npm install

# Compile the extension
npm run compile

# Package the extension
npm install -g @vscode/vsce
vsce package

# Install the generated .vsix file as shown in Option 1
```

## 📖 Usage

1. Open any Markdown (`.md`) file in VS Code
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
3. Type: **"Convert Markdown to PDF (Clean)"**
4. Press Enter
5. The PDF will be created in the same folder as your Markdown file

## 🎨 What You Get

### Professional Styling
- **GitHub-inspired design** with modern, clean aesthetics
- **System fonts** for native look and feel
- **Proper hierarchy** with distinct heading sizes (H1: 2.5em, H2: 1.8em, H3: 1.4em)
- **Bold black headings** (font-weight: 700) for maximum visibility

### Enhanced Content
- **Code blocks** with syntax highlighting in 180+ languages
- **Tables** with header styling, borders, and alternating row colors
- **Blockquotes** with left border and background color
- **Images** with rounded corners and drop shadows
- **Links** styled with color and underlines, URLs printed in PDF

### Smart Layout
- **Table of Contents** auto-generated from H1, H2, H3 headings
- **Page headers** with document title and page numbers
- **No broken content** - headings, code blocks, tables, and images stay together
- **Perfect margins** - 2.5cm top, 2cm sides and bottom

## 🛠️ Extension Settings

This extension does not add any VS Code settings. It works out of the box with sensible defaults.

## 🐛 Known Issues

- Page headers (`@top-center`, `@top-right`) may not render in all PDF viewers due to limited CSS Paged Media support
- If Puppeteer fails to download Chromium, you may need to manually install it or set environment variables

## 📅 Release Notes

### 0.0.1 (Initial Release)

- ✅ Clean PDF conversion without watermarks
- ✅ Syntax highlighting for code blocks
- ✅ Professional typography and spacing
- ✅ Enhanced table styling
- ✅ Auto-generated table of contents
- ✅ Page headers with title and page numbers
- ✅ Smart page break controls
- ✅ Bold, black, large headings

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📄 License

MIT License - feel free to use this extension in your projects!

## 🙏 Acknowledgments

- Built with [markdown-it](https://github.com/markdown-it/markdown-it)
- PDF generation powered by [Puppeteer](https://pptr.dev/)
- Syntax highlighting by [highlight.js](https://highlightjs.org/)

---

**Enjoy creating beautiful, clean PDFs!** 🎉
