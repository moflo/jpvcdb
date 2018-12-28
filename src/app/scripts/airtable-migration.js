const admin = require('firebase-admin')
const Promise = require('bluebird')
const chalk = require('chalk')
const slugify = require('slugify')

// init firebase
const serviceAccount = require('../credentials/serviceAccountKey.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://jpvcdb.firebaseio.com"
})
const db = require('firebase-admin').firestore()
db.settings({timestampsInSnapshots: true})  // Using Timestamps

console.log(chalk.blue(`Migrating airtable data to companies collection...`))

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

    var next = db.collection("airtable").orderBy("Name").startAfter(lastVisible).limit(4);

    paginateCompany(next)

  })
  .catch(error => {
    console.log(chalk.red(`⚠️ migration error: `), error)
})
}

const updateCompany = docObj => {

    const doc = docObj.data()
    
    const id = slugify(doc.Name, {lower: true})

    const createdAt = admin.firestore.Timestamp.now()

    const company = {
        id,
        name: doc.Name || "",
        description: doc.description || doc.Name || "",
        www: doc.YCDBUrl || "",
        landingpage: doc.landingPage || "",
        alexa: doc.alexa || "",
        batch: doc.batch || "",
        category: doc.category || "",
        funding: doc.funding || "",
        fundingString: doc.funding || "",
        logo: doc.logo || "",
        status: doc.status || "",
        exit: 0,
        twitter: 0,
        tweets: 0,
        facebook: 0,
        employees: 1,
        growth: 0,
        domains: 0,
        links: 0,
        linkedin: 0,
        ticker: "",
        address: "",
        hqLocation: "",
        coordinates: {
          lng: 139.7454,
          lat: 35.6586
        },
          founderCount: 1,
        founderBackground: [],

        createdAt
    }

  console.log(`  migrating company ${company.id}...`)

  return db.collection('companies')
    .doc(company.id)
    .set(company)
}


// Use cursors to paginate over db
// https://firebase.google.com/docs/firestore/query-data/query-cursors

var first = db.collection("airtable").orderBy("Name").limit(4);

paginateCompany(first);

console.log(chalk.blue(` ...iterating`))
