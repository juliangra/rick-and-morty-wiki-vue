#!/bin/bash

# Run deployment script in backend directory
echo "🛠️ Deploying backend..."
cd backend && sh deploy.sh

# Run deployment script in frontend directory
echo "🛠️ Deploying frontend..."
cd ../frontend && sh deploy.sh