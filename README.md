# ANEGIS 2026 Website

Modern corporate website for ANEGIS - Microsoft Solutions Partner.

## Tech Stack
- HTML5
- CSS3 (Vanilla CSS)
- JavaScript (Vanilla JS)
- Polymath Display & Polymath fonts

## Local Development
Simply open `index.html` in your browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (if you have npx)
npx serve
```

## Deployment
This site is configured for Netlify deployment. Simply push to the connected GitHub repository and Netlify will automatically deploy.

### Manual Deployment
1. Connect your GitHub repo to Netlify
2. Set publish directory to `.` (root)
3. No build command needed

## Structure
```
├── index.html          # Main HTML file
├── styles.css          # Global styles
├── script.js           # JavaScript functionality
├── netlify.toml        # Netlify configuration
└── assets/
    ├── fonts/          # Polymath font files
    └── images/         # Image assets
```

## License
© 2026 ANEGIS. All rights reserved.
