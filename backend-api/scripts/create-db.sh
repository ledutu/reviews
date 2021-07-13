#!bin/bash

# Author: Le Duc Tung
# Username: ledutu
# Script will be showed below:

API_URL=http://localhost:4000/database/create-database

TYPE=$1
TIMES=$2
LOCALE=$3
HASH=ledutu

function createUser () {
    echo "Creating User database......"
    RESPONSE=`wget -qO- ${API_URL}/user?times=${TIMES}\&locale=${LOCALE}`
    if [ $RESPONSE ]
    then
        echo "Create user database successful"
    else
        echo "Create user database fail, please check and try again"
        exit 1
    fi
}

function createReviewCategory() {
    echo "Creating Review Category database......"
    RESPONSE=`wget -qO- ${API_URL}/review-category?times=${TIMES}\&locale=${LOCALE}`
    if [ $RESPONSE ]
    then
        echo "Create review category database successful"
    else
        echo "Create review category database fail, please check and try again"
        exit 1
    fi
}

function createReview() {
    echo "Creating Review database......"
    RESPONSE=`wget -qO- ${API_URL}/review?times=${TIMES}\&locale=${LOCALE}`
    if [ $RESPONSE ]
    then
        echo "Create review database successful"
    else
        echo "Create review database fail, please check and try again"
        exit 1
    fi
}

function createComment () {
    echo "Creating Comment database......"
    RESPONSE=`wget -qO- ${API_URL}/comment?times=${TIMES}\&locale=${LOCALE}`
    if [ $RESPONSE ]
    then
        echo "Create Comment database successful"
    else
        echo "Create Comment database fail, please check and try again"
        exit 1
    fi
}

function createReviewVote() {
    echo "Creating Review vote database......"
    RESPONSE=`wget -qO- ${API_URL}/create-review-vote?times=${TIMES}\&locale=${LOCALE}`
    if [ $RESPONSE ]
    then
        echo "Create Review vote database successful"
    else
        echo "Create Review vote database fail, please check and try again"
        exit 1
    fi
}

function calculateVote() {
    echo "Calculating Review vote database......"
    RESPONSE=`wget -qO- ${API_URL}/calculate-vote`
    if [ $RESPONSE ]
    then
        echo "Calculating review vote database successful"
    else
        echo "Calculating review vote database fail, please check and try again"
        exit 1
    fi
}

function createRole() {
    echo "Creating role database......"
    RESPONSE=`wget -qO- ${API_URL}/role`
    if [ $RESPONSE ]
    then
        echo "Create role database successful"
    else
        echo "Create role database fail, please check and try again"
        exit 1
    fi
}

function createAll() {
    createUser
    createReviewCategory
    createReview
    createComment
    createReviewVote
    calculateVote
    createRole
}

function main() {
    case $TYPE in
        "user")
            createUser
        ;;
        "review-category")
            createReviewCategory
        ;;
        "review")
            createReview
        ;;
        "comment")
            createComment
        ;;
        "review-vote")
            createReviewVote
        ;;
        "calculate-vote")
            calculateVote
        ;;
        "role")
            createRole
        ;;
        "all")
            createAll
        ;;
        *)
            echo 'Your key is wrong, please try again'
        ;;
    esac
}

main