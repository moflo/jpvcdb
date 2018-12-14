const admin = require('firebase-admin')
const Promise = require('bluebird')
const chalk = require('chalk')

// init firebase
const serviceAccount = require('../credentials/serviceAccountKey.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://jpvcdb.firebaseio.com"
})
const db = require('firebase-admin').firestore()
db.settings({timestampsInSnapshots: true})  // Using Timestamps

console.log(chalk.blue(`Making all company funding numerical...`))

// if you're collection is big, you might want to paginate the query
// so you don't download the entire thing at once:
// https://firebase.google.com/docs/firestore/query-data/query-cursors
// TODO - show an example?
db.collection('companies').get()
  .then(snap => {
    // Bluebird Promises lets you limit promises running at once:
    // http://bluebirdjs.com/docs/api/promise.map.html
    return Promise.map(snap.docs, updateCompany, {concurrency: 5})
  })
  .then( () => {
    console.log(chalk.green(`✅ done!`))
  })
  .catch(error => {
    console.log(chalk.red(`⚠️ migration error: `), error)
  })

const updateCompany = doc => {
  console.log(`  migrating company ${doc.id}...`)

  let old_alexa = doc.data().alexa
  var alexa = 0

  if (typeof old_alexa === 'string' ) {
    let alexaString = doc.data().alexa || "0"
    let alexaClean = alexaString.replace(/\$|,|m/gi, '')
    let alexaInt = parseInt(alexaClean)
    alexa = Number(alexaInt)
  }
  else {
    alexa = old_alexa
  }


//   console.log(`   ${old_alexa} -> ${alexa}`)

  return db.collection('companies')
    .doc(doc.id)
    .update({
        alexa
    })
}
