const functions = require('firebase-functions')
const { parse } = require('url')
const next = require('next')
const pathMatch = require('path-match')

var dev = process.env.NODE_ENV !== 'production'
var app = next({ dev, conf: { distDir: 'next' } })
var handle = app.getRequestHandler()
const route = pathMatch()
const matchCompany = route('/company/:id')
const matchCohort = route('/cohort/:id')
const matchRanking = route('/ranking/:id')



exports.next = functions.https.onRequest((req, res) => {
  console.log('File: ' + req.originalUrl) // log the page.js file that is being requested
  // return app.prepare().then(() => handle(req, res))
  return app.prepare()
    .then(() => {
      const { pathname, query } = parse(req.url, true)

      const paramsCompany = matchCompany(pathname)
      if (paramsCompany !== false) {
        // assigning `query` into the params means that we still
        // get the query string passed to our application
        // i.e. /blog/foo?show-comments=true
        app.render(req, res, '/company', Object.assign(paramsCompany, query))
        return
      }
      
      const paramsCohort = matchCohort(pathname)
      if (paramsCohort !== false) {
        app.render(req, res, '/cohort', Object.assign(paramsCohort, query))
        return
      }
      
      const paramsRanking = matchRanking(pathname)
      if (paramsRanking !== false) {
        app.render(req, res, '/ranking', Object.assign(paramsRanking, query))
        return
      }
      
      handle(req, res)
    })

})
