import React from 'react';
import useAxiosSecure from '../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared Component/Loading';

const PopulerInstructors = () => {

const [axiosSecure] = useAxiosSecure();
const { data, isLoading} = useQuery({
  queryKey: ["popularInstructor"],
  queryFn: async () => {
    const res = await axiosSecure.get("/popularInstructors");
    return res.data;
  },
});
  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-12 mx-auto" bis_skin_checked={1}>
          <div
            className="flex flex-col text-center w-full mb-10"
            bis_skin_checked={1}
          >
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              OUR TOP INSTRUCTORS
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Don't miss the opportunity to learn from our top instructors and
              embark on an exciting language learning journey. Explore our
              curated selection of courses and experience firsthand why these
              instructors are regarded as the best in the business.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3" bis_skin_checked={1}>
            {/* card */}
            {
              data && 
              data.map((inst,i) => {
                return (
                  <div key={i} className="p-4 lg:w-1/2" bis_skin_checked={1}>
                    <div
                      className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left"
                      bis_skin_checked={1}
                    >
                      <img
                        alt="team"
                        className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
                        src={inst?.instructorImg}
                      />
                      <div className="flex-grow sm:pl-8" bis_skin_checked={1}>
                        <h2 className=" font-semibold w-full text-lg md:text-xl text-gray-900">
                          {inst?.instructorname}
                        </h2>
                        <h3 className="text-gray-500 mb-3">
                          Email: {inst?._id}
                        </h3>
                        <p className="mb-4">Total Students: {inst?.enrolled}</p>
                        <span className="inline-flex">
                          <a className="text-gray-500">
                            <svg
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              className="w-5 h-5"
                              viewBox="0 0 24 24"
                            >
                              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                            </svg>
                          </a>
                          <a className="ml-2 text-gray-500">
                            <svg
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              className="w-5 h-5"
                              viewBox="0 0 24 24"
                            >
                              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                            </svg>
                          </a>
                          <a className="ml-2 text-gray-500">
                            <svg
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              className="w-5 h-5"
                              viewBox="0 0 24 24"
                            >
                              <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                            </svg>
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            }
            {/* card */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PopulerInstructors;