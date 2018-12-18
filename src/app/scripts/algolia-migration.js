const admin = require('firebase-admin')
const Promise = require('bluebird')
const chalk = require('chalk')
const Algolia = require('algoliasearch')


// init firebase
const serviceAccount = require('../credentials/serviceAccountKey.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://jpvcdb.firebaseio.com"
})
const db = require('firebase-admin').firestore()
db.settings({timestampsInSnapshots: true})  // Using Timestamps

// Init Algolia 
const algoliaAccount = require('../credentials/algoliaAccountKey.json')
let algolia = Algolia(algoliaAccount.app_id, algoliaAccount.admin_key)
let companiesIndex = algolia.initIndex('companies')

console.log(chalk.blue(`Uploading firebase companies data to algolia search...`))

var cursor = null

const paginateCompany = start => {
  start.get()
  // db.collection('airtable').limit(3).get()
  .then(snap => {

    cursor = snap

    // Bluebird Promises lets you limit promises running at once:
    // http://bluebirdjs.com/docs/api/promise.map.html
    return Promise.map(snap.docs, updateCompany, {concurrency: 4})
  })
  .then( () => {

    if (cursor == null || cursor.docs.length === 0) {
      console.log(chalk.green(`✅ done!`))
      return
    }

    var lastVisible = cursor.docs[cursor.docs.length-1];

    var next = db.collection("companies").orderBy("name").startAfter(lastVisible).limit(4);

    paginateCompany(next)

  })
  .catch(error => {
    console.log(chalk.red(`⚠️ migration error: `), error)
})
}

const updateCompany = docObj => {

    const doc = docObj.data()
    

    const algolia = {
        objectID: doc.id,
        name: doc.name,
        description: doc.description,
        alexa: doc.alexa,
        funding: doc.funding,
        logo: doc.logo,
        status: doc.status,
        exit: doc.exit,
        ticker: doc.ticker,
        address: doc.address
    }

    console.log(`  migrating company ${doc.id}...`)

    return companiesIndex.saveObject(algolia)

}


// Use cursors to paginate over db
// https://firebase.google.com/docs/firestore/query-data/query-cursors

var first = db.collection("companies").orderBy("name").limit(4);

paginateCompany(first);

console.log(chalk.blue(` ...iterating`))
