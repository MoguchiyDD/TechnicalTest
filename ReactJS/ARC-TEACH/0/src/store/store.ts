import { combineReducers, configureStore } from "@reduxjs/toolkit"
import toDoStatusReducer from "../features/todo/toDoStatusSlice"
import toDoNotificationReducer from "../features/todo/toDoNotificationSlice"
import ApiSlice from "../features/api/api"


const rootReducer = combineReducers({
  toDoStatus: toDoStatusReducer,
  toDoNotification: toDoNotificationReducer,
  [ApiSlice.reducerPath]: ApiSlice.reducer
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ApiSlice.middleware)
})


export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
