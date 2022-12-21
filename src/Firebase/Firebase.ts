import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getDatabase , child, push, get, ref} from "firebase/database";
import {
  getFirestore,
  query,
  getDocs,
  setDoc,
  collection,
  where,
  addDoc,
  doc,
  getDoc,
  DocumentData,
  deleteDoc,
} from "firebase/firestore";
import { firebaseConfig } from "./Config";
import { OfferModal, OfferRecord } from "../components/mainInterfaceComponents/Schemas/Offer";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
//firestore
const db = getFirestore(app);
//realtime
const database = getDatabase();
const googleProvider = new GoogleAuthProvider();
//database reference
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        picture : user.photoURL,
        telephone : ""
      });
    }
  } catch (err : unknown) {
    console.error(err);
  }
};
const logout = () => {
  signOut(auth);
};

const getUserProfile =async (uid:string) => {
  if(!auth.currentUser) return;
  const q = query(collection(db, 'users'), where("uid", "==", uid))
  const snap = await getDocs(q)
  if(snap.size !== 1) return;
  return snap.docs[0].data();
}

const updateUsername =async (uid : string, newName:string) => {
  if(!auth.currentUser || auth.currentUser.uid != uid) return;
  updateProfile(auth.currentUser, {displayName : newName});
  const q = query(collection(db, 'users'), where("uid", "==", uid))
  const snap = await getDocs(q)
  if(snap.size === 0) return;
  const userDoc = snap.docs[0].ref
  setDoc(userDoc, {name : newName} , {merge : true})

}
const updatePhoneNumber =async (uid : string, newPhoneNumber:string) => {
  if(!auth.currentUser || auth.currentUser.uid != uid) return;
  const q = query(collection(db, 'users'), where("uid", "==", uid))
  const snap = await getDocs(q)
  if(snap.size === 0) return;
  const userDoc = snap.docs[0].ref
  setDoc(userDoc, {telephone : newPhoneNumber} , {merge : true})

}

const addNewOffer = async(offer : OfferRecord) => {
  const newOfferRef = doc(collection(db, 'Offres'));
  const docData = {
    car : offer.car,
    start : offer.start,
    finish : offer.finish,
    spots : offer.spots,
    uid : offer.uid,
    isExpired : offer.isExpired,
    date : offer.date
  }
  await setDoc(newOfferRef, docData);
}
const getAllOffers = async() => {
  const q = query(collection(db, 'Offres'), where('isExpired', "==", false));
  const querySnap = await getDocs(q);
  const tempArray = Array<OfferModal>();
  for(let i=0; i < querySnap.size; i++){
    const doc = querySnap.docs[i];
    const record = doc.data()
    const user = await getUsernameAndPicture(record.uid);
    tempArray.push({
      username : user.username,
      img : user.picture,
      offerId : doc.id,
      car : record.car,
      date : (record.date.toDate()).toLocaleString(),
      finish: record.finish,
      isExpired : record.isExpired,
      spots : record.spots,
      start: record.start});
  }
  return tempArray;
}
interface userNutshell {
  username : string,
  picture : string
}
const getUsernameAndPicture = async(uid : string):Promise<userNutshell> =>  {
  const q = query(collection(db, 'users'), where("uid", "==", uid));
  const querySnap = await getDocs(q);
  const res = {username : 'Invalid', picture : 'Invalid'};
  if(querySnap.docs.length === 1){
    querySnap.forEach((doc) => {
      res.username = doc.data().name;
      res.picture = doc.data().picture;
    });
  }
  return res;
}

const bookOffer = async(uid : string, offerId: string)=>{
  const newReservationRef = doc(collection(db, 'Reservations'));
  const docData = {
    uid : uid,
    offerId : offerId,
  }
  await setDoc(newReservationRef, docData);
}
const getOfferById = async (offerId : string) => {
  const docRef = doc(db, 'Offres/' + offerId)
  const querySnap = await getDoc(docRef);
  return  querySnap.data();
}

const getOffersByUser = async (uid :string ) =>{
  const q = query(collection(db, 'Offres'), where("uid", '==' , uid), where('isExpired', "==", false));
  const tempArray =Array<OfferModal>();
  const querySnap = await getDocs(q);
  for(let i=0; i < querySnap.size; i++){
    const doc = querySnap.docs[i];
    const record = doc.data()
    const user = await getUsernameAndPicture(record.uid);
    tempArray.push({
      username : user.username,
      img : user.picture,
      offerId : doc.id,
      car : record.car,
      date : (record.date.toDate()).toLocaleString(),
      finish: record.finish,
      isExpired : record.isExpired,
      spots : record.spots,
      start: record.start});
  }
  return tempArray;
}
const getOffersByVille = async (ville :string ) =>{
  const q = query(collection(db, 'Offres'), where("start", '==' , ville), where('isExpired', "==", false));
  const tempArray =Array<OfferModal>();
  const querySnap = await getDocs(q);
  for(let i=0; i < querySnap.size; i++){
    const doc = querySnap.docs[i];
    const record = doc.data()
    const user = await getUsernameAndPicture(record.uid);
    tempArray.push({
      username : user.username,
      img : user.picture,
      offerId : doc.id,
      car : record.car,
      date : (record.date.toDate()).toLocaleString(),
      finish: record.finish,
      isExpired : record.isExpired,
      spots : record.spots,
      start: record.start});
  }
  return tempArray;
}
const searchOffer = async (start :string, finish : string ) =>{
  const q = query(collection(db, 'Offres'), where("start", '==' , start), where("finish", "==" , finish));
  const tempArray =Array<OfferModal>();
  const querySnap = await getDocs(q);
  for(let i=0; i < querySnap.size; i++){
    const doc = querySnap.docs[i];
    const record = doc.data()
    const user = await getUsernameAndPicture(record.uid);
    tempArray.push({
      username : user.username,
      img : user.picture,
      offerId : doc.id,
      car : record.car,
      date : (record.date.toDate()).toLocaleString(),
      finish: record.finish,
      isExpired : record.isExpired,
      spots : record.spots,
      start: record.start});
  }
  return tempArray;
}
const getReservationsByUser = async (uid : string) => {
  const q = query(collection(db, 'Reservations'), where("uid", "==", uid));
  const tempArray = Array<OfferModal>();
  const querySnap = await getDocs(q);
  
  for(let i=0; i< querySnap.size; i++){
    const doc = querySnap.docs[i];
    const record = doc.data();
    const offer =  await getOfferById(record.offerId);
    if(offer === undefined) return;
    const user = await getUsernameAndPicture(offer.uid);
    tempArray.push({
      username : user.username,
      img : user.picture,
      offerId : doc.id,
      car : offer.car,
      date : (offer.date.toDate()).toLocaleString(),
      finish: offer.finish,
      isExpired : offer.isExpired,
      spots : offer.spots,
      start: offer.start
    })
  }
  return tempArray;
}

const cancelReservation =async (reservationId:string) => {
  await deleteDoc(doc(db, 'Reservations/' + reservationId));
}

const deleteOffer =async (offerId:string) => {
  const docRef = doc(db, 'Offres/' + offerId)
  setDoc(docRef, {isExpired : true} , {merge : true})

}
export {
  getUserProfile,
  updateUsername,
  updatePhoneNumber,
  deleteOffer,
  cancelReservation,
  getOffersByVille,
  bookOffer,
  getReservationsByUser,
  getUsernameAndPicture,
  getAllOffers,
  getOffersByUser,
  auth,
  db,
  database,
  updateProfile,
  signInWithGoogle,
  logout,
  addNewOffer,
  searchOffer
};