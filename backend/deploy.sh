#!/bin/bash

project="project3"

echo "📦 Installing dependencies..."
npm ci

echo "🛠️ Building project..."
npm run build

# Start server using pm2 (process management)
echo "🛠️ Starting server..."
pm2 delete -s $project || :
pm2 start ./dist/app.js --name=$project

echo "🚀 Deployed backend! It is now live at http://it2810-11.idi.ntnu.no:8080/graphql"