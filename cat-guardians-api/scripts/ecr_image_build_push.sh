#!/bin/bash

# Clone the repository from GitLab
echo "Cloning the repository"
git clone "$PROJECT_URL"

# Navigating to $CI_PROJECT_NAME if exists, exit script otherwise
echo "Checking if the $CI_PROJECT_NAME directory exists"
if [ -d "$CI_PROJECT_NAME" ]; then
    echo "$CI_PROJECT_NAME directory found"
    cd "$CI_PROJECT_NAME"
else
    echo "$CI_PROJECT_NAME directory not found"
    exit 1
fi

# Navigate to branch 'develop' if exists, exit scrip otherwise ;
if git show-ref --verify --quiet refs/remotes/origin/develop; then
    git switch develop
else
    echo "Branch 'develop' not found"
    exit 1
fi

# Check if the 'aws' command is available
while ! command -v aws &> /dev/null
do
    echo "'aws' command not found, waiting for 30 seconds before checking again"
    sleep 30
done
echo "'aws' command is available, proceeding to configure AWS CLI"

# Configure AWS CLI
aws configure set aws_access_key_id "$AWS_ACCESS_KEY_ID" &&
aws configure set aws_secret_access_key "$AWS_SECRET_ACCESS_KEY" &&
aws configure set region "$AWS_DEFAULT_REGION" &&
aws configure set output "txt"

# Login to AWS ECR
aws ecr get-login-password --region "$AWS_DEFAULT_REGION" | docker login --username AWS --password-stdin "$AWS_ECR_REGISTRY"

# Build the Docker images
echo "Building the Docker images"
docker build -t cat-guardians-api -f src/api/docker/Dockerfile .

# Tag the Docker image
echo "Tagging the Docker image"
docker tag cat-guardians-api:latest "$AWS_ECR_IMAGE_URI_API":latest
docker tag cat-guardians-api:latest "$AWS_ECR_IMAGE_URI_API":"$TAG-$CI_COMMIT_SHORT_SHA"

# Push the Docker image to ECR
echo "Pushing the Docker image to ECR"
docker push "$AWS_ECR_IMAGE_URI_API":latest
docker push "$AWS_ECR_IMAGE_URI_API":"$TAG-$CI_COMMIT_SHORT_SHA"
