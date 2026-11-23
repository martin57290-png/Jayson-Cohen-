#!/bin/sh
# Vercel build: copy the static site into public/ (the project's output directory).
set -e
rm -rf public
mkdir -p public
cp index.html styles.css app.js data.js public/
cp -r img media docs public/
ls -la public
