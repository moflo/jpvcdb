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

  let fundingString = doc.data().fundingString || "0.0"
  let fundingClean = fundingString.replace(/\$|,|m/gi, '')
  let fundingFloat = parseFloat(fundingClean)
  let funding = Number(fundingFloat)


  // console.log(`   ${fundingString} -> ${funding}}`)

  return db.collection('companies')
    .doc(doc.id)
    .update({
      funding
    })
}
