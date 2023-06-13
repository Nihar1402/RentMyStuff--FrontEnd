import { BASE_URL } from '../services/helper';
import React from "react";
export const ErrorPageOne = () => {
  return (
    <React.Fragment>
    <section>
      <div className="container d-flex items-center px-12 py-12 mx-auto">
        <div>
          <p className="text-sm font-medium text-indigo-500 dark:text-indigo-400">
            404 error
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            We can&apos;t find that page
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Sorry, the page you are looking for doesn&apos;t exist or has been
            moved.
          </p>

          <div className="d-flex justify-items-center ms-6 gap-x-3">
            <button className=" actbtn me-3">
             
              Take me Back
            </button>

            <button className="actbtn">
              Go Home
            </button>
          </div>
        </div>
      </div>
    </section>
    </React.Fragment>
  );
};

// ErrorPageOne.displayName = "ErrorPageOne";