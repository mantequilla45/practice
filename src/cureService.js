import { data } from "./firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const cureCollection = collection(data, 'cures');

export const addCure = async (cure) => {
    try {
        const cureWithLowercase = {
            ...cure,
            symptoms_lowercase: cure.symptoms.toLowerCase()
        };
        await addDoc(cureCollection, cureWithLowercase);
        console.log('Cure added successfully');
    } catch (error) {
        console.error('Error adding cure: ', error);
    }
};

export const getCures = async (symptoms) => {
    try {
        const lowerCaseSymptom = symptoms.toLowerCase();
        const q = query(cureCollection, where('symptoms_lowercase', '==', lowerCaseSymptom));
        const cureSnapshot = await getDocs(q);
        const cureList = cureSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return cureList;
    } catch (e) {
        console.error("Error getting cures: ", e);
        return [];
    }
};
