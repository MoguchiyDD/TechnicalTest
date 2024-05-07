import { useEffect, useState } from "react"
import { useAppSelector } from "../../../store/hooks"
import { lastIdApiSlice } from "../../../features/api/endpoints/last"
import { ModalWindow } from "../modal/ModalWindow"
import '../../../assests/style/todo/add/add.scss'

export const AddToDoView = () => {
  const listToDoStatuses = useAppSelector((state) => state.toDoStatus.listStatuses)  // List with Filter Statuses
  const { data: lastId } = lastIdApiSlice.useGetLastIdQuery()  // RTK Query : Last ID
  const [todo, setToDo] = useState({
    id: "",
    title: "",
    description: "",
    status: ""
})

  useEffect(() => {
    if ((listToDoStatuses.length >= 1) && (lastId !== undefined)) {
      setToDo(prevToDo => ({
        ...prevToDo,
        id: lastId[0].last_id,
        status: listToDoStatuses[0]
      }))
      return
    }
  }, [listToDoStatuses, lastId])
  
  // for Modal Window
  const [open, setOpen] = useState(false)
  const handleOpen = () => { setOpen(true) }
  const handleClose = () => { setOpen(false) }

  return (
    <div id="todo-add">
      <button id="add" onClick={() => handleOpen()}>+</button>
      {todo.status !== "" ? (
        <ModalWindow
          isOpen={open}
          isEdit={false}
          title={"Добавить".toUpperCase()}
          todo={todo}
          close={handleClose}
        />
      ) : (<></>)}
    </div>
  )
}
