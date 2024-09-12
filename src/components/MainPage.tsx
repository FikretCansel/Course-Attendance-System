"use client";
import React, { useState } from "react";
import FetchData from "./FetchData";
import { doc} from "firebase/firestore";
import { db } from "../Firebase";
import LinkCourseComponent from "./LinkCourseComponent";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";

export const MainPage = () => {
  const [hasArrived, setHasArrived] = useState(false);
  const coursesRef = doc(db, "linkCourses", 'lqgqG5HZ8XnkCuZODqB2');
  const [course] =  useDocumentDataOnce(coursesRef);
  console.log(course)

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
