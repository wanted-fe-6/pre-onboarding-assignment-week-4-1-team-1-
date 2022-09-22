import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken } from '../utils/token';

export const prefaceApi = createApi({
  reducerPath: 'prefaceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    prepareHeaders: headers => {
      const token = getToken();
      if (token) headers.set('Authorization', `Bearer ${token}`);

      headers.set('Content-type', 'application/json');
      return headers;
    },
  }),

  endpoints: builder => ({
    signupUser: builder.query({
      query: newUser => ({
        url: 'signup',
        method: 'POST',
        body: newUser,
      }),
    }),
    loginUser: builder.query({
      query: user => ({
        url: 'login',
        method: 'POST',
        body: user,
      }),
    }),
    getUsersByPage: builder.query({
      query: page => ({
        url: `users/${page}`,
      }),
    }),
    searchUser: builder.query({
      query: word => ({
        url: `users?q=${word}`,
      }),
    }),
    getFilterdUsers: builder.query({
      async queryFn({ page = 1, isActive, isStaff }, _queryApi, _extraOptions, fetchWithBQ) {
        let filterQuery = ``;

        if (isActive === undefined && isStaff === undefined) {
          const { data } = await fetchWithBQ(`users?_page=${page}`);
          return { data };
        }
        if (isActive !== undefined) filterQuery += `&is_active=${isActive}`;
        if (isStaff !== undefined) filterQuery += `&is_staff=${isStaff}`;

        const { data: userSettings } = await fetchWithBQ(
          `userSetting?&_page=${page}${filterQuery}`
        );
        const { data: users } = await fetchWithBQ('users');

        const results = [];
        userSettings.forEach(setting => {
          users.forEach(user => {
            if (setting.uuid === user.uuid) {
              results.push(user);
            }
          });
        });
        return { data: results };
      },
    }),
    createUser: builder.query({
      query: newUser => ({
        url: 'users',
        method: 'POST',
        body: newUser,
      }),
    }),
    deleteUser: builder.query({
      query: id => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
    }),
    editUser: builder.query({
      query: (id, newUser) => ({
        url: `users/${id}`,
        method: 'PATCH',
        body: newUser,
      }),
    }),
  }),
});

export const {
  useLoginUserQuery,
  useSignupUserQuery,
  useCreateUserQuery,
  useDeleteUserQuery,
  useEditUserQuery,
  useSearchUserQuery,
  useGetFilterdUsersQuery,
  useGetUsersByPageQuery,
} = prefaceApi;
