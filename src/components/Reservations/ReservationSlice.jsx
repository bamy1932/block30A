import { api } from "../../app/api";

const reservationsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getReservation: builder.query({
      query: () => ({
        url: `/reservations`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        transformResponse: (response) => response.data.users,
        transformErrorResponse: (response) => response.data.error,
      }),
      providesTags: ["Book"],
    }),

    deleteReservation: builder.mutation({
      query: ({ id }) => ({
        url: `/reservations/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
          transformResponse: (response) => response.data.users,
          transformErrorResponse: (response) => response.data.error,
      }),
      invalidatesTags: ["Book"],
    }),
  }),
});

export const { useGetReservationQuery, useDeleteReservationMutation } =
  reservationsApi;
