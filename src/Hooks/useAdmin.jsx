import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider';
import useAxiosSecure from './UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAdmin = () => {
  const { user,loading } = useContext(AuthContext)
  const [axiosSecure] = useAxiosSecure()
  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/admin/${user?.email}`);
      console.log('admin res', res?.data);
      return res.data?.admin;
    },
  });

  return [isAdmin, isAdminLoading]
}
export default useAdmin;