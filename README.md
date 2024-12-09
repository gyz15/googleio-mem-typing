# Getting Started
Downlaod this repo, unzip, make sure you have Node.js installed.

### Step 1: Installing Dependencies
Run `npm run client-install` to install client dependencies.
Run `npm run server-install` to install server dependencies.

### Step 2: Configure MongoDB
Create your account in MongoDB [MongoDB](https://www.mongodb.com/).
Follow this [video](https://www.youtube.com/watch?v=bxsemcrY4gQ) to initialize a project and generate your mongodb uri.

Create a `.env` file under `backend` folder. Your file should look like this, replace the connect uri with yours.
```
MONGO_URI=mongodb+srv://admin:xxxxxxxxxx@cluster0.xxxxxxxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=8080
```

### Step 3: Start the server
Run `npm run start` to start the server. By default the website should launch at [localhost:3000](localhost:3000). Head to `{yoursite}/ranking` to check the current ranking.
```
MONGO_URI=mongodb+srv://admin:xxxxxxxxxx@cluster0.xxxxxxxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=8080
```


### Step 4: Changing Phrases & Difficulty (Optional)
Phrases: Head to `/frontend/src/config/phrase.js` to change the phrases for each game. Note that in order to change questions for 3rd, 4th and 5th level, you should also include photos renamed to the phrase in `frontend/src/imgQuestion`.
