import ApiSlice from "../api";
import { ToDo } from "../../../store/hooks"


export const toDoApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getToDo: builder.query<ToDo[], void>({
      query: () => ({
        url: "/todo",
        method: "GET"
      }),
      providesTags: ["ToDo"]
    }),
    addToDo: builder.mutation<ToDo, ToDo>({
      query: (todo) => ({
        url: "/todo",
        method: "POST",
        body: todo
      }),
      invalidatesTags: ["ToDo"]
    }),
    editToDo: builder.mutation<ToDo, ToDo>({
      query: (todo) => ({
        url: `/todo/${todo.id}`,
        method: "PATCH",
        body: todo
      }),
      invalidatesTags: ["ToDo"]
    }),
    delToDo: builder.mutation<ToDo, string>({
      query: (id) => ({
        url: `/todo/${id}`,
        method: "DELETE",
        body: id
      }),
      invalidatesTags: ["ToDo"]
    })
  })
});

export const {
  useGetToDoQuery,
  useAddToDoMutation,
  useEditToDoMutation,
  useDelToDoMutation
} = toDoApiSlice
