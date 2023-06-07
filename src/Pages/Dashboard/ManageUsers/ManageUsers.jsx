import React from 'react';
import useAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ManageUsers = () => {
  const [axiosSecure] = useAxiosSecure()
  
  const { data } = useQuery({
    queryKey: ['allusers'],
    queryFn: async () => {
      const res = await axiosSecure.get("/usersFromAdmin/users");
      return res.data
    }
    
  })
      console.log(data);

  return (
    <div>
      {
        data.map((user, index) => {
          <p key={index}>{ user.name}</p>
        })
      }
    </div>
  );
};

export default ManageUsers;