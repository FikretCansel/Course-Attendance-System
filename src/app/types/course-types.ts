import { DocumentData, FirestoreError } from "firebase/firestore";

export interface ICourse {
    courseName: string;
    courseTeacher: string;
    lat: string;
    geolocation: {
        _lat: string;
        _long: string;
    }
}

export interface IFirebaseCourse {
    data: ICourse | undefined, isLoading:boolean, error: FirestoreError | undefined
}

