#!/bin/bash

echo "📥 Pulling latest code..."
git pull origin main

echo "🐳 Starting bot..."
docker compose up -d --build

echo "⏳ Waiting for n8n..."
sleep 10

echo "📂 Syncing workflows..."

for file in workflows/*.json; do
  echo "➡️ Syncing $file"
  docker exec -i n8n n8n import:workflow --input=$file --activate --overwrite
done

echo "✅ Deployment complete!"
