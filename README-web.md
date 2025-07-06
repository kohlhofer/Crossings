# River Book - Web Publication

This project converts the markdown chapters into a single-page web book that can be published on GitHub Pages.

## Local Development

### Prerequisites
- Node.js (v18 or higher)
- npm

### Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the website:
   ```bash
   npm run build
   ```

3. Start local development server:
   ```bash
   npm run dev
   ```
   This will build the site and open it in your browser at `http://localhost:3000`

4. Or just serve the existing build:
   ```bash
   npm run serve
   ```

## Build Process

The build script (`build.js`) does the following:
1. Reads all chapter files from the `chapters/` directory in order (chapter-01.md through chapter-11.md)
2. Converts markdown content to HTML using the `marked` library
3. Creates a single HTML page with:
   - Table of contents with jump links
   - All chapters in sequence
   - Responsive design for mobile and desktop
   - Smooth scrolling between sections

## GitHub Pages Deployment

### Automatic Deployment
The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that:
- Automatically builds the website when changes are pushed to the main branch
- Deploys to GitHub Pages

### Manual Setup
1. Go to your repository settings on GitHub
2. Navigate to "Pages" in the left sidebar
3. Under "Source", select "GitHub Actions"
4. The workflow will automatically run on your next push to main

### Accessing Your Published Book
Once deployed, your book will be available at:
`https://[your-username].github.io/[repository-name]/`

## File Structure

```
├── chapters/           # Source markdown files
│   ├── chapter-01.md
│   ├── chapter-02.md
│   └── ...
├── docs/              # Generated website (GitHub Pages source)
│   └── index.html
├── .github/workflows/ # GitHub Actions for auto-deployment
│   └── deploy.yml
├── build.js           # Build script
├── package.json       # Dependencies and scripts
└── README-web.md      # This file
```

## Customization

### Styling
The CSS is embedded in the `build.js` file within the `generateHTML` function. You can modify:
- Colors and typography
- Layout and spacing
- Responsive breakpoints
- Chapter navigation styling

### Content
- Chapter files are automatically detected in the `chapters/` directory
- The build script expects files named `chapter-01.md` through `chapter-11.md`
- The first line of each chapter file should be the chapter title (# Title)

### Build Configuration
You can modify the build script to:
- Change the output directory (currently `docs/`)
- Add additional content processing
- Include images or other assets
- Modify the HTML structure

## Development Notes

- The website is generated as a single HTML file for simplicity
- All styling is inline to avoid external dependencies
- The build process is fast and can be run on every change
- The site works without JavaScript, but includes smooth scrolling enhancements 