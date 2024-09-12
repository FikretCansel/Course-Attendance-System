"use client";

import { db } from "@/Firebase";
import { collection } from "firebase/firestore";
import Head from "next/head";
import Link from "next/link";
import { useCollection } from "react-firebase-hooks/firestore";

export default function CoursesComponent() {
  const coursesRef = collection(db, "linkCourses");

  // Fetching data from the collection
  const [coursesSnapshot, isLoading, error] = useCollection(coursesRef);

  return (
    <div>
      <Head>
        <title>My Courses</title>
        <meta name="description" content="Courses page" />
      </Head>

      <main>
        <h1>My Courses</h1>
        <ul>
          {coursesSnapshot && coursesSnapshot.docs.map((doc) => {
            const course = doc.data(); // Get course data
            return (
              <div key={doc.id}>
                <Link href={`/link-course/${doc.id}`}>
                  <li>
                    <h2>{course.courseName}</h2>
                    <p>{course.tearcherName}</p>
                    <p>Course ID: {doc.id}</p> {/* Display course ID */}
                  </li>
                </Link>
              </div>
            );
          })}
        </ul>
      </main>

      <style jsx>{`
        main {
          padding: 2rem;
          max-width: 800px;
          margin: auto;
        }
        h1 {
          text-align: center;
        }
        ul {
          list-style-type: none;
          padding: 0;
        }
        li {
          margin-bottom: 1rem;
          padding: 1rem;
          border: 1px solid #ddd;
          border-radius: 8px;
        }
        h2 {
          margin: 0;
        }
      `}</style>
    </div>
  );
}
