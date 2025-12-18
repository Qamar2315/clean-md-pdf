export type ThemeName = 'github' | 'academic' | 'modern' | 'minimal' | 'dark';

export function getThemeCSS(theme: ThemeName, docTitle: string): string {
    const themes = {
        github: getGitHubTheme(docTitle),
        academic: getAcademicTheme(docTitle),
        modern: getModernTheme(docTitle),
        minimal: getMinimalTheme(docTitle),
        dark: getDarkTheme(docTitle)
    };

    return themes[theme] || themes.github;
}

function getGitHubTheme(docTitle: string): string {
    return `
        /* Page setup with headers */
        @page {
            margin: 2.5cm 2cm 2cm 2cm;
            @top-center {
                content: "${docTitle}";
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
                font-size: 10px;
                color: #666;
            }
            @top-right {
                content: "Page " counter(page);
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
                font-size: 10px;
                color: #666;
            }
        }

        /* Base typography */
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif;
            font-size: 16px;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 30px;
            color: #24292e;
            background-color: #ffffff;
        }

        /* Enhanced headings */
        h1, h2, h3, h4, h5, h6 {
            margin-top: 24px;
            margin-bottom: 16px;
            font-weight: 700 !important;
            line-height: 1.25;
            page-break-after: avoid;
            color: #000000 !important;
        }

        h1 *, h2 *, h3 *, h4 *, h5 *, h6 * {
            color: #000000 !important;
        }

        h1 {
            font-size: 2.5em;
            border-bottom: 2px solid #e1e4e8;
            padding-bottom: 0.3em;
            margin-top: 0;
            letter-spacing: -0.5px;
        }

        h2 {
            font-size: 1.8em;
            border-bottom: 1px solid #e1e4e8;
            padding-bottom: 0.3em;
            letter-spacing: -0.3px;
        }

        h3 {
            font-size: 1.4em;
        }

        /* Better paragraph spacing */
        p {
            margin-top: 0;
            margin-bottom: 16px;
        }

        /* Enhanced links */
        a {
            color: #0366d6;
            text-decoration: none;
            border-bottom: 1px solid #0366d633;
            transition: all 0.2s;
        }

        a:hover {
            color: #0056b3;
            border-bottom-color: #0056b3;
        }

        /* Print URLs after links */
        @media print {
            a[href]:after {
                content: " (" attr(href) ")";
                font-size: 0.8em;
                color: #666;
            }
            a[href^="#"]:after {
                content: "";
            }
        }

        /* Enhanced code blocks */
        code {
            background-color: #f6f8fa;
            padding: 0.2em 0.4em;
            border-radius: 3px;
            font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
            font-size: 0.85em;
            color: #e83e8c;
        }

        pre {
            background-color: #f6f8fa;
            padding: 16px;
            overflow: auto;
            border-radius: 6px;
            font-size: 0.85em;
            line-height: 1.45;
            border: 1px solid #e1e4e8;
            page-break-inside: avoid;
        }

        pre code {
            background-color: transparent;
            padding: 0;
            color: inherit;
            border-radius: 0;
        }

        /* Enhanced tables */
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 20px 0;
            border-radius: 6px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            page-break-inside: avoid;
        }

        th {
            background-color: #f6f8fa;
            color: #24292e;
            font-weight: 600;
            padding: 12px 16px;
            text-align: left;
            border: 1px solid #e1e4e8;
        }

        td {
            padding: 12px 16px;
            border: 1px solid #e1e4e8;
        }

        tr:nth-child(even) {
            background-color: #f9fafb;
        }

        tr:hover {
            background-color: #f3f4f6;
        }

        /* Enhanced blockquotes */
        blockquote {
            border-left: 4px solid #dfe2e5;
            color: #6a737d;
            padding: 0 1em;
            margin: 16px 0;
            background-color: #f6f8fa;
            border-radius: 0 4px 4px 0;
            page-break-inside: avoid;
        }

        /* Images */
        img {
            max-width: 100%;
            height: auto;
            border-radius: 6px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            margin: 16px 0;
            page-break-inside: avoid;
        }

        /* Lists */
        ul, ol {
            padding-left: 2em;
            margin: 16px 0;
        }

        li {
            margin: 4px 0;
        }

        /* Horizontal rule */
        hr {
            height: 2px;
            border: 0;
            background-color: #e1e4e8;
            margin: 24px 0;
        }

        /* Table of Contents */
        .toc {
            background-color: #f6f8fa;
            border: 1px solid #e1e4e8;
            border-radius: 6px;
            padding: 20px;
            margin: 30px 0;
            page-break-inside: avoid;
        }

        .toc h2 {
            margin-top: 0;
            border-bottom: none;
            font-size: 1.3em;
        }

        .toc ul {
            list-style: none;
            padding-left: 0;
        }

        .toc li {
            margin: 8px 0;
        }

        .toc a {
            color: #0366d6;
            text-decoration: none;
            border-bottom: none;
        }

        .toc a:hover {
            text-decoration: underline;
        }

        .toc-indent-1 {
            padding-left: 20px;
        }

        .toc-indent-2 {
            padding-left: 40px;
        }
    `;
}

function getAcademicTheme(docTitle: string): string {
    return `
        @page {
            margin: 3cm 2.5cm 2.5cm 2.5cm;
            @top-center {
                content: "${docTitle}";
                font-family: "Georgia", "Times New Roman", serif;
                font-size: 9px;
                color: #333;
            }
            @top-right {
                content: counter(page);
                font-family: "Georgia", "Times New Roman", serif;
                font-size: 9px;
                color: #333;
            }
        }

        body {
            font-family: "Georgia", "Times New Roman", serif;
            font-size: 12pt;
            line-height: 1.8;
            max-width: 700px;
            margin: 0 auto;
            padding: 40px;
            color: #000000;
            background-color: #ffffff;
            text-align: justify;
        }

        h1, h2, h3, h4, h5, h6 {
            font-family: "Georgia", "Times New Roman", serif;
            margin-top: 24px;
            margin-bottom: 12px;
            font-weight: 700;
            line-height: 1.3;
            page-break-after: avoid;
            color: #000000;
            text-align: left;
        }

        h1 {
            font-size: 24pt;
            text-align: center;
            margin-top: 0;
            margin-bottom: 24px;
        }

        h2 {
            font-size: 18pt;
            margin-top: 36px;
        }

        h3 {
            font-size: 14pt;
            font-style: italic;
        }

        p {
            margin-top: 0;
            margin-bottom: 12pt;
            text-indent: 0;
        }

        a {
            color: #000080;
            text-decoration: underline;
        }

        code {
            font-family: "Courier New", Courier, monospace;
            font-size: 10pt;
            background-color: #f5f5f5;
            padding: 2px 4px;
        }

        pre {
            font-family: "Courier New", Courier, monospace;
            font-size: 10pt;
            background-color: #f5f5f5;
            padding: 12px;
            border: 1px solid #cccccc;
            margin: 12pt 0;
            page-break-inside: avoid;
        }

        pre code {
            background-color: transparent;
            padding: 0;
        }

        table {
            border-collapse: collapse;
            width: 100%;
            margin: 16pt 0;
            font-size: 11pt;
            page-break-inside: avoid;
        }

        th, td {
            border: 1px solid #000000;
            padding: 8px 12px;
            text-align: left;
        }

        th {
            background-color: #f0f0f0;
            font-weight: 700;
        }

        blockquote {
            border-left: 3px solid #cccccc;
            margin-left: 0;
            padding-left: 20px;
            font-style: italic;
            color: #333333;
        }

        img {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 16pt auto;
            page-break-inside: avoid;
        }

        ul, ol {
            padding-left: 2.5em;
            margin: 12pt 0;
        }

        li {
            margin: 6pt 0;
        }

        hr {
            border: 0;
            height: 1px;
            background-color: #000000;
            margin: 24pt 0;
        }

        .toc {
            border: 1px solid #cccccc;
            padding: 20px;
            margin: 24pt 0;
            background-color: #fafafa;
            page-break-inside: avoid;
        }

        .toc h2 {
            margin-top: 0;
            font-size: 14pt;
            text-align: center;
        }

        .toc ul {
            list-style: none;
            padding-left: 0;
        }

        .toc a {
            color: #000080;
            text-decoration: none;
        }

        .toc-indent-1 { padding-left: 24px; }
        .toc-indent-2 { padding-left: 48px; }
    `;
}

function getModernTheme(docTitle: string): string {
    return `
        @page {
            margin: 2cm 1.5cm 2cm 1.5cm;
            @top-center {
                content: "${docTitle}";
                font-family: "Inter", -apple-system, sans-serif;
                font-size: 9px;
                color: #6366f1;
            }
            @top-right {
                content: "Page " counter(page);
                font-family: "Inter", -apple-system, sans-serif;
                font-size: 9px;
                color: #6366f1;
            }
        }

        body {
            font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            font-size: 15px;
            line-height: 1.7;
            max-width: 850px;
            margin: 0 auto;
            padding: 30px;
            color: #1f2937;
            background: linear-gradient(to bottom, #ffffff 0%, #f9fafb 100%);
        }

        h1, h2, h3, h4, h5, h6 {
            margin-top: 28px;
            margin-bottom: 16px;
            font-weight: 800;
            line-height: 1.2;
            page-break-after: avoid;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        h1 {
            font-size: 2.8em;
            margin-top: 0;
            padding-bottom: 16px;
            border-bottom: 3px solid;
            border-image: linear-gradient(to right, #6366f1, #8b5cf6) 1;
        }

        h2 {
            font-size: 2em;
            padding-bottom: 12px;
            border-bottom: 2px solid;
            border-image: linear-gradient(to right, #6366f1, #8b5cf6) 1;
        }

        h3 {
            font-size: 1.5em;
        }

        p {
            margin-top: 0;
            margin-bottom: 16px;
        }

        a {
            color: #6366f1;
            text-decoration: none;
            font-weight: 600;
            border-bottom: 2px solid #6366f144;
            transition: all 0.3s;
        }

        a:hover {
            color: #8b5cf6;
            border-bottom-color: #8b5cf6;
        }

        code {
            background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
            padding: 3px 8px;
            border-radius: 6px;
            font-family: "JetBrains Mono", "Fira Code", Consolas, monospace;
            font-size: 0.9em;
            color: #6366f1;
            font-weight: 600;
        }

        pre {
            background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
            padding: 20px;
            border-radius: 12px;
            font-size: 0.85em;
            line-height: 1.6;
            border: 1px solid #374151;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            page-break-inside: avoid;
        }

        pre code {
            background: transparent;
            padding: 0;
            color: #f9fafb;
            font-weight: normal;
        }

        table {
            border-collapse: separate;
            border-spacing: 0;
            width: 100%;
            margin: 24px 0;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(99, 102, 241, 0.1);
            page-break-inside: avoid;
        }

        th {
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            color: #ffffff;
            font-weight: 700;
            padding: 14px 18px;
            text-align: left;
        }

        td {
            padding: 12px 18px;
            border-bottom: 1px solid #e5e7eb;
        }

        tr:nth-child(even) {
            background-color: #f9fafb;
        }

        tr:hover {
            background-color: #f3f4f6;
        }

        blockquote {
            border-left: 4px solid #6366f1;
            color: #4b5563;
            padding: 12px 20px;
            margin: 20px 0;
            background: linear-gradient(to right, #f3f4f6 0%, #ffffff 100%);
            border-radius: 0 8px 8px 0;
            font-style: italic;
            page-break-inside: avoid;
        }

        img {
            max-width: 100%;
            height: auto;
            border-radius: 12px;
            box-shadow: 0 8px 16px rgba(99, 102, 241, 0.15);
            margin: 20px 0;
            page-break-inside: avoid;
        }

        ul, ol {
            padding-left: 2em;
            margin: 16px 0;
        }

        li {
            margin: 6px 0;
        }

        hr {
            height: 3px;
            border: 0;
            background: linear-gradient(to right, #6366f1, #8b5cf6);
            margin: 32px 0;
            border-radius: 2px;
        }

        .toc {
            background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            padding: 24px;
            margin: 32px 0;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            page-break-inside: avoid;
        }

        .toc h2 {
            margin-top: 0;
            font-size: 1.5em;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .toc ul {
            list-style: none;
            padding-left: 0;
        }

        .toc a {
            color: #6366f1;
            border-bottom: none;
            font-weight: 500;
        }

        .toc-indent-1 { padding-left: 20px; }
        .toc-indent-2 { padding-left: 40px; }
    `;
}

function getMinimalTheme(docTitle: string): string {
    return `
        @page {
            margin: 2cm;
            @top-right {
                content: counter(page);
                font-family: -apple-system, sans-serif;
                font-size: 9px;
                color: #999;
            }
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            font-size: 16px;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
            color: #333;
            background-color: #fff;
        }

        h1, h2, h3, h4, h5, h6 {
            margin-top: 32px;
            margin-bottom: 16px;
            font-weight: 600;
            line-height: 1.25;
            page-break-after: avoid;
            color: #000;
        }

        h1 {
            font-size: 2.5em;
            margin-top: 0;
        }

        h2 {
            font-size: 1.8em;
        }

        h3 {
            font-size: 1.3em;
        }

        p {
            margin: 0 0 16px 0;
        }

        a {
            color: #000;
            text-decoration: underline;
        }

        code {
            font-family: Consolas, Monaco, monospace;
            font-size: 0.9em;
            background-color: #f5f5f5;
            padding: 2px 6px;
            border-radius: 3px;
        }

        pre {
            background-color: #f5f5f5;
            padding: 16px;
            border-radius: 4px;
            font-size: 0.85em;
            line-height: 1.5;
            overflow: auto;
            page-break-inside: avoid;
        }

        pre code {
            background-color: transparent;
            padding: 0;
        }

        table {
            border-collapse: collapse;
            width: 100%;
            margin: 20px 0;
            page-break-inside: avoid;
        }

        th, td {
            border: 1px solid #ddd;
            padding: 10px 14px;
            text-align: left;
        }

        th {
            background-color: #f9f9f9;
            font-weight: 600;
        }

        blockquote {
            border-left: 3px solid #ddd;
            margin: 16px 0;
            padding-left: 16px;
            color: #666;
            page-break-inside: avoid;
        }

        img {
            max-width: 100%;
            height: auto;
            margin: 16px 0;
            page-break-inside: avoid;
        }

        ul, ol {
            padding-left: 2em;
            margin: 16px 0;
        }

        li {
            margin: 4px 0;
        }

        hr {
            border: 0;
            height: 1px;
            background-color: #ddd;
            margin: 24px 0;
        }

        .toc {
            border: 1px solid #ddd;
            padding: 20px;
            margin: 24px 0;
            border-radius: 4px;
            page-break-inside: avoid;
        }

        .toc h2 {
            margin-top: 0;
            font-size: 1.2em;
        }

        .toc ul {
            list-style: none;
            padding-left: 0;
        }

        .toc a {
            color: #000;
            text-decoration: none;
        }

        .toc-indent-1 { padding-left: 20px; }
        .toc-indent-2 { padding-left: 40px; }
    `;
}

function getDarkTheme(docTitle: string): string {
    return `
        @page {
            margin: 2.5cm 2cm 2cm 2cm;
            @top-center {
                content: "${docTitle}";
                font-family: -apple-system, sans-serif;
                font-size: 10px;
                color: #9ca3af;
            }
            @top-right {
                content: "Page " counter(page);
                font-family: -apple-system, sans-serif;
                font-size: 10px;
                color: #9ca3af;
            }
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            font-size: 16px;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 30px;
            color: #e5e7eb;
            background-color: #1f2937;
        }

        h1, h2, h3, h4, h5, h6 {
            margin-top: 24px;
            margin-bottom: 16px;
            font-weight: 700;
            line-height: 1.25;
            page-break-after: avoid;
            color: #f9fafb;
        }

        h1 {
            font-size: 2.5em;
            border-bottom: 2px solid #374151;
            padding-bottom: 0.3em;
            margin-top: 0;
        }

        h2 {
            font-size: 1.8em;
            border-bottom: 1px solid #374151;
            padding-bottom: 0.3em;
        }

        h3 {
            font-size: 1.4em;
        }

        p {
            margin-top: 0;
            margin-bottom: 16px;
        }

        a {
            color: #60a5fa;
            text-decoration: none;
            border-bottom: 1px solid #60a5fa44;
        }

        a:hover {
            color: #93c5fd;
            border-bottom-color: #93c5fd;
        }

        code {
            background-color: #111827;
            padding: 0.2em 0.4em;
            border-radius: 3px;
            font-family: "SFMono-Regular", Consolas, monospace;
            font-size: 0.85em;
            color: #fb7185;
        }

        pre {
            background-color: #111827;
            padding: 16px;
            overflow: auto;
            border-radius: 6px;
            font-size: 0.85em;
            line-height: 1.45;
            border: 1px solid #374151;
            page-break-inside: avoid;
        }

        pre code {
            background-color: transparent;
            padding: 0;
            color: #e5e7eb;
        }

        table {
            border-collapse: collapse;
            width: 100%;
            margin: 20px 0;
            border-radius: 6px;
            overflow: hidden;
            page-break-inside: avoid;
        }

        th {
            background-color: #374151;
            color: #f9fafb;
            font-weight: 600;
            padding: 12px 16px;
            text-align: left;
            border: 1px solid #4b5563;
        }

        td {
            padding: 12px 16px;
            border: 1px solid #4b5563;
        }

        tr:nth-child(even) {
            background-color: #111827;
        }

        tr:hover {
            background-color: #374151;
        }

        blockquote {
            border-left: 4px solid #4b5563;
            color: #9ca3af;
            padding: 0 1em;
            margin: 16px 0;
            background-color: #111827;
            border-radius: 0 4px 4px 0;
            page-break-inside: avoid;
        }

        img {
            max-width: 100%;
            height: auto;
            border-radius: 6px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.4);
            margin: 16px 0;
            page-break-inside: avoid;
        }

        ul, ol {
            padding-left: 2em;
            margin: 16px 0;
        }

        li {
            margin: 4px 0;
        }

        hr {
            height: 2px;
            border: 0;
            background-color: #374151;
            margin: 24px 0;
        }

        .toc {
            background-color: #111827;
            border: 1px solid #374151;
            border-radius: 6px;
            padding: 20px;
            margin: 30px 0;
            page-break-inside: avoid;
        }

        .toc h2 {
            margin-top: 0;
            border-bottom: none;
            font-size: 1.3em;
            color: #f9fafb;
        }

        .toc ul {
            list-style: none;
            padding-left: 0;
        }

        .toc li {
            margin: 8px 0;
        }

        .toc a {
            color: #60a5fa;
            text-decoration: none;
            border-bottom: none;
        }

        .toc a:hover {
            text-decoration: underline;
        }

        .toc-indent-1 {
            padding-left: 20px;
        }

        .toc-indent-2 {
            padding-left: 40px;
        }
    `;
}
