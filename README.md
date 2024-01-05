# HarmonySync

Introduction
HarmonySync is a web application designed to enhance your workout experience by providing you with a custom playlist that matches the BPM (beats per minute) of your chosen song. This ensures that you can maintain your workout intensity in sync with the rhythm of the music.

Features
BPM Analysis: Analyze the BPM of the selected song.
Playlist Generation: Generate a playlist with songs of a similar BPM.
Playlist Save: Saves it into your spotify account

Getting Started
Prerequisites
Before you begin, ensure you have the following installed:

Node.js
A modern web browser.
Installation
To set up the Spotify Workout BPM App on your local machine, follow these steps:

Clone the repository to your local machine:

Copy code
git clone https://github.com/SHIN0003/HarmonySync
Navigate to the project directory:

cd HarmonySync

Install the required dependencies:


npm install

Start the application:

npm start

Spotify API Setup
To use the Spotify API, you need to set up an application on the Spotify Developer Dashboard and obtain your client credentials. Here's how to do it:

Log in to the Spotify Developer Dashboard.
Create a new application and note down your Client ID and Client Secret.
Add http://localhost:3001/callback to your app's Redirect URIs in the dashboard.
Update the .env file in your project with your Spotify Client ID and Client Secret.


Usage
Once the app is running, access it by navigating to http://localhost:3000 in your web browser. 

How to Contribute
We welcome contributions! If you have suggestions or issues, please feel free to open an issue or create a pull request.

License
MIT





