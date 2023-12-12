# How to setup MongoDB Atlas for testing the project on your computer

## 1. Create MongoDB Atlas account

https://www.mongodb.com/cloud/atlas/register

## 2. Follow fullstack open instructions on creating the cluster

Choose AWS Stockholm for the cluster.

Make sure to write down the password for the database account somewhere.

fi: https://fullstackopen.com/osa3/tietojen_tallettaminen_mongo_db_tietokantaan#mongo-db

eng: https://fullstackopen.com/en/part3/saving_data_to_mongo_db#mongo-db

The instructions are slightly outdated. If there is no "allow access from anywhere", enter 0.0.0.0 for the IP.

As long as you have created the cluster and created the database user, you can continue.

## 3. Setup project to use your database

Copy .env-template file and rename it .env. Replace `<connection_string>` with your databse URI. You can get the URI from "Connect" -> "Drivers" -> "Step 3". Replace `<password>` with the database password. MAKE SURE to add the DATABASE NAME to the URI (example mongodb.net/tieki-app), it's not there by default.

Example:
```bash
MONGODB_URI=mongodb+srv://mycoolusername:supersecretpassword@cluster0.ahbnuse.mongodb.net/tieki-app?retryWrites=true&w=majority
```

## 4. Import JSON files to MongoDB

Run in project root:
```bash
npm run init
```

If successful you should see the data in the "collections" tab in the cluster and the database and collections properly named.

![Screenshot](./screenshots/mongodb_successful_config.png)
