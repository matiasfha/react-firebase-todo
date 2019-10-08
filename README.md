## TODO
This is a firebase project and firebase/firestore doesn't implement full text search so its not
possible to filter the todo objects by the descrption field (at least not by querying the data). To
do this algolia can be implemented. So the TODO for the project is to implement algolia usage to
perform the full text search on the description field to allow the user to filter the list by
description text.


## Installation 
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The project is a simple TODO app that allow to add a description and optional attachment to it.

The data is stored in firebase/firestore, and by default is using an already deployed functions.

First clone this repository and then just run it by:

````````bash
$ yarn install
$ cd functions
$ npm i
$ cd ..
```

# Associate With A Firebase Project

This is required to enable deployment but is not required for local development.

```bash
$ firebase use --add
```

# Local Development
```bash
$ yarn serve
```

This will run the functions in local mode

You should see a message in terminal containing the functions url, something like [http://localhost:5001/todo--f2063/us-central1/app](http://localhost:5001/todo--f2063/us-central1/app).

Copy this URL and paste it into the `package.json` file in the root under `proxy` (not the `package.json` file in the `functions` directory):

```json
"proxy": "http://localhost:5001/todo--f2063/us-central1/app"
```

## React

In a separate terminal window, run the following (we should now have two processes running concurrently):

```bash
$ yarn start
```

# Deployment

`$ npm run build`
`$ firebase deploy`

**Note:** This will deploy both the functions and the hosting components and is the same as `firebase deploy --only functions,hosting`

You should see a message in terminal containing the Firebase url, something like: [https://todo--f2063.firebaseapp.com/](https://todo--f2063.firebaseapp.com/)

Open a browser and navigate to [https://todo--f2063.firebaseapp.com/](https://todo--f2063.firebaseapp.com/) where you should see your React app running again.
