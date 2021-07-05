#!bin/bash

# Author: Le Duc Tung
# Username: ledutu
# Script will be showed below:

IMAGE=$1

function buildBackendImage() {
    echo "Building backend image docker......"
    sudo docker build -t backend-api-image -f ./backend-api/Dockerfile .
    echo "Build Backend image successful"
}

function buildFrontendImage() {
    echo "Building frontend image docker......"
    sudo docker build -t frontend-web-image -f ./frontend-web/Dockerfile .
    echo "Build frontend image successful"
}

function runApp() {
    echo "Running App"
    sudo docker-compose -f ./deployment/app-service.yml up
}

if [ $IMAGE ]
then
    if [ $IMAGE == 'stop' ]
    then
        sudo docker-compose -f ./deployment/app-service.yml down
    else
        buildBackendImage
        buildFrontendImage
        runApp
    fi
else
    runApp
fi