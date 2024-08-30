"use client";

import Head from "next/head";
import Link from "next/link";

const courses = [
  {
    id: 1,
    name: "JavaScript Basics",
    description: "A course on the fundamentals of JavaScript.",
  },
  {
    id: 2,
    name: "Building Applications with React.js",
    description: "Develop modern web applications using React.js.",
  },
  {
    id: 3,
    name: "Server-Side Rendering with Next.js",
    description: "Techniques for server-side rendering with Next.js.",
  },
];

export default function CoursesComponent() {
  return (
    <div>
      <Head>
        <title>My Courses</title>
        <meta name="description" content="Courses page" />
      </Head>

      <main>
        <h1>My Courses</h1>
        <ul>
          {courses.map((course, i) => (
            <div key={course.id}>
              <Link href={"/lesson"}>
                <li>
                  <h2>{course.name}</h2>
                  <p>{course.description}</p>
                </li>
              </Link>
            </div>
          ))}
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
