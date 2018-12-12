import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import clientCredentials from '../credentials/client'


export default class firebaseManager {
    static sharedInstance = firebaseManager.sharedInstance == null ? new firebaseManager() : this.sharedInstance

    firebase() {
        if (!firebase.apps.length) firebase.initializeApp(clientCredentials)

        return firebase
    }

    firestore() {
        if (!firebase.apps.length) firebase.initializeApp(clientCredentials)

        var db = firebase.firestore()
        db.settings({timestampsInSnapshots: true})  // Using Timestamps

        return db
    }

    handleLogin = event => {
        return new Promise((resolve, reject) => {
            if (!firebase.apps.length) firebase.initializeApp(clientCredentials)

            firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())

            var unsubscribe = firebase.auth().onAuthStateChanged(user => {
                if (user) {

                    resolve(user)
                    
                } else {

                    resolve()
                }

                if (!unsubscribe) unsubscribe()
            })

        })
    }
    
    isLoggedIn() {
        if (!firebase.apps.length) firebase.initializeApp(clientCredentials)

        let user = firebase.auth().currentUser

        return (user != null)
    }

    getUserDetails() {
        if (!firebase.apps.length) firebase.initializeApp(clientCredentials)

        let user = firebase.auth().currentUser || {}

        let userObj = {
            name: user.displayName || "MoFlo User",
            avatarURL: user.photoURL || "https://fillmurray.com/64/64",
            email: user.email || "demo@moflo.me"
        }

        return userObj
    }

    prepareDocForCreate = doc => {
        if (!firebase.apps.length) firebase.initializeApp(clientCredentials)

        // timestamps
        doc.createdBy = firebase.auth().currentUser ? firebase.auth().currentUser.uid : null
        doc.createdAt = firebase.firestore.Timestamp.now()

        return doc
    }

    prepareDocForUpdate = doc => {
        if (!firebase.apps.length) firebase.initializeApp(clientCredentials)

        // timestamps
        doc.updatedBy = firebase.auth().currentUser ? firebase.auth().currentUser.uid : null
        doc.updatedAt = firebase.firestore.Timestamp.now()

        // don't save the id as part of the document
        delete doc.id

        // don't save values that start with an underscore (these are calculated by the backend)
        Object.keys(doc).forEach( key => {
            if (key.indexOf('_') === 0) {
            delete doc[key]
            }
        })

        return doc
    }

}