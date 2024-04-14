import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const textApi = createApi({
  reducerPath: "textApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    getAllTexts: builder.query({
      query: () => ({
        url: "/texts",
      }),
    }),
    getTextById: builder.query({
      query: (id) => ({
        url: `/texts/${id}`,
      }),
    }),
    createText: builder.mutation({
      query: (text) => ({
        url: "/texts",
        method: "POST",
        body: text,
      }),
    }),
    updateTextById: builder.mutation({
      query: ({ id, text }) => ({
        url: `/texts/${id}`,
        method: "PUT",
        body: text,
      }),
    }),
    deleteTextById: builder.mutation({
      query: (id) => ({
        url: `/texts/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  // GET /texts
  useGetAllTextsQuery,
  useLazyGetAllTextsQuery,
  // GET /texts/:id
  useGetTextByIdQuery,
  useLazyGetTextByIdQuery,
  // POST /texts
  useCreateTextMutation,
  // PUT /texts/:id
  useUpdateTextByIdMutation,
  // DELETE /texts/:id
  useDeleteTextByIdMutation,
} = textApi;
