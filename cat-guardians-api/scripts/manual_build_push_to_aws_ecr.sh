#!/bin/bash

# Get the login password for pushing to AWS ECR and login, but aws cli must be installed and configured
aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin 637423659023.dkr.ecr.eu-central-1.amazonaws.com
login_status=$?

# Check if AWS ECR login was successful
if [ $login_status -eq 0 ]; then
    echo "AWS ECR login succeeded, proceeding with build..."

    # Assign a value to TAG using the current timestamp
    TAG=$(date +%s)

    # Build the Docker image
    docker buildx build --platform linux/amd64 -t "cat-guardians-api:$TAG" -f src/api/docker/Dockerfile .
    build_status=$?

    # Check if the build was successful
    if [ $build_status -eq 0 ]; then
        echo "Build succeeded, proceeding with tagging and pushing..."

        # Tag the Docker image
        docker tag "cat-guardians-api:$TAG" "637423659023.dkr.ecr.eu-central-1.amazonaws.com/cat-guardians-api:$TAG"
        docker tag "cat-guardians-api:$TAG" "637423659023.dkr.ecr.eu-central-1.amazonaws.com/cat-guardians-api:latest"

        # Push the Docker image to AWS ECR
        docker push "637423659023.dkr.ecr.eu-central-1.amazonaws.com/cat-guardians-api:$TAG"
        docker push "637423659023.dkr.ecr.eu-central-1.amazonaws.com/cat-guardians-api:latest"
    else
        echo "Build failed, exiting..."
        exit 1
    fi
else
    echo "AWS ECR login failed, exiting..."
    exit 1
fi
