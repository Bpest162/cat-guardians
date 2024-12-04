#!/bin/bash

# This script checks if the build instance is still running 20 minutes after launch and terminates it.

# Set the time (in seconds) after which the instance should be terminated.
TERMINATION_TIME=1200

# Fetch the instance IDs of the instances with the specified tag.
INSTANCE_IDS=$(aws ec2 describe-instances \
    --filters "Name=tag:Name,Values=build-push-server" \
    --query "Reservations[*].Instances[*].InstanceId" \
    --output text)

if [ -z "$INSTANCE_IDS" ]; then
    echo "No build-push-server instance found."
    exit 0
fi

# Iterate over the instance IDs and check if the instance is still running.
for INSTANCE_ID in ${INSTANCE_IDS[*]}; do
    # Fetch the launch time and state of the instance.
    INSTANCE_DETAILS=$(aws ec2 describe-instances \
        --instance-ids "$INSTANCE_ID" \
        --query "Reservations[*].Instances[*].[LaunchTime,State.Name]" \
        --output text)

    # Extract launch time and state from the details.
    LAUNCH_TIME=$(echo "$INSTANCE_DETAILS" | awk '{print $1}')
    INSTANCE_STATE=$(echo "$INSTANCE_DETAILS" | awk '{print $2}')

    # Check if the instance is running.
    if [ "$INSTANCE_STATE" != "running" ]; then
        echo "Instance $INSTANCE_ID is not in a running state. Current state: $INSTANCE_STATE"
        continue # Skip to the next iteration.
    fi

    # Convert the launch time to Unix timestamp.
    LAUNCH_TIMESTAMP=$(date -d "$LAUNCH_TIME" +%s)

    # Calculate the current time in Unix timestamp.
    CURRENT_TIMESTAMP=$(date -u +%s)

    # Calculate the difference in time (in seconds) between the current time and the launch time.
    TIME_DIFF=$((CURRENT_TIMESTAMP - LAUNCH_TIMESTAMP))

    # Terminate the instance if the time difference is greater than the termination time.
    if [ "$TIME_DIFF" -gt $TERMINATION_TIME ]; then
        aws ec2 terminate-instances --instance-ids "$INSTANCE_ID"
        aws ec2 wait instance-terminated --instance-ids "$INSTANCE_ID"
        echo "Terminated instance $INSTANCE_ID"
    else
        echo "Instance $INSTANCE_ID is still within the allowed time."
    fi
done
