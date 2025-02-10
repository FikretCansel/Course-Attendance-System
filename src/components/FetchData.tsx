"use client";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../Firebase";
import { useParams } from "next/navigation";
import Loaders from "./Loaders";
import useIsTeacher from "@/app/hooks/useIsTeacher";

const FetchData = ({ course, setHasArrived }: { course: any, setHasArrived: any }) => {
  const params = useParams()
  const studentsRef = collection(db, `linkCourses/${params.id}/students`);
  const [students, studentIsLoading, studentError] =
    useCollectionData(studentsRef);
    const isTeacher = useIsTeacher({ userId: course?.userId })

    const deleteStudent = (student: any) =>{
      deleteDoc(doc(studentsRef, '?firstName',student.firstName));
console.log(student)
    }

  if (!course || studentIsLoading) return <Loaders />;
  if (studentError)
    return <h1>Bir hata oluştu: {studentError?.message}</h1>;


  const handleGeldimButton = () => {
    setHasArrived(true);
    if(isTeacher){
      setHasArrived(Math.random());
    }
  };

  return (
    <div>

      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                <img
                  src="https://bulma.io/assets/images/placeholders/96x96.png"
                  alt="Placeholder image"

                />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-4">{course?.courseName}</p>
              <p className="subtitle is-6">{course?.courseTeacher}</p>
            </div>
          </div>
          
          <div className="content">
            <p>{`Lat: ${course?.geolocation?._lat}, Long: ${course?.geolocation?._long}`}</p>
            <br />
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Surname</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {students?.map((student, index) => (
                  <tr key={index}>
                    <td>{student?.firstName}</td>
                    <td>{student?.lastName}</td>
                    <td>{student?.phone}</td>
                    <td onClick={()=> deleteStudent(student)} className="text-red-600">X</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="bg-red-400 p-3"
              onClick={() => {
                handleGeldimButton();
              }}
            >
              Gönder
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default FetchData;
