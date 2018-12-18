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


/* Analyze company data to generate a static JSON array ranking data including:
    - company ranking of funding vs. all companies & peers
*/

console.log(chalk.blue(`Generating company ranking data...`))

/*
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
*/

const generateAnalyticsJSON = docs => {
    console.log(`  analyzing company data ${docs.length}...`)

    // Testing...
    let data = [{"id":"10-by-10","address":"","alexa":1988722,"batch":"S17","category":"Other SaaS","createdAt":{"seconds":1544759392,"nanoseconds":412000000},"description":"10 By 10","domains":0,"employees":1,"exit":0,"facebook":0,"founderBackground":[],"founderCount":1,"funding":0.1,"fundingString":"$0.1m","growth":0,"hqLocation":"","landingpage":"","linkedin":0,"links":0,"logo":"","name":"10 By 10","status":"Live","ticker":"","tweets":0,"twitter":0,"www":"http://www.10by10.io"},{"id":"1000memories","address":"","alexa":1082,"batch":"S10","category":"Consumer","createdAt":{"seconds":1544759392,"nanoseconds":418000000},"description":"1000Memories","domains":0,"employees":1,"exit":0,"facebook":0,"founderBackground":[],"founderCount":1,"funding":333.2,"fundingString":"$333.2m","growth":0,"hqLocation":"","landingpage":"","linkedin":0,"links":0,"logo":"1,342","name":"1000Memories","status":"Exited","ticker":"","tweets":0,"twitter":0,"www":"http://www.ancestry.com"},{"id":"280-north","address":"","alexa":0,"batch":"W08","category":"Dev Tools","createdAt":{"seconds":1544759392,"nanoseconds":419000000},"description":"280 North","domains":0,"employees":1,"exit":0,"facebook":0,"founderBackground":[],"founderCount":1,"funding":0.3,"fundingString":"$0.3m","growth":0,"hqLocation":"","landingpage":"","linkedin":0,"links":0,"logo":"","name":"280 North","status":"Exited","ticker":"","tweets":0,"twitter":0,"www":"http://www.280north.com"},{"id":"42","address":"","alexa":2715414,"batch":"W14","category":"Other SaaS","createdAt":{"seconds":1544759392,"nanoseconds":420000000},"description":"42","domains":0,"employees":1,"exit":0,"facebook":0,"founderBackground":[],"founderCount":1,"funding":0,"fundingString":"$0.0m","growth":0,"hqLocation":"","landingpage":"","linkedin":0,"links":0,"logo":"10","name":"42","status":"Live","ticker":"","tweets":0,"twitter":0,"www":"http://www.42technologies.com"},{"id":"42floors","address":"","alexa":151193,"batch":"W12","category":"Real Estate","createdAt":{"seconds":1544759392,"nanoseconds":954000000},"description":"42Floors","domains":0,"employees":1,"exit":0,"facebook":0,"founderBackground":[],"founderCount":1,"funding":17.4,"fundingString":"$17.4m","growth":0,"hqLocation":"","landingpage":"","linkedin":0,"links":0,"logo":"40","name":"42Floors","status":"Exited","ticker":"","tweets":0,"twitter":0,"www":"http://www.42floors.com"},{"id":"500friends","address":"","alexa":761677,"batch":"W10","category":"Other SaaS","createdAt":{"seconds":1544759392,"nanoseconds":955000000},"description":"500Friends","domains":0,"employees":1,"exit":0,"facebook":0,"founderBackground":[],"founderCount":1,"funding":12.9,"fundingString":"$12.9m","growth":0,"hqLocation":"","landingpage":"","linkedin":0,"links":0,"logo":"6,800","name":"500Friends","status":"Exited","ticker":"","tweets":0,"twitter":0,"www":"http://www.500friends.com"},{"id":"70millionjobs","address":"","alexa":1100618,"batch":"S17","category":"Other SaaS","createdAt":{"seconds":1544759392,"nanoseconds":956000000},"description":"70MillionJobs","domains":0,"employees":1,"exit":0,"facebook":0,"founderBackground":[],"founderCount":1,"funding":1.6,"fundingString":"$1.6m","growth":0,"hqLocation":"","landingpage":"","linkedin":0,"links":0,"logo":"","name":"70MillionJobs","status":"Live","ticker":"","tweets":0,"twitter":0,"www":"http://www.70millionjobs.com"},{"id":"7cups","address":"","alexa":44582,"batch":"S13","category":"Healthcare","createdAt":{"seconds":1544759392,"nanoseconds":957000000},"description":"7cups","domains":0,"employees":1,"exit":0,"facebook":0,"founderBackground":[],"founderCount":1,"funding":0,"fundingString":"$0.0m","growth":0,"hqLocation":"","landingpage":"","linkedin":0,"links":0,"logo":"190","name":"7cups","status":"Live","ticker":"","tweets":0,"twitter":0,"www":"http://www.7cups.com"},{"id":"80000-hours","address":"","alexa":64762,"batch":"S15","category":"Nonprofit","createdAt":{"seconds":1544759393,"nanoseconds":474000000},"description":"80,000 Hours","domains":0,"employees":1,"exit":0,"facebook":0,"founderBackground":[],"founderCount":1,"funding":0.1,"fundingString":"$0.1m","growth":0,"hqLocation":"","landingpage":"","linkedin":0,"links":0,"logo":"15","name":"80,000 Hours","status":"Live","ticker":"","tweets":0,"twitter":0,"www":"http://www.80000hours.org"},{"id":"9gag","address":"","alexa":377,"batch":"S12","category":"Entertainment","createdAt":{"seconds":1544759393,"nanoseconds":475000000},"description":"9gag","domains":0,"employees":1,"exit":0,"facebook":0,"founderBackground":[],"founderCount":1,"funding":2.9,"fundingString":"$2.9m","growth":0,"hqLocation":"","landingpage":"","linkedin":0,"links":0,"logo":"140","name":"9gag","status":"Live","ticker":"","tweets":0,"twitter":0,"www":"http://www.9gag.com"}]

    // let data = docs.map( doc => doc.data() )

    const maxFunding = (d) => d.reduce( (funding,co) => co.funding > funding ? co.funding : funding, 0)
    const maxFundingCat = (d, c) => d.filter( co => co.category == c).reduce( (funding,co) => co.funding > funding ? co.funding : funding, 0)

    const minAlexa = (d) => d.reduce( (alexa,co) => co.alexa < alexa ? co.alexa : alexa, 0)
    const minAlexaCat = (d, c) => d.filter( co => co.category == c).reduce( (alexa,co) => co.alexa < alexa ? co.alexa : alexa, 0)

    const maxTwitter = (d) => d.reduce( (twitter,co) => co.twitter > twitter ? co.twitter : twitter, 0)
    const maxTwitterCat = (d, c) => d.filter( co => co.category == c).reduce( (twitter,co) => co.twitter > twitter ? co.twitter : twitter, 0)

    const maxEmployee = (d) => d.reduce( (employees,co) => co.employees > employees ? co.employees : employees, 0)
    const maxEmployeeCat = (d, c) => d.filter( co => co.category == c).reduce( (employees,co) => co.employees > employees ? co.employees : employees, 0)

    const maxGrowth = (d) => d.reduce( (growth,co) => co.growth > growth ? co.growth : growth, 0)
    const maxGrowthCat = (d, c) => d.filter( co => co.category == c).reduce( (growth,co) => co.growth > growth ? co.growth : growth, 0)

    // Calcluate company data

    var companyData = []

    let max_funding = maxFunding(data)
    let min_alexa = minAlexa(data)
    let max_twitter = maxTwitter(data)
    let max_employee = maxEmployee(data)
    let max_growth = maxGrowth(data)

    for (var [i,co] of data.entries()) {
        console.log(`i: ${i} = ${co.name}`)

        let id = co.id
        let category = co.category
    
        let max_funding_cat = maxFundingCat(data,category)
        let min_alexa_cat = minAlexaCat(data,category)
        let max_twitter_cat = maxTwitterCat(data,category)
        let max_employee_cat = maxEmployeeCat(data,category)
        let max_growth_cat = maxGrowthCat(data,category)

        let funding = ( max_funding != 0 ? co.funding / max_funding : 1.0 ) * 100.0
        let fundingCat = ( max_funding_cat != 0 ? co.funding / max_funding_cat : 1.0 ) * 100.0

        let alexa = ( min_alexa != 0 ? co.alexa / min_alexa : 1.0 ) * 100.0
        let alexaCat = ( min_alexa_cat != 0 ? co.alexa / min_alexa_cat : 1.0 ) * 100.0

        let twitter = ( max_twitter != 0 ? co.twitter / max_twitter : 1.0 ) * 100.0
        let twitterCat = ( max_twitter_cat != 0 ? co.twitter / max_twitter_cat : 1.0 ) * 100.0

        let employees = ( max_employee != 0 ? co.employees / max_employee : 1.0 ) * 100.0
        let employeesCat = ( max_employee_cat != 0 ? co.employees / max_employee_cat : 1.0 ) * 100.0

        let growth = ( max_growth != 0 ? co.growth / max_growth : 1.0 ) * 100.0
        let growthCat = ( max_growth_cat != 0 ? co.growth / max_growth_cat : 1.0 ) * 100.0

        var dataObj = {id, category, performance: {funding, fundingCat, alexa, alexaCat, twitter, twitterCat, employees, employeesCat, growth, growthCat}}
        companyData.push(dataObj)
    }

    console.log(JSON.stringify(companyData))

    return companyData
}

// Tesing
generateAnalyticsJSON(["test"])