"use client";
import { useState} from "react";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../Firebase";

const FetchData = ({course,setHasArrived}: {course: any, setHasArrived: any}) => {
  const studentsRef = collection(db, "linkCourses/lqgqG5HZ8XnkCuZODqB2/1");

  const [students, studentIsLoading, studentError] =
    useCollectionData(studentsRef);
    const [sendMail,setSendMail] = useState(false);
    
  if (!course || studentIsLoading) return <h1>Yükleniyor...</h1>;
  if (studentError)
    return <h1>Bir hata oluştu: { studentError?.message}</h1>;


  const sendEmailToStudent = (email: string, name: string) => {
    setHasArrived(true);
    console.log(`Sending email to: ${email} for student: ${name}`);
    
  };
  if(sendMail === true)
  {
    students?.forEach((student) => {
      sendEmailToStudent(student.mail, student.name);
    });
    setSendMail(false);
  }


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
                        <td>{student?.name}</td>
                        <td>{student?.surname}</td>
                        <td>{student?.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  className="bg-red-400 p-3"
                  onClick={() => {
                    setSendMail(true);
                  }}
                  disabled={sendMail}
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
