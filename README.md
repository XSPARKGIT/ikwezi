# X Spark Coming Soon Page

A simple, elegant coming soon page with a persistent countdown timer.

## Features

- Responsive design using Tailwind CSS
- Persistent countdown timer that doesn't reset on page reload
- Smooth animations and modern UI

## Local Development

To run the project locally:

1. Clone the repository
2. Navigate to the project directory
3. Run a local server:

```bash
# Using the included npm script
npm start

# OR using any simple HTTP server
npx serve
```

4. Open your browser and navigate to the URL provided by the server (typically http://localhost:3000)

## Deployment

### Automatic Deployment (Recommended)

Run the deployment script:

```bash
# Make the script executable first
chmod +x deploy.sh

# Run the script
./deploy.sh
```

The script will:
- Install dependencies if needed
- Initialize git if needed
- Prompt for your GitHub username to update the homepage URL
- Deploy to GitHub Pages

### Manual Deployment

1. Make sure you have gh-pages installed:
```bash
npm install --save-dev gh-pages
```

2. Update the `homepage` field in package.json with your GitHub Pages URL:
```json
"homepage": "https://yourusername.github.io/ikwezi"
```

3. Deploy the site:
```bash
npm run deploy
```

## Customization

- **Countdown Duration**: Edit the `timer.js` file and modify the number of days in the `getCountdownEndDate` function
- **Colors**: Update the CSS variables in the `<style>` section of `index.html`
- **Logo**: Replace the image at `images/LOGO.png` with your own logo
- **Content**: Edit the text in `index.html` to match your brand messaging

## License

© X Spark. All rights reserved.
