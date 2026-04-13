#!/bin/bash

echo "📥 Pulling latest code..."
git pull origin main

echo "🐳 Starting containers..."
docker compose up -d --build

echo "⏳ Waiting for n8n to be ready..."
sleep 15

echo "📂 Checking & importing workflows..."

# Loop through all workflow files
for file in ./workflows/*.json; do
  name=$(basename "$file")

  echo "➡️ Processing $name"

  # Check if workflow already exists
  exists=$(docker exec personal-assistant-n8n n8n list:workflow | grep "$name")

  if [ -z "$exists" ]; then
    echo "📥 Importing $name..."
    docker exec -i personal-assistant-n8n n8n import:workflow --input="/workflows/$name"
  else
    echo "⏭️ Skipping $name (already exists)"
  fi
done

echo "✅ Deployment complete!"