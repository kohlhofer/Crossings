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
            const title = lines[0].replace('# ', '').trim();
            const body = lines.slice(1).join('\n').trim();
            
            chapters.push({
                number: i,
                title,
                body,
                id: `chapter-${i}`
            });
        }
    }
    
    return chapters;
}

// Generate navigation
function generateNavigation(chapters) {
    const navItems = chapters.map(chapter => 
        `<li><a href="#${chapter.id}">${chapter.number}. ${chapter.title}</a></li>`
    ).join('\n    ');
    
    return `
  <nav class="book-nav">
    <h2>Table of Contents</h2>
    <ul>
    ${navItems}
    </ul>
  </nav>`;
}

// Generate chapter HTML
function generateChapterHTML(chapters) {
    return chapters.map(chapter => `
  <section id="${chapter.id}" class="chapter">
    <h1>${chapter.title}</h1>
    ${marked.parse(chapter.body)}
  </section>`).join('\n');
}

// Generate complete HTML
function generateHTML(chapters) {
    const navigation = generateNavigation(chapters);
    const chaptersHTML = generateChapterHTML(chapters);
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>River Book</title>
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
        
        .book-nav {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 8px;
            margin-bottom: 3rem;
        }
        
        .book-nav h2 {
            margin-bottom: 1rem;
            color: #2c3e50;
        }
        
        .book-nav ul {
            list-style: none;
        }
        
        .book-nav li {
            margin-bottom: 0.5rem;
        }
        
        .book-nav a {
            color: #3498db;
            text-decoration: none;
            padding: 0.25rem 0;
            display: block;
        }
        
        .book-nav a:hover {
            color: #2980b9;
            text-decoration: underline;
        }
        
        .chapter {
            margin-bottom: 4rem;
            padding-bottom: 2rem;
            border-bottom: 1px solid #eee;
        }
        
        .chapter:last-child {
            border-bottom: none;
        }
        
        .chapter h1 {
            font-size: 2rem;
            margin-bottom: 2rem;
            color: #2c3e50;
            padding-top: 1rem;
        }
        
        .chapter p {
            margin-bottom: 1.2rem;
            text-align: justify;
        }
        

        
        @media (max-width: 768px) {
            .container {
                padding: 1rem;
            }
            
            .book-header h1 {
                font-size: 2rem;
            }
            
            .chapter h1 {
                font-size: 1.5rem;
            }
        }
        
        /* Smooth scrolling */
        html {
            scroll-behavior: smooth;
        }
        
        /* Highlight target chapter */
        .chapter:target {
            background-color: #fff;
            border-radius: 8px;
            padding: 1rem;
            margin: 1rem 0;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="book-header">
            <h1>River Book</h1>
            <div class="subtitle">A story of endurance, small kindnesses, and life by the river</div>
        </header>
        
        ${navigation}
        
        <main class="book-content">
${chaptersHTML}
        </main>
    </div>
    
    <script>
        // Add smooth scrolling behavior for older browsers
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    </script>
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