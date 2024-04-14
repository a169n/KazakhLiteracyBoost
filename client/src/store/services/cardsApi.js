import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cardsApi = createApi({
  reducerPath: "cardsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    getAllCards: builder.query({
      query: () => ({
        url: "/cards",
      }),
    }),
    getCardById: builder.query({
      query: (id) => ({
        url: `/cards/${id}`,
      }),
    }),
    createCard: builder.mutation({
      query: (data) => ({
        url: "/cards",
        method: "POST",
        body: data,
      }),
    }),
    updateCardById: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/cards/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteCardById: builder.mutation({
      query: (id) => ({
        url: `/cards/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  // GET /cards
  useGetAllCardsQuery,
  useLazyGetAllCardsQuery,
  // GET /cards/:id
  useGetCardByIdQuery,
  useLazyGetCardByIdQuery,
  // POST /cards
  useCreateCardMutation,
  // PUT /cards/:id
  useUpdateCardByIdMutation,
  // DELETE /cards/:id
  useDeleteCardByIdMutation,
} = cardsApi;
