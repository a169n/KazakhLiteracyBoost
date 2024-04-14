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
    getUser: builder.query({
      query: (token) => ({
        url: "/user",
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
    addPointsToUser: builder.mutation({
      query: ({ token, ...data }) => ({
        url: "/user/addPoints",
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  // GET /users
  useGetAllUsersQuery,
  useLazyGetAllUsersQuery,
  // GET /user
  useGetUserQuery,
  useLazyGetUserQuery,
  // PUT /users/quiz
  useUpdateUserQuizMutation,
  // DELETE /users/:userId
  useDeleteUserByIdMutation,
  // PUT /user/addPoints
  useAddPointsToUserMutation,
} = usersApi;
