#!/bin/bash

echo "Setting up IPFS with Docker..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if IPFS container already exists
if docker ps -a | grep -q ipfs-node; then
    echo "IPFS container already exists. Removing it to create a fresh one."
    docker stop ipfs-node
    docker rm ipfs-node
fi

# Create and run IPFS container
echo "Creating new IPFS container..."
docker run -d --name ipfs-node \
    -p 5001:5001 \
    -p 8080:8080 \
    -p 4001:4001 \
    -e IPFS_PROFILE=server \
    ipfs/kubo:latest

echo "Waiting for IPFS container to initialize..."
sleep 5

# Configure CORS for the IPFS API
echo "Configuring CORS settings..."
docker exec ipfs-node ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:8080", "http://127.0.0.1:8080"]'
docker exec ipfs-node ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST", "GET"]'
docker exec ipfs-node ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials '["true"]'

# Restart IPFS container to apply settings
echo "Restarting IPFS container to apply settings..."
docker restart ipfs-node

echo "IPFS setup complete!"
echo "IPFS API is available at: http://localhost:5001"
echo "IPFS Gateway is available at: http://localhost:8080"

# Verify IPFS is working
echo "Verifying IPFS is working..."
sleep 5
if curl -s http://localhost:5001/api/v0/version > /dev/null; then
    echo "✅ IPFS is running correctly!"
else
    echo "❌ There was an issue starting IPFS. Please check Docker logs with: docker logs ipfs-node"
fi 