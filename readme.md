# Realtime Chat App with MERN stack (Frontend)

### Introduction
This repo consists of the **Frontend** part of a Realtime Chat Application built with the MERN stack. I built it when I was trying to learn React and the stack for the first time.
You can find the backend repo [here](https://github.com/tsengm6h6/chat-app-server).

### Feature
- JWT Authentication
- One-on-one **Private Chat** where users can chat with others privately.
- Create a room and start a **Room Chat** for users who want to broadcast messages to a specific group of users.
- Real-time updates to conversation messages, user online/ offline, read/ unread status, user join/leave room to notify, etc.
- Support both RWD and different themes with light and dark mode

### Technologies
- database - MongoDB
- backend - Express.js & Node.js
- frontend - React.js (with styled-components)
- Real-time messages - Socket.io

### Deploy
- database: MongoDB Atlas
- backend: Render
- frontend: Netlify

### Live Demo
https://sweet-bombolone-176d6a.netlify.app

### Testing Account
username: Lenny Connolly  
password: 12345678  

username: Rachael Holloway  
password: 12345678  

### Screenshots
**Chat (Light mode)**
![Imgur](https://i.imgur.com/VYt9Bbf.png)

**Chat (Dark mode)**
![Imgur](https://i.imgur.com/Kvzk6A2.png)

**Chat (Mobile)**
![Imgur](https://i.imgur.com/f08biHB.png)

**Create Room (Light mode)**
![Imgur](https://i.imgur.com/tVioSqs.png)

**Create Room (Dark mode)**
![Imgur](https://i.imgur.com/LNq1G4m.png)

**Create Room (Mobile)**
![Imgur](https://i.imgur.com/gK4azXw.png)

### How to use
1. Clone the repo
    ```
    git clone https://github.com/tsengm6h6/chat-app-client-v2.git
    ```
2. Enter the directory
    ```
    cd chat-app-client-v2
    ```
3. Install dependencies
    ```
    yarn install
    ```
4. Change .env.example file
   - change file name to .env
   - go to https://multiavatar.com to create an account and get your avatar api key
   - change the VITE_SERVER_URL to your local server port (ex. http://localhost:5000 for server listening to port 5000)

5. Run the app   
    -> Please make sure the server for this app is running before running the client, [check here](https://github.com/tsengm6h6/chat-app-server) to setup for the server.
    ```
    yarn dev
    ```
    The app will be automatically opened in your web browser and you can try it out.
