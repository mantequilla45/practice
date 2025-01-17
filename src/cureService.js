import { data } from "./firebase";
import { collection, addDoc, getDocs, query, where, getDoc } from "firebase/firestore";

const cureCollection = collection(data, 'cures');
const combinedSymptomsCollection = collection(data, 'combinedsymptoms');

export const addCure = async (cure) => {
    try {
        const cureWithLowercase = {
            ...cure,
            symptoms_lowercase: cure.symptoms.toLowerCase()
        };
        await addDoc(cureCollection, cure);
        console.log('Cure added successfully');
    } catch (error) {
        console.error('Error adding cure: ', error);
    }
};

// export const getCures = async (symptoms) => {
//     try {
//         const lowerCaseSymptom = symptoms.toLowerCase();
//         const q = query(cureCollection, where('symptoms', '==', symptoms));
//         const cureSnapshot = await getDocs(q);
//         // const cureList = cureSnapshot.docs
//         //     .map(doc => ({ id: doc.id, ...doc.data() }))
//         //     .filter(cure => cure.symptoms.toLowerCase() === lowerCaseSymptom);
//         const cureList = cureSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         return cureList;
//     } catch (e) {
//         console.error("Error getting cures: ", e);
//         return [];
//     }
// };

export const getCures = async ()=> {
    try {
        const cureSnapshot = await getDocs(cureCollection);
        const cureList = cureSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return cureList;
    } catch (e) {
        console.error('Error getting cures: ', e);
        return [];
    }
};

export const getCombinedSymptoms = async ()=> {
    try {
        const combinedsymptomsSnapshot = await getDocs(combinedSymptomsCollection);
        const combinedSymptomsList = combinedsymptomsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return combinedSymptomsList;
    } catch (e) {
        console.error('Error getting list:', e);
        return [];
    }
};

export const saveSearchRecord = async (record) => {
    try {
        const recordRef = collection(data, 'searchRecords');
        await addDoc(recordRef, record);
        console.log('Record saved successfully.');
    }
    catch (e) {
        console.error('Error saving record: ', e);
    }
};
