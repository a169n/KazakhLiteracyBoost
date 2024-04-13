import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/users",
      }),
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
      }),
    }),
    deleteUserById: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  // GET /users
  useGetAllUsersQuery,
  useLazyGetAllUsersQuery,
  // GET /users/:userId
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  // DELETE /users/:userId
  useDeleteUserByIdMutation,
} = usersApi;
