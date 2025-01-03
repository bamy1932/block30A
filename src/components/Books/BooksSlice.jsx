import { api } from "../../app/api";

const booksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => ({
        url: "/books",
        method: "GET",
        transformResponse: (response) => response.data.books,
        transformErrorResponse: (response) => response.data.error,
      }),
      providesTags: ["Book"],
    }),

    updateBook: builder.mutation({
      query: ({ id, available }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: JSON.stringify({ available }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        transformResponse: (response) => response.data.books,
        transformErrorResponse: (response) => response.data.error,
      }),

      invalidatesTags: ["Book"],
    }),
  }),
});

export const { useGetBooksQuery, useUpdateBookMutation } = booksApi;
