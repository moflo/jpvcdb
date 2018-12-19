import firebaseManager from './firebaseManager'

const createCompany = values => {

  // ReactGA.event({
  //   category: 'Message',
  //   action: 'Create messasge',
  // })

  let id = values.name

  let company = {
    name: values.name,
    batch: values.batch,
    description: values.description,
    category: values.category,
    exit: 0,
    twitter: 0,
    alexa: 343,
    growth: 0,
    founderCount: 1,
    facebook: 0,
    domains: 0,
    logo: "",
    fundingString: "",
    www: values.www,
    address: values.address,
    funding: values.funding,
    status: values.status,
    linkedin: 0,
    ticker: "",
    landingpage: values.landingpage,
    tweets: 0,
    employees: 1,
    hqLocation: "",
    founderBackground: [
    ],
    links: 0
  }

  return firebaseManager.sharedInstance.firestore()
    .collection('companies')
    .add(firebaseManager.sharedInstance.prepareDocForCreate(values))
    .then( () => values)
    .catch( error => {
      alert(`Whoops, couldn't create the post: ${error.message}`)
    })
}

export default createCompany
