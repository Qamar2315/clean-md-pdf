# Change Log

All notable changes to the "clean-md-pdf" extension will be documented in this file.

## [0.0.2] - 2024-12-18

### Added
- **5 Professional Themes**: GitHub (default), Academic, Modern, Minimal, and Dark
- **Configuration System**: Comprehensive settings for customization
  - Custom output folder (relative or absolute paths)
  - Page size selection (A4, Letter, Legal)
  - Toggle Table of Contents
  - Theme selection
  - Auto-open PDF after conversion
- **Right-Click Context Menu**: Convert directly from Explorer
- **Batch Conversion**: Select and convert multiple Markdown files at once
- **Keyboard Shortcut**: `Ctrl+Shift+M` (Mac: `Cmd+Shift+M`) for quick conversion
- **Progress Indicators**: Detailed step-by-step conversion progress
- **Modular Architecture**: Refactored codebase into separate modules:
  - `config.ts` - Configuration management
  - `themes.ts` - PDF theme styles
  - `converter.ts` - Conversion logic
  - `utils.ts` - Utility functions

### Changed
- Refactored extension.ts to use modular architecture
- Improved error handling and validation
- Enhanced user experience with better progress feedback

### Technical Improvements
- TypeScript interfaces for type safety
- Configuration validation
- Cross-platform file opening support
- Smart output path resolution

## [0.0.1] - 2024-12-14

### Added
- Initial release
- Clean PDF conversion without watermarks
- Syntax highlighting for code blocks
- Professional typography and spacing
- Enhanced table styling
- Auto-generated table of contents
- Page headers with title and page numbers
- Smart page break controls
- Bold, black, large headings