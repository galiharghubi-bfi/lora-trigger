#!/bin/bash

# List of your specific project folders
folders=(
    "lora-backoffice-fe"
    "lora-gateway-service"
    "lora-partnership-ndf"
    "lora-partnership-task-ndf"
    "lora-schema-service"
    "lora-task-service"
)

for dir in "${folders[@]}" ; do
    # Check if this directory exists and is a git repository
    if [ -d "$dir/.git" ]; then
        echo "======== Entering $dir ========"
        cd "$dir" || { echo "Failed to enter $dir, skipping..."; continue; }
        
        # Make sure we're on master branch
        git checkout master
        
        # Try to pull master branch
        git pull origin master
        if [ $? -ne 0 ]; then
            echo "Conflict or error detected in $dir. Stashing changes..."
            git stash
            git pull origin master
            git stash pop
        fi

        make vendor
        
        cd ..
        echo "======== Leaving $dir ========"
    else
        echo "$dir is not a git repository or does not exist, skipping..."
    fi
done