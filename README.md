# House Net (Backend)

- House Net is a web application for managing household tasks and information.
- It is designed to run on a server.
- This backend functions as an API for the [**House Net frontend application**](https://github.com/cmssandoval/house-net-frontend); however, it is also set up to serve the builded version of the frontend from the same backend environment (via the `dist/` folder), so you will need to include that builded version to use this backend. For this reason, CORS is not configured, as it is not necessary; though you should consider adding it if you plan to deploy the two applications from different origins.

## Features
- Inventory management with CRUD functionalities.
- User and session functionality for storing personal and private information.
- Users management with roles to restrict access to specific data and functionalities.

## To Do (Planned features)
- Articles for storing academic or research information.
- Posts for sharing internal family information.
- Public calendar to sharing future events and plans.
- Private calendar, with posibility to expose to Public Calendar.
- Local digital tools to avoid exposing data through third-party sites.

## Technologies used
- Node + ExpressJs for server
- Prisma + PostgreSQL for database
- argon2 for hashing
- jsonwebtoken for encryption
- zod for validation

For frontend, I used React + TypeScript, builded with Vite, with react-router-dom for the application routes, zod for validation, and bootstrap/react-bootstrap for quick styles.

## How to use
### Prerequisites
1. Install Node and npm latest versions. This app is constantly being updated and optimized, issues will be resolved as soon as possible.
2. Install PostgreSQL latest version.
3. Create the database **housenet**, or whatever name you like, just put the same in the DATABASE_URL environment variable at your .env file.

### Requirements
1. Download or clone this repostory. Consider that you should do the same with the frontend app by now, in the future I will probably include the latest build in this same backend repository, I apologize.

2. Open a terminal in the downloaded folder directory and run the following commands to install dependencies:
    ```
    npm install
    ```

3. Create a .env file following the [**.env.example**](./.env.example) schema and follow the instructions in the code comments.

4. To create the tables on the database from the prisma schema, run:
    ```
    npx prisma migrate deploy
    ```
- If you don't have the schema for any reason, run the following command before the one above:
    ```
    npx prisma db push
    ```

5. Make sure you have the dist folder with the frontend app builded inside.

6. To manually start the server run:
    ```
    npm run start
    ```

7. Depending on your configuration, go to the server + port route, in example:
    - **http://localhost:5000/**
    - **http://192.168.1.10:8080/**
    - **http://192.168.1.20:3000/**
- **IMPORTANT**: Please configure your network appropriately by establishing a correct and secure setup that complies with cybersecurity standards. Do not use port forwarding on your routers. Implement strict and explicit firewall rules. Keep your systems up to date. This application is designed exclusively for use within a local area network (LAN); if you plan to extend its reach, consider using Tailscale with the appropriate configuration.

8. To stop the server press Ctrl + C.

## Notes
- If you want to run this app automatically when turning on your server, you must configure pm2:

1. First, install pm2 as a global package. In a terminal:
    ```
    npm install -g pm2
    ```

2. Verify the install:
    ```
    pm2 --version
    ```

3. To generate the script for automatic initialization in your operative system, run:
    ```
    pm2 startup
    ```
- This command will return you a custom command, you should copy it and paste it to enable the service. Remember to run it as administrator. In linux, it looks something like this:
    ```
    sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u your_user --hp /home/your_user
    ```

4. Start manually the app with the command specified previously, in the app directory:
    ```
    npm run start
    ```

5. Save the running process list of pm2 running:
    ```
    pm2 save
    ```
    
6. Now you can reboot your system and the process should start automatically. You can check this running:
    ```
    pm2 status
    ```

7. To stop it by its pm2 process name or id, in a terminal, run:
    ```
    pm2 stop backend-house-net
    ```
    or
    ```
    pm2 stop 0
    ```
- Keep in mind that if you run multiple processes simultaneously, and want them all to start when booting the system, you may need to save the state (`pm2 save`) each time you add a process.
- To remove a process from automatic startup, you must save the pm2 state while the process is stopped. Otherwise, the process will continue to start automatically.
- If you use NVM, run this after each node version change:
    ```
    pm2 unstartup
    pm2 startup
    ```
- You can also fix a node version when running the first pm2 command:
    ```
    pm2 startup systemd -u your_user --hp /home/your_user
    ```

## Contact
If you have any comments, suggestions or questions, check my profile:

**GitHub: https://github.com/cmssandoval/**
