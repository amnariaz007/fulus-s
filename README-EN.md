# INSTRUCTION

## Production Deployment

> The frontend application (React) is located in the `client` folder.
> The backend application (Node.js) is located in the `server` folder.

**1. Deploying the Client**  
1.1. Navigate to the `client` folder  
1.2. Run the command `yarn install` to install dependencies  
1.3. Open the file `.env.prod` and fill it in. Then, rename it to `.env`  
1.4. Run the command `yarn build`  
1.5. Deploy the files from the `build` folder to your web server (for example, I deploy them to Firebase)

**2. Deploying the Server**  
2.1. Install MySQL on your server, create a database named `notcoin`, and import the `notcoin.sql` file into it  
2.2. Install Node.js (version 16+)  
2.3. Install PM2 using the command `npm install pm2 -g`  
2.4. Navigate to the `server` folder  
2.5. Run the command `yarn install` to install dependencies  
2.6. Open the file `.env.prod` and fill it in. Then, rename it to `.env`  
2.7. Run the command `yarn build`  
2.8. Start the server using the command `pm2 start src/index.js`  
2.9. Proxy the server with nginx (an example configuration file is `nginx.conf`)
