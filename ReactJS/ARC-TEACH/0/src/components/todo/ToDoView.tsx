import { useState } from "react"
import { useAppSelector, useAppDispatch, ToDo } from "../../store/hooks"
import { toDoApiSlice } from "../../features/api/endpoints/todo"
import { filterStatusesApiSlice } from "../../features/api/endpoints/filterStatuses"
import { setToDoNotificationModal } from "../../features/todo/toDoNotificationSlice"
import { ModalWindow } from "./modal/ModalWindow"
import "../../assests/style/skeleton/todo/card/card.scss"
import "../../assests/style/error/todo/card/card.scss"
import "../../assests/style/todo/card/card.scss"
import "../../assests/style/todo/status/status.scss"
import "../../assests/style/todo/modal_window/modal_window.scss"

type Card = { todo: ToDo }


export const ToDoView = () => {
  const currentStatus = useAppSelector((state) => state.toDoStatus.currentStatus)  // Current Status from Filter Statuses

  const {  // RTK Query : ToDO
    data: todo,
    isLoading,
    isSuccess,
    isError,
    error
  } = toDoApiSlice.useGetToDoQuery()

  let content
  if (isLoading) {
    content =
      <div className="skeleton-todo-card">
        <div className="skeleton-card-title-status">
          <div className="skeleton-card-title" />
          <div className="skeleton-card-status" />
        </div>
        <div className="skeleton-card-description" />
        <div className="skeleton-card-btns">
          <div className="skeleton-card-btn" />
          <div className="skeleton-card-btn" />
        </div>
      </div>
  } else if (isError) {
    if ("status" in error) {
      const errorMessage = "error" in error ? error.error : JSON.stringify(error.data)
      content = <p id="error-todo-card">{errorMessage}</p>
    }
  } else if ((isSuccess) && (todo !== undefined)) {
    content = 
      <>
        {todo.map((todo: ToDo, index: number) => (
          (todo.status === currentStatus || currentStatus === "") ? (
            <ToDoCard key={index} todo={todo} />
          ) : ""
        ))}
      </>
  }

  return content
}

const ToDoCard = ({ todo }: Card) => {
  const listToDoStatuses = useAppSelector((state) => state.toDoStatus.listStatuses)  // List with Filter Statuses
  const dispatch = useAppDispatch()

  // RTK Query : Filter Statuses for ToDo
  const { data: filterStatuses } = filterStatusesApiSlice.useGetFilterStatusesQuery()
  const [editFilterStatuses] = filterStatusesApiSlice.useEditFilterStatusesMutation()
  const [delToDo] = toDoApiSlice.useDelToDoMutation()

  // for Modal Window
  const [open, setOpen] = useState(false)
  const handleOpen = () => { setOpen(true) }
  const handleClose = () => { setOpen(false) }

  const handleDelToDo = () => {
    if (filterStatuses !== undefined) {
      delToDo(todo.id)  // Delete ToDo

      // Edit : Number of Current Status
      const id = listToDoStatuses.findIndex(status => status === todo.status)
      const status = filterStatuses[id]
      editFilterStatuses({
        ...status,
        id: (id + 1).toString(),
        status: status.status,
        counterStatus: (parseInt(status.counterStatus) - 1).toString()
      })

      // Notification
      dispatch(setToDoNotificationModal({
        status: true,
        text: `Задача «${todo.title}» успешно удалена`
      }))
    }
  }

  return (
    <>
      <div className="todo-card">
        <div className="card-title-status">
          <p className="card-title">{todo.title}</p>
          <p className="card-status">{todo.status}</p>
        </div>
        <p className="card-description">{todo.description}</p>
        <div className="card-btns">
          <button className="edit" onClick={() => handleOpen()}>
            {"Редактировать".toUpperCase()}
          </button>
          <button className="del" onClick={() => handleDelToDo()}>
            {"Удалить".toUpperCase()}
          </button>
        </div>
        <ModalWindow
          isOpen={open}
          isEdit={true}
          title={"Редактировать".toUpperCase()}
          todo={todo}
          close={handleClose}
        />
      </div>
    </>
  )
}
