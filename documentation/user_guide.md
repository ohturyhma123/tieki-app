## User guide

This user guide has been written assuming you are on linux. You can follow most of the steps even on other operating systems.


# 1. Install Node.js

Install Node.js by following the instructions on the official website:

https://nodejs.org/en/download

The project requires a minimum version of Node.js 18.

After installing run:

```bash
node --version
```

# 2. Downloading the repository

On the [main](https://github.com/ohturyhma123/tieki-app) page click on `Code` and select `Download ZIP`. Unzip the downloaded file. On linux you can go to the folder containing the zipped file and run:

```bash
unzip <filename>
```

Alternatively, if you have git installed you can just clone the repository with:

```bash
git clone https://github.com/ohturyhma123/tieki-app.git
```

# 3. Install packages

Go to the project root and run:

```bash
npm install
```

This installs the required packages for the project.

# 4. Set up MongoDB

Follow the instructions [here](https://github.com/ohturyhma123/tieki-app/blob/main/documentation/setup_mongodb_atlas.md) to set up a Mongo database for the project

# 5. Start the app

In the project root run:

```bash
npm run dev
```

You can also run the app in production mode by running the following commands:

```bash
npm run build
```

```bash
npm run prod
```
