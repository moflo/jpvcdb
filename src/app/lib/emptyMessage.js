import firebaseManager from './firebaseManager'

const emptyMessage = values => {

    const empty = {
        id,
        title,
        body,
        priority: 1
    }

    return firebaseManager.sharedInstance.prepareDocForCreate(Object.assign(value, empty))

}

export default emptyMessage
