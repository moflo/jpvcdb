const admin = require('firebase-admin')
const chalk = require('chalk')

const postData = require("./data/seed-posts.json")

// init firebase
const serviceAccount = require('../credentials/serviceAccountKey.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://jpvcdb.firebaseio.com"
})
const db = require('firebase-admin').firestore()
db.settings({timestampsInSnapshots: true})  // Using Timestamps

// add seed posts
console.log(chalk.blue(`Adding seed post data...`))
postData.map( post => db.collection('posts').add(post) )
console.log(chalk.green(`...added seed posts`))
