import { getAuth, signOut, getIdToken, signInWithEmailAndPassword, browserSessionPersistence } from 'firebase/auth'
import { app } from '../context/firebase.context'

export const auth = getAuth(app)

void auth.setPersistence(browserSessionPersistence)

export const logIn = async (email: string, password: string) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password)
  return user
}

export const logOut = async () => {
  await signOut(auth)
}

export const getToken = async (): Promise<string> => {
  if (auth.currentUser === null) {
    throw new Error('User not logged in')
  }
  const token = await getIdToken(auth.currentUser)
  return token
}
export const getUser = () => {
  if (auth.currentUser === null) {
    throw new Error('User not logged in')
  }
  return auth.currentUser
}
