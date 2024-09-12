"use client";
import React, { useState } from "react";
import FetchData from "./FetchData";
import { doc} from "firebase/firestore";
import { db } from "../Firebase";
import LinkCourseComponent from "./LinkCourseComponent";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useParams } from "next/navigation";

export const MainPage = () => {
  const [hasArrived, setHasArrived] = useState(false);
  const params = useParams()
  const coursesRef = doc(db, "linkCourses", params.id as string ?? 'params');
  const [course] =  useDocumentDataOnce(coursesRef);
  console.log(params)

  return (
    <div>
      <div className="columns ">
        <div className="is-5 m-3">
          <FetchData course={course} setHasArrived={setHasArrived}/>
        </div>
        <div className="column is-three-quarters">
          <LinkCourseComponent course={course} hasArrived={hasArrived}/>
        </div>
      </div>
    </div>
  );
};
