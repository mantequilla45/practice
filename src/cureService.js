import { data } from "./firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const cureCollection = collection(data, 'cures');

export const addCure = async (cure)=> {
    try {
        await addDoc(cureCollection, cure);
        console.log('Cure added successfully');
    } catch (error) {
        console.error('Error adding cure: ', error);
    }
};

// export const getCures = async ()=> {
//     try {
//         const cureSnapshot = await getDocs(cureCollection);
//         const cureList = cureSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data }));
//         return cureList;
//     } catch (e) {
//         console.error("Error getting cures: ", e);
//     }
// };

export const getCures = async (symptom) => {
    try {
        const q = query(cureCollection, where('symptom', '==', symptom));
        const cureSnapshot = await getDocs(q);
        const cureList = cureSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return cureList;
    } catch (e) {
        console.error("Error getting cures: ", e);
    }
};