import {
  type DocumentSnapshot,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  updateDoc,
  collection,
  type QuerySnapshot,
  type DocumentData,
  orderBy,
  query,
  deleteDoc
} from 'firebase/firestore'
import { app } from '../context/firebase.context'

const db = getFirestore(app)

export const updateData = async (id: string, path: string, data: any, uid: string) => {
  const documentRef = doc(db, `User/${id}/${path}`, uid)
  await updateDoc(documentRef, data)
}

export const getData = async (id: string, uid: string, path: string) => {
  const documentRef = doc(db, `User/${id}/${path}`, uid)
  const docSnap = await getDoc(documentRef)
  return docSnap
}

export const getDataCalback = (id: string, uid: string, path: string, fun: (document: DocumentSnapshot) => void) => {
  const documentRef = doc(db, `User/${id}/${path}`, uid)
  onSnapshot(documentRef, fun)
}

export const getCollectionCallback = (id: string, path: string, fun: (document: QuerySnapshot<DocumentData>) => void) => {
  const documentRef = collection(db, `User/${id}/${path}`)
  onSnapshot(documentRef, fun)
}

export const getCollectionCallbackOrderDate = (id: string, path: string, fun: (document: QuerySnapshot<DocumentData>) => void) => {
  const documentRef = collection(db, `User/${id}/${path}`)
  const q = query(documentRef, orderBy('date', 'desc'))
  onSnapshot(q, fun)
}

export const deleteData = async (id: string, uid: string, path: string) => {
  const documentRef = doc(db, `User/${id}/${path}`, uid)
  await deleteDoc(documentRef)
}
