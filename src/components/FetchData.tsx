"use client";
import { useState} from "react";
import { addDoc, collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, db } from "../Firebase";
import { useParams } from "next/navigation";
import Loaders from "./Loaders";
import Modal from "./Modal";
import { useAuthState } from "react-firebase-hooks/auth";
import useIsTeacher from "@/app/hooks/useIsTeacher";

const FetchData = ({course,setHasArrived}: {course: any, setHasArrived: any}) => {
  const params = useParams()
  const studentsRef = collection(db, `linkCourses/${params.id}/students`);
  const [Geldim, setGeldim] = useState(false)
  
  const [user, loading, error] = useAuthState(auth)

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  ;

  const [students, studentIsLoading, studentError] =
    useCollectionData(studentsRef);

    const isTeacher = useIsTeacher({userId: course?.userId})
    const [sendMail,setSendMail] = useState(false);
  console.log(course?.userId, 'dışardaki')
    const handleSubmit = async(e) => {
      e.preventDefault();
      console.log(isTeacher, course?.userId, user?.uid)
      // Form gönderim işlemleri
      console.log(`Ad: ${firstName}, Soyad: ${lastName}`);
  
      if(isTeacher){
        const docRef = await addDoc(collection(db, `linkCourses/${params.id}`, "students"), {firstName, lastName});
      }
      
      console.log(docRef)
      setGeldim(false)
    }
  if (!course || studentIsLoading) return <Loaders/>;
  if (studentError)
    return <h1>Bir hata oluştu: { studentError?.message}</h1>;


  const handleGeldimButton = () => {
    console.log(isTeacher)
    if(isTeacher){
      setHasArrived(true);
    }
    setGeldim(true);
    console.log(`Sending email to: ${email} for student: ${name}`);
    
  };
  if(sendMail === true)
  {
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
<Modal isOpen={Geldim} onClose={()=> {setGeldim(false)}}>
<form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
          Ad
        </label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-300"
        />
      </div>
      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
          Soyad
        </label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-300"
        />
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={()=>setGeldim(false)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Kapat
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Gönder
        </button>
      </div>
    </form>
</Modal>
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
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  className="bg-red-400 p-3"
                  onClick={() => {
                    handleGeldimButton();
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
