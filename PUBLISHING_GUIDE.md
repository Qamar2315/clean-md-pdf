# Publishing Your Extension to VS Code Marketplace

## Prerequisites

1. **Create a Microsoft Account** (if you don't have one)
   - Go to https://login.live.com

2. **Create an Azure DevOps Organization**
   - Go to https://dev.azure.com
   - Create a new organization (free)

3. **Generate a Personal Access Token (PAT)**
   - In Azure DevOps, click your profile icon → Security → Personal Access Tokens
   - Click "New Token"
   - Name: `vscode-publisher`
   - Organization: Select your org
   - Scopes: Select **"Marketplace (Publish)"** with **"Read, acquire, publish & manage"** permission
   - Click "Create" and **SAVE THE TOKEN** (you won't see it again!)

## Steps to Publish

### 1. Install vsce (VS Code Extension Manager)
```powershell
npm install -g @vscode/vsce
```

### 2. Create a Publisher
```powershell
vsce create-publisher <your-publisher-name>
```
- Use a unique name (lowercase, no spaces)
- You'll be prompted for your PAT

### 3. Update package.json
Add your publisher name to `package.json`:
```json
{
  "publisher": "your-publisher-name",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/clean-md-pdf.git"
  },
  "icon": "icon.png"  // Optional: Add a 128x128 icon
}
```

### 4. Login to vsce
```powershell
vsce login <your-publisher-name>
```

### 5. Publish Your Extension
```powershell
# First time publish
vsce publish

# Or specify version bump
vsce publish patch  # 0.0.1 → 0.0.2
vsce publish minor  # 0.0.1 → 0.1.0
vsce publish major  # 0.0.1 → 1.0.0
```

### 6. Verify Publication
- Go to https://marketplace.visualstudio.com/manage
- Your extension should appear there!
- It will be live at: `https://marketplace.visualstudio.com/items?itemName=<publisher>.<extension-name>`

## Updating Your Extension

When you make changes:
```powershell
# Update version in package.json, then:
vsce package  # Creates new .vsix
vsce publish  # Publishes to marketplace
```

## Best Practices

- ✅ Add a good README.md with screenshots/GIFs
- ✅ Include a CHANGELOG.md
- ✅ Add an icon (128x128 PNG)
- ✅ Add keywords in package.json for discoverability
- ✅ Test thoroughly before publishing
- ✅ Respond to user issues on GitHub

## Troubleshooting

**Error: Missing publisher**
- Add `"publisher": "your-name"` to package.json

**Error: Missing repository**
- Add repository URL to package.json

**Error: PAT expired**
- Generate a new PAT in Azure DevOps
- Run `vsce login` again
