#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Print commands and their arguments as they are executed
set -x

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting deployment process...${NC}"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo -e "${GREEN}Installing dependencies...${NC}"
  npm install
fi

# Make sure gh-pages is installed
if ! npm list -g gh-pages > /dev/null 2>&1; then
  echo -e "${GREEN}Installing gh-pages globally...${NC}"
  npm install -g gh-pages
fi

# Make sure we have a git repository
if [ ! -d ".git" ]; then
  echo -e "${GREEN}Initializing git repository...${NC}"
  git init
  git add .
  git commit -m "Initial commit"
  
  echo -e "${RED}Please set your remote repository URL:${NC}"
  echo -e "${RED}git remote add origin <your-github-repo-url>${NC}"
  echo -e "${RED}Then run this script again.${NC}"
  exit 1
fi

# Check if we're on a branch
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" = "HEAD" ]; then
  echo -e "${GREEN}Creating main branch...${NC}"
  git checkout -b main
fi

# Update homepage in package.json if needed
read -p "Enter your GitHub username: " USERNAME
if [ ! -z "$USERNAME" ]; then
  # Update the homepage URL in package.json
  sed -i '' "s|https://xspark.github.io/ikwezi|https://$USERNAME.github.io/ikwezi|g" package.json
  echo -e "${GREEN}Updated homepage URL in package.json${NC}"
fi

# Deploy to GitHub Pages
echo -e "${GREEN}Deploying to GitHub Pages...${NC}"
npm run deploy

echo -e "${GREEN}Deployment complete!${NC}"
echo -e "${GREEN}Your site should be available at: https://$USERNAME.github.io/ikwezi${NC}"
