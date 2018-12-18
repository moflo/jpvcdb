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


/* Analyze company data to generate a static JSON array cohort data including:
    - cohort investment count
    - cohort status: # exited, live or dead
    - cohort funding tranch: # mega, mini, seed and no round 
*/

console.log(chalk.blue(`Generating analytics data...`))

db.collection('companies').get()
  .then(snap => {
    return generateAnalyticsJSON( snap.docs )
  })
  .then( () => {
    console.log(chalk.green(`✅ done!`))
  })
  .catch(error => {
    console.log(chalk.red(`⚠️ error: `), error)
  })


const generateAnalyticsJSON = docs => {
    console.log(`  analyzing company data ${docs.length}...`)

    // Testing...
    // let data = [{"id":"10-by-10","address":"","alexa":1988722,"batch":"S17","category":"Other SaaS","createdAt":{"seconds":1544759392,"nanoseconds":412000000},"description":"10 By 10","domains":0,"employees":1,"exit":0,"facebook":0,"founderBackground":[],"founderCount":1,"funding":0.1,"fundingString":"$0.1m","growth":0,"hqLocation":"","landingpage":"","linkedin":0,"links":0,"logo":"","name":"10 By 10","status":"Live","ticker":"","tweets":0,"twitter":0,"www":"http://www.10by10.io"},{"id":"1000memories","address":"","alexa":1082,"batch":"S10","category":"Consumer","createdAt":{"seconds":1544759392,"nanoseconds":418000000},"description":"1000Memories","domains":0,"employees":1,"exit":0,"facebook":0,"founderBackground":[],"founderCount":1,"funding":333.2,"fundingString":"$333.2m","growth":0,"hqLocation":"","landingpage":"","linkedin":0,"links":0,"logo":"1,342","name":"1000Memories","status":"Exited","ticker":"","tweets":0,"twitter":0,"www":"http://www.ancestry.com"},{"id":"280-north","address":"","alexa":0,"batch":"W08","category":"Dev Tools","createdAt":{"seconds":1544759392,"nanoseconds":419000000},"description":"280 North","domains":0,"employees":1,"exit":0,"facebook":0,"founderBackground":[],"founderCount":1,"funding":0.3,"fundingString":"$0.3m","growth":0,"hqLocation":"","landingpage":"","linkedin":0,"links":0,"logo":"","name":"280 North","status":"Exited","ticker":"","tweets":0,"twitter":0,"www":"http://www.280north.com"},{"id":"42","address":"","alexa":2715414,"batch":"W14","category":"Other SaaS","createdAt":{"seconds":1544759392,"nanoseconds":420000000},"description":"42","domains":0,"employees":1,"exit":0,"facebook":0,"founderBackground":[],"founderCount":1,"funding":0,"fundingString":"$0.0m","growth":0,"hqLocation":"","landingpage":"","linkedin":0,"links":0,"logo":"10","name":"42","status":"Live","ticker":"","tweets":0,"twitter":0,"www":"http://www.42technologies.com"},{"id":"42floors","address":"","alexa":151193,"batch":"W12","category":"Real Estate","createdAt":{"seconds":1544759392,"nanoseconds":954000000},"description":"42Floors","domains":0,"employees":1,"exit":0,"facebook":0,"founderBackground":[],"founderCount":1,"funding":17.4,"fundingString":"$17.4m","growth":0,"hqLocation":"","landingpage":"","linkedin":0,"links":0,"logo":"40","name":"42Floors","status":"Exited","ticker":"","tweets":0,"twitter":0,"www":"http://www.42floors.com"},{"id":"500friends","address":"","alexa":761677,"batch":"W10","category":"Other SaaS","createdAt":{"seconds":1544759392,"nanoseconds":955000000},"description":"500Friends","domains":0,"employees":1,"exit":0,"facebook":0,"founderBackground":[],"founderCount":1,"funding":12.9,"fundingString":"$12.9m","growth":0,"hqLocation":"","landingpage":"","linkedin":0,"links":0,"logo":"6,800","name":"500Friends","status":"Exited","ticker":"","tweets":0,"twitter":0,"www":"http://www.500friends.com"},{"id":"70millionjobs","address":"","alexa":1100618,"batch":"S17","category":"Other SaaS","createdAt":{"seconds":1544759392,"nanoseconds":956000000},"description":"70MillionJobs","domains":0,"employees":1,"exit":0,"facebook":0,"founderBackground":[],"founderCount":1,"funding":1.6,"fundingString":"$1.6m","growth":0,"hqLocation":"","landingpage":"","linkedin":0,"links":0,"logo":"","name":"70MillionJobs","status":"Live","ticker":"","tweets":0,"twitter":0,"www":"http://www.70millionjobs.com"},{"id":"7cups","address":"","alexa":44582,"batch":"S13","category":"Healthcare","createdAt":{"seconds":1544759392,"nanoseconds":957000000},"description":"7cups","domains":0,"employees":1,"exit":0,"facebook":0,"founderBackground":[],"founderCount":1,"funding":0,"fundingString":"$0.0m","growth":0,"hqLocation":"","landingpage":"","linkedin":0,"links":0,"logo":"190","name":"7cups","status":"Live","ticker":"","tweets":0,"twitter":0,"www":"http://www.7cups.com"},{"id":"80000-hours","address":"","alexa":64762,"batch":"S15","category":"Nonprofit","createdAt":{"seconds":1544759393,"nanoseconds":474000000},"description":"80,000 Hours","domains":0,"employees":1,"exit":0,"facebook":0,"founderBackground":[],"founderCount":1,"funding":0.1,"fundingString":"$0.1m","growth":0,"hqLocation":"","landingpage":"","linkedin":0,"links":0,"logo":"15","name":"80,000 Hours","status":"Live","ticker":"","tweets":0,"twitter":0,"www":"http://www.80000hours.org"},{"id":"9gag","address":"","alexa":377,"batch":"S12","category":"Entertainment","createdAt":{"seconds":1544759393,"nanoseconds":475000000},"description":"9gag","domains":0,"employees":1,"exit":0,"facebook":0,"founderBackground":[],"founderCount":1,"funding":2.9,"fundingString":"$2.9m","growth":0,"hqLocation":"","landingpage":"","linkedin":0,"links":0,"logo":"140","name":"9gag","status":"Live","ticker":"","tweets":0,"twitter":0,"www":"http://www.9gag.com"}]
    // let batches = data.map( co => co.batch )

    let data = docs.map( doc => doc.data() )

    let batches = data.map( co => co.batch )

    let sortedBatches = [ ...new Set(batches)].sort((a,b) => parseInt(a.replace(/[ws]/i,'')) - parseInt(b.replace(/[ws]/i,'')))

    const totalFunding = (d, b) => d.filter( co => co.batch == b).reduce( (funding,co) => funding + co.funding, 0)

    var sortedFunding = sortedBatches.map( batch => totalFunding(data, batch) )

    const totalCompanies = (d, b) => d.filter( co => co.batch == b).length

    var sortedCount = sortedBatches.map( batch => totalCompanies(data, batch) )

    const totalStatus = (d,b,s) => d.filter( co => co.batch == b && co.status == s).length

    var sortedLive = sortedBatches.map( batch => totalStatus(data, batch, 'Live') )
    var sortedExited = sortedBatches.map( batch => totalStatus(data, batch, 'Exited') )
    var sortedDead = sortedBatches.map( batch => totalStatus(data, batch, 'Dead') )

    const totalLevel = (d,b,min,max) => d.filter( co => co.batch == b && co.funding > min && co.funding <= max).length

    var sortedMega = sortedBatches.map( batch => totalLevel(data, batch, 10.0, 99999999.0) )
    var sortedMini = sortedBatches.map( batch => totalLevel(data, batch, 5.0, 10.0) )
    var sortedSeed = sortedBatches.map( batch => totalLevel(data, batch, 0.0, 5.0) )
    var sortedNone = sortedBatches.map( batch => totalLevel(data, batch, -1.0, 0.0) )

    // Calcluate batch data

    var batchData = []

    let maxBatchCount = Math.max(...sortedCount)    // batch match

    for (var [i,b] of sortedBatches.entries()) {
        // console.log(`i: ${i} = ${b}, ${sortedCount[i]}`)
        let percent = ( maxBatchCount != 0 ? sortedCount[i] / maxBatchCount : 1.0 ) * 100.0

        let live = sortedLive[i]
        let dead = sortedDead[i]
        let exited = sortedExited[i]

        let mega = sortedMega[i]
        let mini = sortedMini[i]
        let seed = sortedSeed[i]
        let none = sortedNone[i]

        var dataObj = {batch: b, count: sortedCount[i], percent, exited, live, dead, mega, mini, seed, none}
        batchData.push(dataObj)
    }

    console.log(JSON.stringify(batchData))

    return batchData
}