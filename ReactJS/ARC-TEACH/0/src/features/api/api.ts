import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export default createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["ToDo", "ToDoFilterStatuses", "ToDoLastId"],
  endpoints: () => ({})
});
