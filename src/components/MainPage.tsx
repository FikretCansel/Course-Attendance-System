"use client";
import React from "react";
import FetchData from "./FetchData";
import LinkCourseComponent from "./LinkCourseComponent";
import { Navbar } from "./Navbar";

export const MainPage = () => {
  return (
    <div>
      <div className="columns ">
        <div className="is-5 m-3">
          <FetchData />
        </div>
        <div className="column is-three-quarters">
          <LinkCourseComponent />
        </div>
      </div>
    </div>
  );
};
