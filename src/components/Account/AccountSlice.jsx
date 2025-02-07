import { api } from "../../app/api";

const userDetailsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: `/users/me`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        transformResponse: (response) => response.data.users,
        transformErrorResponse: (response) => response.data.error,
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUserQuery } = userDetailsApi;
