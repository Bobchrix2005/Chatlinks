# Chatlink Server

'chatlink-server' Node.js server for handling chatlink endpoints

# Table of Contents

1. [Installation](# Installation)
2. [Usage](# Usage)
3. [Features](# Features)


# Installation

To install dependencies, run:

```bash
npm install
# or
yarn install
```

# Usage

1. Configure your localhost / online MySQL server with pre-existing or empty SQL DB.

2. Update `config/dbConfig.js` with the correct DB credentials. This will automatically create Necessary Tables in the DB if they dont exist.

2. Create an .env file with constants from `.env.example`.

3. Start the server by running:

```bash
npm install
# or
yarn install
```

# Features

1. Stack

- Node.js server
- Express.js routing
- SQL(MySql) database
- Sequelize models
- AWS storage

2. Folders

- `/server.js`: Entry point of the application.
- `/package.json`: Contains project dependencies and scripts.
- `/.env.example`: Contains enviroment constants.
- `/config`: Configuration files including AWS DB and Multer configurations.
- `/controllers`: Contains controller functions for handling business logic.
- `/middleware`: Middleware functions for security.
- `/models`: SQL database models.
- `/routes`: Route handlers for each endpoint.
- `/utils`: Global utility functions.



