import ApiSlice from "../api";
import { ToDoStatuses } from "../../../store/hooks"


export const filterStatusesApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFilterStatuses: builder.query<ToDoStatuses[], void>({
      query: () => ({
        url: "/filter-statuses",
        method: "GET"
      }),
      providesTags: ["ToDoFilterStatuses"]
    }),
    editFilterStatuses: builder.mutation<ToDoStatuses, ToDoStatuses>({
      query: (status) => ({
        url: `/filter-statuses/${status.id}`,
        method: "PATCH",
        body: status
      }),
      invalidatesTags: ["ToDoFilterStatuses"]
    })
  })
});

export const {
  useGetFilterStatusesQuery,
  useEditFilterStatusesMutation
} = filterStatusesApiSlice
