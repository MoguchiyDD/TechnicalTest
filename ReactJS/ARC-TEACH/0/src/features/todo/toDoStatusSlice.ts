import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialState = {
  listStatuses: Array<string>
  currentStatus: string
}
const initialState: InitialState = {
  listStatuses: [],
  currentStatus: ""
}

const toDoStatusSlice = createSlice({
  name: "toDoStatus",
  initialState,
  reducers: {
    addListStatuses: (state, action: PayloadAction<string>) => {
      state.listStatuses[state.listStatuses.length] = action.payload
    },
    setCurrentStatus: (state, action: PayloadAction<string>) => {
      state.currentStatus = action.payload
    }
  }
})

export default toDoStatusSlice.reducer
export const { addListStatuses, setCurrentStatus } = toDoStatusSlice.actions
