#!/bin/bash

# Clone the repository from GitLab
echo "Cloning the repository"
git clone $PROJECT_URL


# Navigating to $CI_PROJECT_NAME if exists, exit script otherwise
echo "Checking if the $CI_PROJECT_NAME directory exists"
if [ -d $CI_PROJECT_NAME ]; then
    echo "$CI_PROJECT_NAME directory found"
    cd $CI_PROJECT_NAME
else
    echo "$CI_PROJECT_NAME directory not found"
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
aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID &&
aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY &&
aws configure set region $AWS_DEFAULT_REGION &&
aws configure set output "txt"

# Login to AWS ECR
aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $AWS_ECR_REGISTRY

# Create .env file
echo "Creating the .env file"
echo "REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL" > .env
echo "REACT_APP_GOOGLE_MAP_API_KEY=$REACT_APP_GOOGLE_MAP_API_KEY" >> .env

# Build the Docker images
echo "Building the Docker images"
docker build -t cat-guardians-ui:latest . 


# Docker tag and push
echo "Tagging and pushing the Docker images"
docker tag cat-guardians-ui:latest $AWS_ECR_IMAGE_URI_UI:latest
docker tag cat-guardians-ui:latest $AWS_ECR_IMAGE_URI_UI:"$TAG-$CI_COMMIT_SHORT_SHA"
docker push $AWS_ECR_IMAGE_URI_UI:latest
docker push $AWS_ECR_IMAGE_URI_UI:"$TAG-$CI_COMMIT_SHORT_SHA"
