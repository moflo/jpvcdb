const admin = require('firebase-admin')
const chalk = require('chalk')
var Airtable = require('airtable');


// init firebase
const serviceAccount = require('../credentials/serviceAccountKey.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://jpvcdb.firebaseio.com"
})
const db = require('firebase-admin').firestore()
db.settings({timestampsInSnapshots: true})  // Using Timestamps

const airTableAccount = require('../credentials/airTableKey.json')
var base = new Airtable({apiKey: airTableAccount.apiKey}).base(airTableAccount.appKey);

// add seed posts
console.log(chalk.blue(`Adding seed post data...`))

base('Table 2').select({
    // Selecting the first 3 records in Grid view:
    // maxRecords: 3,
    pageSize: 10,
    view: "Grid view",
    cellFormat: 'json'
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
        console.log(chalk.cyan('Retrieved', record.get('Name')));
        db.collection('airtable').add(record._rawJson.fields)
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(chalk.red(err)); return; }
    console.log(chalk.green(`...added seed posts`))
});

