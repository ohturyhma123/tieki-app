## How to setup MongoDB Atlas for testing the project on your computer

1. Create MongoDB Atlas account

https://www.mongodb.com/cloud/atlas/register

2. Follow fullstack open instructions on creating the cluster

Make sure to write down the password for the database account somewhere.

fi: https://fullstackopen.com/osa3/tietojen_tallettaminen_mongo_db_tietokantaan#mongo-db

eng: https://fullstackopen.com/en/part3/saving_data_to_mongo_db#mongo-db

The instructions are slightly outdated. If there is no "allow access from anywhere", enter 0.0.0.0 for the IP.

As long as you have created the cluster and created the database user, you can continue.

3. Install MongoDB Database Tools

Needed for mongoimport

https://www.mongodb.com/docs/database-tools/installation/installation/

Run
```bash
mongoimport --version
```
To verify if installed succesfully

4. Setup project to use your database

Create a .env file in the project root with your URI. You can get the URI from "Cmd line tools" -> "Connect instructions" -> "Drivers (step 3)". MAKE SURE to add the DATABASE NAME to the URI (example mondodb.net/tieki-app), it's not there by default.

Example
```bash
MONGODB_URI=mongodb+srv://mycoolusername:supersecretpassword@cluster0.ahbnuse.mongodb.net/tieki-app?retryWrites=true&w=majority
```

5. Import JSON files to MongoDB

In MongoDB Atlas go to "Cmd line tools" tab in the cluster.

Scroll down to "Data Import and Export Tools" and follow the guide.

PASSWORD is your database password

DATABASE can be anything, but just name it tieki-app

COLLECTION is the collection name

You NEED to name the collections correctly for each json:
- links -> linksData.json
- results -> resultsData.json
- statements -> statementsData.json

FILETYPE is JSON

FILENAME is the json file

It is REQUIRED that you add --jsonArray to the end of the command, otherwise import will fail.

You need to import all 3 json files one by one.

Example:
```bash
mongoimport --uri  mongodb+srv://mycoolusername:supersecretpassword@cluster0.ahbnuse.mongodb.net/tieki-app  --collection  links  --type JSON   --file  data/linksData.json --jsonArray
```

If successful you should see the data in the "collections" tab in the cluster and the database and collections properly named.

![Screenshot](./screenshots/mongodb_successful_config.png)
