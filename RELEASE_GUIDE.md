# Creating a GitHub Release

## Quick Steps to Create a Release

1. **Go to your GitHub repository**:
   - https://github.com/Qamar2315/clean-md-pdf

2. **Click on "Releases"** (right sidebar)

3. **Click "Create a new release"**

4. **Fill in the release details**:
   - **Tag version**: `v0.0.1`
   - **Release title**: `v0.0.1 - Initial Release`
   - **Description**:
     ```markdown
     ## 🎉 First Release - Clean MD to PDF

     Convert Markdown files to beautiful, professional PDFs without any watermarks!

     ### ✨ Features
     - 🚫 No watermarks or footers
     - 🎨 Syntax highlighting for code blocks
     - 📐 Professional GitHub-style typography
     - 📊 Enhanced tables
     - 📑 Auto-generated Table of Contents
     - 📄 Page headers with title and page numbers

     ### 📦 Installation
     1. Download the `clean-md-pdf-0.0.1.vsix` file below
     2. Open VS Code
     3. Press `Ctrl+Shift+P`
     4. Type "Extensions: Install from VSIX..."
     5. Select the downloaded file
     6. Enjoy!

     ### 🚀 Usage
     1. Open any `.md` file in VS Code
     2. Press `Ctrl+Shift+P`
     3. Type "Convert Markdown to PDF (Clean)"
     4. Your PDF will be created in the same folder!
     ```

5. **Attach files**:
   - Drag and drop `clean-md-pdf-0.0.1.vsix` to the "Attach binaries" section

6. **Click "Publish release"**

## Alternative: Command Line

```bash
# Install GitHub CLI if you haven't
# Visit: https://cli.github.com/

# Create release
gh release create v0.0.1 clean-md-pdf-0.0.1.vsix \
  --title "v0.0.1 - Initial Release" \
  --notes "First release of Clean MD to PDF extension"
```

## Share Your Extension!

After creating the release, share this link:
```
https://github.com/Qamar2315/clean-md-pdf/releases/latest
```

Users can download the `.vsix` file and install it directly in VS Code!
