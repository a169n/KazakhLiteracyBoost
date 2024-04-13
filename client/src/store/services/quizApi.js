import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quizApi = createApi({
    reducerPath: "quizApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
    endpoints: (builder) => ({
        getQuizzes: builder.query({
            query: () => ({
                url: "/quizzes"
            }),
        }),
        getQuiz: builder.query({
            query: ({ id }) => ({
                url: `/quizzes/${id}`,
            }),
        }),
    }),
})


export const { useGetQuizQuery, useGetQuizzesQuery } = quizApi;