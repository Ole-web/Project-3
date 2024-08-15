MERN Social Media App



This project is a full-stack social media application built with the MERN (MongoDB, Express, React, Node.js) stack. 
It features user authentication, post creation, liking posts, and a dark mode toggle.

Features
User Authentication: Sign up and log in with secure authentication using JWT.
Create Posts: Users can create, edit, and delete posts.
Like Posts: Users can like and unlike posts.
Dark Mode: Toggle between light and dark themes.
Responsive Design: Optimized for mobile and desktop views.
Installation
Clone the repository:

bash
Code kopieren
git clone https://github.com/yourusername/mern-social-media.git
cd mern-social-media
Install server dependencies:

bash
Code kopieren
cd server
npm install
Install client dependencies:

bash
Code kopieren
cd ../client
npm install
Set up environment variables:

Create a .env file in the server directory with the following:
makefile
Code kopieren
MONGO_URL=<Your MongoDB Connection String>
JWT_SECRET=<Your JWT Secret>
Start the development servers:

Start the server:
bash
Code kopieren
cd server
npm run dev
Start the client:
bash
Code kopieren
cd client
npm start
Open your browser and navigate to http://localhost:3000.

Technologies Used
MongoDB: Database for storing user and post data.
Express: Backend framework for creating RESTful APIs.
React: Frontend library for building user interfaces.
Node.js: Server-side JavaScript runtime.
Project Structure
server/: Contains the backend code (API routes, models, controllers).
client/: Contains the frontend code (React components, Redux store).
License
This project is open-source and available under the MIT License.

