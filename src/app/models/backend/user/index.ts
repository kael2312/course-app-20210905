import { Employee, Recruiter } from './roles';
import firebase from 'firebase/app';

export interface User {
    uid: string;
    name: string;
    photoURL: string;
    email: string;
    country: string;
    about?: string;
    roleId: string;
    role: Employee | Recruiter;
    created: firebase.firestore.FieldValue;
    updated?: firebase.firestore.FieldValue;
}
