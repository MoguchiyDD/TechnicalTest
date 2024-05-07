import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "./store"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { SerializedError } from "@reduxjs/toolkit"

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()

// Total
export type ToDo = {
  id: string
  title: string
  description: string
  status: string
}
export type ToDoStatuses = {
  id: string
  status: string
  counterStatus: string
}
export type ToDoListStatuses = {
  toDoStatus: { listToDoStatuses: Array<string> }
}
export type ToDoLastId = {
  id: string
  last_id: string
}

// RTK Query
export type ToDoQueryView = {
  data: ToDo[] | undefined,
  isLoading: boolean,
  isSuccess: boolean,
  isError: boolean,
  error: FetchBaseQueryError | SerializedError | undefined
}
export type FilterStatusesQueryView = {
  data: ToDoStatuses[] | undefined,
  isLoading: boolean,
  isSuccess: boolean,
  isError: boolean,
  error: FetchBaseQueryError | SerializedError | undefined
}
