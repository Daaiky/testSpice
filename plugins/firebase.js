import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'



const db = firebase.firestore()

export {
    firebase,
    db
}
