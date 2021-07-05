# reviews

## Start project without Docker
### Project running process
* Step 1: Clone project
```
git clone https://github.com/ledutu/reviews.git
```
* Step 2: cd to project folder and run npm install
```
cd reviews/backend-api
npm install
```
* Step 3: Run project by npm start
```
npm start
```
* Step 4: Open chrome and enter. Your computer had to be installed mongo before.

**BASE_URL**
```
http://localhost:4000/

```
**Database**
```
mongodb://localhost:27017
```

## Start project with Docker
### Project running process no need to set up environment
**_Note: Your compuder had to be installed docker before_**
* Step 1: Clone project
```
git clone https://github.com/ledutu/review-book.git
```
**For window:**
* Step 2: Build Dockerfile
```
docker build -t node-app-image .
```
* Step 3: Run docker-compose file
```
docker-compose up
```
**For Linux/Ubuntu**
* Step 2: Build Dockerfile
```
sudo docker build -t node-app-image .
```
* Step 3: Run docker-compose file
```
sudo docker-compose up
```
* Step 4: Open chrome and enter

**BASE_URL**
```
http://localhost:4000/
```
**Database**
```
mongodb://localhost:27018
```

## Create database automaticly
### Database List
* users
* reviews
* review_categories
* comments
* reactions

### To create database by command
**For Window**
* Step 1: Open git bash where we can run script file.
* Step 2: At root project, cd to scripts folder
```
cd scripts
```
* Step 3: Run script file.
```
bash create-db.sh <collection> <number of document> <locale>
```
__Or__
```
./create-db.sh <collection> <number of document> <locale>
```

**For Linux/Ubuntu**
* Step 1: Open git bash where we can run script file.
* Step 2: At root project, cd to scripts folder
```
cd scripts
```
* Step 3: Run script file.
```
bash create-db.sh <collection> <number of document> <locale>
```

**Description**

__collection__

* user
* review
* review-category
* comment
* review-vote
* calculate-vote: to calculate rate of review post
* all: all is create all collection

__number of document__:
It is amount of rows of collection (Default: 5, Optional)

__locale__:
It is language of document (Ex: vi, en, de,...) (Default: de, Optional)

## Page detail
* Coming soon.