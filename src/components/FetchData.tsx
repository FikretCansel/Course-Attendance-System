"use client";
import { FC ,useState} from "react";
import { collection, query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../Firebase";
import LinkCourseComponent from "./LinkCourseComponent";
import Image from "next/image";
const FetchData: FC = () => {
  // Koleksiyon referansları
  const coursesRef = collection(db, "linkCourses");
  const studentsRef = collection(db, "studentsOfTheCourse");
const [hasArrived,setHasArrived] = useState(false);
  // Koleksiyonlardan veri çekme
  const [courses, isLoading, error] = useCollectionData(coursesRef);
  const [students, studentIsLoading, studentError] =
    useCollectionData(studentsRef);

  if (isLoading || studentIsLoading) return <h1>Yükleniyor...</h1>;
  if (error || studentError)
    return <h1>Bir hata oluştu: {error?.message || studentError?.message}</h1>;

  // Öğrencileri ilgili kurs ID'ye göre filtrele
  const getStudentsForCourse = (courseId: string) => {
    return students?.filter((student) => student.courseId === courseId) || [];
  };


  


  return (
    <div>
      {courses?.map((course, index) => {
        const studentsForCourse = getStudentsForCourse(course.id);

        return (
          <div className="card" key={index}>
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
                  <p className="title is-4">{course.courseName}</p>
                  <p className="subtitle is-6">{course.courseTeacher}</p>
                </div>
              </div>

              <div className="content">
                <p>{`Lat: ${course.geolocation._lat}, Long: ${course.geolocation._long}`}</p>
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
                    {studentsForCourse.map((student, index) => (
                      <tr key={index}>
                        <td>{student.name}</td>
                        <td>{student.surname}</td>
                        <td>{student.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  className="bg-red-400 p-3"
                  onClick={() => {
                    setHasArrived(true);
                  }}
                  disabled={hasArrived}
                >
                  Geldim
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FetchData;
