import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialState = {
  modalNotificationToDo: boolean
  modalNotificationTextToDo: string
}
const initialState: InitialState = {
  modalNotificationToDo: false,
  modalNotificationTextToDo: ""
}

const toDoNotificationSlice = createSlice({
  name: "toDoNotification",
  initialState,
  reducers: {
    setToDoNotificationModal: (state, action: PayloadAction<{status: boolean, text: string}>) => {
      state.modalNotificationToDo = action.payload.status
      state.modalNotificationTextToDo = action.payload.text
    }
  }
})

export default toDoNotificationSlice.reducer
export const { setToDoNotificationModal } = toDoNotificationSlice.actions
