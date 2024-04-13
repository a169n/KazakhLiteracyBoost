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
    updateUserQuiz: builder.mutation({
      query: ({ token, ...data }) => ({
        url: `/users/quiz`,
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
  // PUT /users/quiz
  useUpdateUserQuizMutation,
  // DELETE /users/:userId
  useDeleteUserByIdMutation,
} = usersApi;
