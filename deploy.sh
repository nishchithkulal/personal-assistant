#!/bin/bash

echo "📥 Pulling latest code..."
git pull origin main

echo "🐳 Starting containers..."
docker compose up -d --build || exit 1

echo "⏳ Waiting for n8n to be ready..."
sleep 20

echo "📂 Importing workflows..."

shopt -s nullglob

for file in ./workflows/*.json; do
  name=$(basename "$file")

  echo "➡️ Processing $name"

  echo "📥 Importing $name..."
  docker exec -i personal-assistant-n8n n8n import:workflow --input="/workflows/$name"
done

echo "✅ Deployment complete!"
