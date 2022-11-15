#!/bin/bash

destination="/var/www/html/project4"

echo "📦 Installing dependencies..."
npm ci

echo "🛠️ Building project..."
npm run build:prod

# If folder exists, remove it
if [ -d $destination ]
then
    sudo rm -rf $destination
fi

# Create folder
sudo mkdir $destination

echo "📂 Copying build to destination directory..."
sudo rsync -a dist/ $destination

echo "🚀 Deployed frontend! It is now live at http://it2810-11.idi.ntnu.no/project4"
