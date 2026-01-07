# Clean MD to Multi-Format

Convert Markdown files to beautiful PDFs, HTML, and Word documents without any watermarks. This VS Code extension produces clean, publication-ready output with **10 stunning themes**, multiple export formats, and powerful batch conversion features.

## ✨ Key Features

### 🎨 **10 Professional Themes**
- **GitHub** - Clean, modern, professional (default)
- **Academic** - Serif fonts, formal styling for research papers
- **Modern** - Vibrant gradients, contemporary design
- **Minimal** - Simple, clean, distraction-free
- **Dark** - Dark mode with light text on dark background
- **Elegant** - Professional serif with gold accents
- **Tech** - Terminal-inspired monospace design
- **Corporate** - Business blue professional theme
- **Nature** - Eco-friendly green theme
- **Vibrant** - Colorful multi-gradient design

### 📤 **Multi-Format Export**
- **PDF** - Professional PDFs with all 10 themes
- **HTML** - Web-ready HTML (standalone or with separate CSS)
- **Word/DOCX** - Editable Microsoft Word documents

### ⚙️ **Powerful Configuration**
- **Custom output folders** - Save PDFs anywhere you want
- **Multiple page sizes** - A4, Letter, Legal
- **Toggle Table of Contents** - Include or exclude TOC
- **Auto-open PDFs** - Automatically open after conversion
- **Keyboard shortcuts** - `Ctrl+Shift+M` for quick conversion

### 🚀 **Productivity Features**
- **Format picker** - Choose PDF, HTML, or DOCX from visual menu
- **Right-click context menu** - Convert from Explorer
- **Batch conversion** - Select and convert multiple files at once
- **Progress tracking** - See conversion steps in real-time
- **Smart output paths** - Relative or absolute paths supported

### 🎯 **Professional Quality**
- **🚫 No Watermarks** - Clean output, no unwanted footers
- **🎨 Syntax Highlighting** - Colorful code blocks (180+ languages)
- **📊 Enhanced Tables** - Beautiful tables with proper styling
- **📑 Auto Table of Contents** - Generated from your headings
- **🔗 Smart Links** - Enhanced styling with URL printing

## 📋 Requirements

- VS Code 1.107.0 or higher
- Extension automatically downloads required dependencies

## 🚀 Quick Start

### Install from Marketplace
1. Search for "Clean MD to PDF" in VS Code Extensions
2. Click Install
3. Reload VS Code if needed

### Basic Usage

**Quick PDF Export:**
1. Open any Markdown (`.md`) file
2. **Option A**: Press `Ctrl+Shift+M` (Mac: `Cmd+Shift+M`)
3. **Option B**: Right-click file in Explorer → "Convert to PDF (Clean)"
4. **Option C**: Command Palette (`Ctrl+Shift+P`) → "Convert Markdown to PDF (Clean)"

**Multi-Format Export:**
1. Open a Markdown file or right-click in Explorer
2. Command Palette → "Convert Markdown (Choose Format)"
3. Select format: 📄 PDF, 🌐 HTML, or 📝 Word/DOCX
4. File exports automatically!

**Direct Format Export:**
- HTML: Command Palette → "Convert Markdown to HTML (Clean)"
- Word: Command Palette → "Convert Markdown to Word/DOCX (Clean)"

## ⚙️ Configuration

Access settings via `File > Preferences > Settings` and search for "Clean MD to PDF":

```json
{
  // Custom output folder (relative to workspace or absolute)
  "clean-md-pdf.outputFolder": "",
  
  // PDF page size: "A4", "Letter", or "Legal"
  "clean-md-pdf.pageSize": "A4",
  
  // Include table of contents
  "clean-md-pdf.includeTOC": true,
  
  // Choose theme: "github", "academic", "modern", "minimal", "dark",
  // "elegant", "tech", "corporate", "nature", or "vibrant"
  "clean-md-pdf.theme": "github",
  
  // Auto-open file after conversion
  "clean-md-pdf.openAfterConversion": false
}
```

### Example Configurations

**Save to custom folder:**
```json
"clean-md-pdf.outputFolder": "pdfs"  // Creates 'pdfs' folder in workspace
```

**Academic papers:**
```json
{
  "clean-md-pdf.theme": "academic",
  "clean-md-pdf.pageSize": "Letter",
  "clean-md-pdf.includeTOC": true
}
```

**Quick preview mode:**
```json
{
  "clean-md-pdf.theme": "minimal",
  "clean-md-pdf.openAfterConversion": true
}
```

## 🎨 Theme Gallery

### GitHub Theme
Clean, modern, professional styling with GitHub-inspired design. Perfect for technical documentation and general use.

### Academic Theme
Serif fonts (Georgia, Times New Roman), formal styling, centered titles, justified text. Ideal for research papers, theses, and formal documents.

### Modern Theme
Vibrant purple/indigo gradients, contemporary design, rounded corners, shadow effects. Great for presentations and modern documentation.

### Minimal Theme
Simple, clean, distraction-free design with minimal styling. Perfect for drafts and simple documents.

### Dark Theme
Dark background with light text, perfect for dark mode lovers and reducing eye strain when viewing PDFs at night.

### Elegant Theme
Professional serif design with gold (#D4AF37) accents and cream backgrounds. Features Garamond fonts, double borders, and ornamental styling. Perfect for formal reports, executive summaries, and elegant presentations.

### Tech Theme  
Terminal-inspired green (#00FF00) on black design with monospace fonts (Fira Code, Consolas). Features command-line aesthetics with bracket notation and terminal colors. Ideal for developer documentation, API references, and technical specs.

### Corporate Theme
Business-focused navy blue (#003366) professional theme with clean typography (Calibri, Arial). Features gradient headers and structured layouts. Perfect for business proposals, corporate reports, and professional documentation.

### Nature Theme
Eco-friendly green theme with organic styling and natural color palette. Features Open Sans fonts and earth tones. Great for environmental reports, sustainability docs, and nature-focused content.

### Vibrant Theme
Colorful multi-gradient design with rainbow colors and energetic styling. Features Poppins fonts and dynamic gradients (red, cyan, yellow). Perfect for creative briefs, marketing materials, and presentations.

## 📖 Advanced Features

### Batch Conversion
1. Select multiple `.md` files in Explorer (hold `Ctrl` and click)
2. Right-click → "Convert to PDF (Clean)"
3. All files convert automatically with progress tracking

### Custom Output Paths
- **Relative path**: `pdfs` → creates folder in workspace
- **Absolute path**: `C:/Documents/PDFs` → saves to specific location
- **Empty (default)**: saves PDF next to source `.md` file

### Keyboard Shortcuts
- `Ctrl+Shift+M` (Windows/Linux)
- `Cmd+Shift+M` (Mac)
- Works only when Markdown file is active

## 🛠️ Building from Source

```bash
# Clone repository
git clone https://github.com/Qamar2315/clean-md-pdf.git
cd clean-md-pdf

# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Package extension
npm install -g @vscode/vsce
vsce package

# Install the .vsix file
# VS Code → Extensions → "..." → Install from VSIX
```

## 🐛 Known Issues

- Page headers may not render in all PDF viewers (CSS Paged Media limitations)
- Puppeteer may require manual Chromium installation in restricted environments

## 📅 Release Notes

### 0.0.3 (Latest)
- ✅ **10 professional themes** (5 new: Elegant, Tech, Corporate, Nature, Vibrant)
- ✅ **Multi-format export** - PDF, HTML, and Word/DOCX
- ✅ **HTML export** with standalone or linked CSS options
- ✅ **Word/DOCX export** with full styling support
- ✅ **Format picker** with visual icons for easy selection
- ✅ **New commands** for direct HTML and Word export
- ✅ **All themes work** across all export formats
- ✅ **Enhanced documentation** with complete feature descriptions

### 0.0.2
- ✅ **5 professional themes** (GitHub, Academic, Modern, Minimal, Dark)
- ✅ **Configuration system** with 5 customizable settings
- ✅ **Right-click context menu** for Explorer
- ✅ **Batch conversion** for multiple files
- ✅ **Keyboard shortcut** (`Ctrl+Shift+M`)
- ✅ **Custom output folders** with path support
- ✅ **Multiple page sizes** (A4, Letter, Legal)
- ✅ **Progress indicators** with step-by-step feedback
- ✅ **Auto-open PDFs** option
- ✅ **Modular code architecture** for better maintenance

### 0.0.1 (Initial Release)
- ✅ Clean PDF conversion without watermarks
- ✅ Syntax highlighting for code blocks
- ✅ Professional typography
- ✅ Auto-generated table of contents

## 🤝 Contributing

Contributions welcome! Please:
- Report bugs via [GitHub Issues](https://github.com/Qamar2315/clean-md-pdf/issues)
- Suggest features
- Submit pull requests

## 📄 License

MIT License - Free to use in your projects!

## 🙏 Acknowledgments

- [markdown-it](https://github.com/markdown-it/markdown-it) - Markdown parsing
- [Puppeteer](https://pptr.dev/) - PDF generation
- [highlight.js](https://highlightjs.org/) - Syntax highlighting

---

**Enjoy creating beautiful, clean PDFs!** 🎉

💡 **Tip**: Try different themes to find your perfect style! Each theme is carefully crafted for specific use cases.
