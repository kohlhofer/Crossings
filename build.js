const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// Configuration
const CHAPTERS_DIR = './chapters';
const OUTPUT_DIR = './docs';
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'index.html');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Read and process chapters
function readChapters() {
    const chapters = [];
    
    // Read chapters 1-11 in order
    for (let i = 1; i <= 11; i++) {
        const filename = `chapter-${i.toString().padStart(2, '0')}.md`;
        const filepath = path.join(CHAPTERS_DIR, filename);
        
        if (fs.existsSync(filepath)) {
            const content = fs.readFileSync(filepath, 'utf8');
            const lines = content.split('\n');
            // Skip the title line and use the rest as body
            const body = lines.slice(1).join('\n').trim();
            
            chapters.push({
                number: i,
                body,
                id: `chapter-${i}`
            });
        }
    }
    
    return chapters;
}

// Generate chapter HTML with separators
function generateChapterHTML(chapters) {
    return chapters.map((chapter, index) => {
        const separator = index > 0 ? `
  <div class="chapter-separator">
    <div class="separator-line"></div>
    <div class="separator-ornament">❦</div>
    <div class="separator-line"></div>
  </div>` : '';
        
        return `${separator}
  <section id="${chapter.id}" class="chapter">
    ${marked.parse(chapter.body)}
  </section>`;
    }).join('\n');
}

// Generate complete HTML
function generateHTML(chapters) {
    const chaptersHTML = generateChapterHTML(chapters);
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crossings</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: Georgia, 'Times New Roman', serif;
            line-height: 1.6;
            color: #333;
            background-color: #fafafa;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        .book-header {
            text-align: center;
            margin-bottom: 3rem;
            padding-bottom: 2rem;
            border-bottom: 1px solid #ddd;
        }
        
        .book-header h1 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            color: #2c3e50;
        }
        
        .book-header .subtitle {
            font-style: italic;
            color: #666;
            font-size: 1.1rem;
        }
        
        .chapter {
            margin-bottom: 2rem;
        }
        
        .chapter p {
            margin-bottom: 1.2rem;
            text-align: justify;
        }
        
        .chapter-separator {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 3rem 0;
            padding: 1rem 0;
        }
        
        .separator-line {
            height: 1px;
            background: linear-gradient(to right, transparent, #ccc, transparent);
            flex: 1;
            max-width: 100px;
        }
        
        .separator-ornament {
            font-size: 1.5rem;
            color: #999;
            margin: 0 1.5rem;
            font-family: Georgia, serif;
        }
        
        @media (max-width: 768px) {
            .container {
                padding: 1rem;
            }
            
            .book-header h1 {
                font-size: 2rem;
            }
        }
        
        /* Smooth scrolling */
        html {
            scroll-behavior: smooth;
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="book-header">
            <h1>Crossings</h1>
            <div class="subtitle">A short story</div>
        </header>
        
        <main class="book-content">
${chaptersHTML}
        </main>
    </div>
    
    <script src="https://hypothes.is/embed.js" async></script>
</body>
</html>`;
}

// Main build function
function build() {
    console.log('Building book website...');
    
    const chapters = readChapters();
    console.log(`Found ${chapters.length} chapters`);
    
    const html = generateHTML(chapters);
    
    fs.writeFileSync(OUTPUT_FILE, html);
    console.log(`Built website: ${OUTPUT_FILE}`);
    console.log('Run "npm run serve" to view locally');
}

// Run build
build(); 