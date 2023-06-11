import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../Hooks/UseAxiosSecure';

const PopulerClasses = () => {
const[axiosSecure] = useAxiosSecure()
const { data, isLoading, refetch } = useQuery({
  queryKey: ["popularClass"],
  queryFn: async () => {
    const res = await axiosSecure.get("/popularClass");
    return res.data;
  },
});

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto" bis_skin_checked={1}>
          <div
            className="flex flex-col text-center w-full mb-10"
            bis_skin_checked={1}
          >
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-500">
              Populer Classes
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Mastering a new language opens doors to endless possibilities. Our
              language courses are designed to equip you with the skills and
              confidence to communicate effectively in different linguistic
              landscapes.
            </p>
          </div>

          <div className="flex flex-wrap -m-4" bis_skin_checked={1}>
            {data &&
              data.map((classes) => {
                return (
                  <div
                    key={classes._id}
                    className="lg:w-1/3 sm:w-1/2 p-4"
                    bis_skin_checked={1}
                  >
                    <div className="flex relative" bis_skin_checked={1}>
                      <img
                        alt="gallery"
                        className="absolute inset-0 w-full h-full object-cover object-center"
                        src={classes.imgurl}
                      />
                      <div
                        className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100"
                        bis_skin_checked={1}
                      >
                        <h2 className="tracking-widest text-lg md:text-xl title-font font-medium text-sky-600 mb-1">
                          Course Name: {classes.coursename}
                        </h2>
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                         Total Enrolled: {classes.enrolled}
                        </h1>
                        <p className="leading-relaxed text-md md:text-lg font-bold">
                          Price: ${classes.price}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PopulerClasses;