# Angular Version of the Client-side for IFDb

IFDb is a web app for movie enthusiasts who want to access and save information about their favorite movies.

## Overview

The goal of this project is to build a version of a frontend for the IFDb web app in the Angular, a comprehensive front-end framework with useful built-in features such as routing, dependency injection, two way data binding, fully fledged CLI and more, based on a backend built with Node.js, Express and MongoDB.

You can find the page for the backend of the web app [here](https://github.com/SimeonTu/movie-app).

Documentation is available in ```docs/index.html```

[Link to the live site](https://simeontu.github.io/movie-app-client-angular/)

![IFDb Angular home page](https://i.imgur.com/739nkeo.png)

## Table of Contents

- [Objective](#objective)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Features](#features)

## Objective

Build the client-side for the IFDb web app using Angular. This project complements the existing server-side code mentioned above, providing users with a seamless experience when interacting with the IFDb application. The goal is to create a single-page, responsive app with routing, rich interactions, and multiple interface views that interact with the server-side REST API.

## Tech Stack

- **Frontend**: Angular
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Stack**: MEAN (MongoDB, Express, Angular, Node.js)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/SimeonTu/movie-app-client-angular
   cd movie-app-client-angular
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build using Parcel:

   ```bash
   ng serve
   ```

4. Open your browser and navigate to [http://localhost:4200](http://localhost:4200).

## Deployment

1. Create a new repository on GitHub.

2. Link the new remote repository to the local project folder. To do so, simply run this command from inside your project folder (replace ```<GitHub-username>``` and ```<repository-name>``` with your own GitHub username and repository name): ```git remote add origin https://github.com/<GitHub-username>/<repository-name>.git```

3. Add ```angular-cli-ghpages``` by running ```ng add angular-cli-ghpages```.

4. Build your application by running the following command, replacing ```<repository-name>``` with your own repository name: ```ng deploy --base-href=/<repository-name>/```.
Wait for angular-cli-ghpages to generate the new production code. It will then try to push the code to the gh-pages branch, so it will prompt you to enter your GitHub username and password if you haven't automated the GitHub authentication process before.

5. The application should be published shortly. You may need to wait up to 20 minutes (not always the case—sometimes it gets published instantly). The URL of your application will be ```https://<GitHub-username>.github.io/<repository-name>/```.

6. Whenever you make any changes to your application's code, all you need to do is redo Step 4 to generate a new build and push the new code. Both parts will be done automatically by angular-cli-ghpages once you run the command.

## Features

- Access information about movies
- Filter movies by name
- Create an account and manage a user profile
- Save favorite movies to your profile
- Responsive design for a consistent experience across devices
- Routing for easy navigation between views
