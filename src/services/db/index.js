import {
  collection, getDocs, addDoc, deleteDoc, where, query,
} from 'firebase/firestore';
import db from '../../firebase/firebaseConfig';

class FirebaseService {
  constructor() {
    this.db = db;
  }

  async getDataFromCollection() {
    console.log(this.db);
    const querySnapshot = await getDocs(collection(this.db, 'video'));
    const data = querySnapshot.docs.map((doc) => doc.data());

    return data;
  }

  async addVideoToCollection(video) {
    await addDoc(collection(this.db, 'video'), video);
  }

  async deleteDocumentById(id) {
    console.log('ID', id);
    const q = query(collection(this.db, 'video'), where('id', '==', id));
    console.log('!q', q);
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.ref);
      deleteDoc(doc.ref);
    });
  }
}

export default FirebaseService;
