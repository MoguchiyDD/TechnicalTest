import ApiSlice from "../api";
import { ToDoLastId } from "../../../store/hooks";


export const lastIdApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLastId: builder.query<ToDoLastId[], void>({
      query: () => ({
        url: "/last",
        method: "GET"
      }),
      providesTags: ["ToDoLastId"]
    }),
    editLastId: builder.mutation<ToDoLastId, ToDoLastId>({
      query: (last) => ({
        url: `/last/${last.id}`,
        method: "PATCH",
        body: last
      }),
      invalidatesTags: ["ToDoLastId"]
    })
  })
});

export const {
  useGetLastIdQuery,
  useEditLastIdMutation
} = lastIdApiSlice
