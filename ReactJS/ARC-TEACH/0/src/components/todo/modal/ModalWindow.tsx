import { useState } from "react"
import { useAppSelector, ToDo, ToDoStatuses, useAppDispatch } from "../../../store/hooks"
import { setToDoNotificationModal } from "../../../features/todo/toDoNotificationSlice"
import { toDoApiSlice } from "../../../features/api/endpoints/todo"
import { filterStatusesApiSlice } from "../../../features/api/endpoints/filterStatuses"
import { lastIdApiSlice } from "../../../features/api/endpoints/last"

type ModalWindow = {
  isOpen: boolean
  isEdit: boolean
  title: string
  todo: ToDo
  close: () => void
}


export const ModalWindow = ({ isOpen, isEdit, title, todo, close }: ModalWindow) => {
  const listToDoStatuses = useAppSelector((state) => state.toDoStatus.listStatuses)  // List with Filter Statuses
  const currentStatusIndex = (currentStatus: string): number => {
    const index = listToDoStatuses.findIndex(status => status === currentStatus)
    return index
  }
  const dispatch = useAppDispatch()

  // RTK Query : ToDO
  const [addToDo] = toDoApiSlice.useAddToDoMutation()
  const [editToDo] = toDoApiSlice.useEditToDoMutation()

  // RTK Query : Filter Statuses for ToDo
  const { data: filterStatuses } = filterStatusesApiSlice.useGetFilterStatusesQuery()
  const [editFilterStatuses] = filterStatusesApiSlice.useEditFilterStatusesMutation()
  
  // RTK Query : Last ID
  const { data: lastId } = lastIdApiSlice.useGetLastIdQuery()
  const [editLastId] = lastIdApiSlice.useEditLastIdMutation()

  // For Show && Save
  const [toDoStatus, setToDoStatus] = useState(currentStatusIndex(todo.status).toString())
  const [toDoTitle, setToDoTitle] = useState(todo.title)
  const [toDoDescription, setToDoDescription] = useState(todo.description)

  if (!isOpen) {
    document.body.style.overflowY = 'scroll'
    return null
  }

  // for Statuses from ToDo
  const handleEditFilterStatuses = (id: number, filterStatuses: ToDoStatuses[], expression: "+" | "-") => {
    const status = filterStatuses[id]

    let counter = 0
    if (expression === "+") counter = parseInt(status.counterStatus) + 1
    else if (expression === "-") counter = parseInt(status.counterStatus) - 1
    editFilterStatuses({
      ...status,
      id: (id + 1).toString(),
      status: status.status,
      counterStatus: counter.toString()
    })
  }

  // Save ToDo from EDIT && ADD
  const handleSaveToDo = () => {
    if (isEdit) {  // Edit ToDo
      if (((todo.title !== toDoTitle.trim()) || (todo.description !== toDoDescription.trim()) || (todo.status !== listToDoStatuses[parseInt(toDoStatus)])) &&
          ((toDoTitle.trim() !== "") && (toDoDescription.trim() !== "") && (filterStatuses !== undefined))) {
        editToDo({
          ...todo,
          title: toDoTitle.trim(),
          description: toDoDescription.trim(),
          status: listToDoStatuses[parseInt(toDoStatus)]
        })

        if (todo.status !== listToDoStatuses[parseInt(toDoStatus)]) {
          handleEditFilterStatuses(  // Old Filter Statuse
            currentStatusIndex(todo.status),
            filterStatuses, "-"
          )
          handleEditFilterStatuses(  // New Filter Statuse
            currentStatusIndex(listToDoStatuses[parseInt(toDoStatus)]),
            filterStatuses, "+"
          )
        }

        // Notification
        dispatch(setToDoNotificationModal({
          status: true,
          text: `Задача «${toDoTitle}» успешно изменена`
        }))

        close()
      }
    } else if ((toDoTitle.trim() !== "") && (toDoDescription.trim() !== "") && (filterStatuses !== undefined) && (lastId !== undefined)) {  // Adding ToDo
      const newLastId = (parseInt(lastId[0].last_id) + 1).toString()
      editLastId({
        ...lastId[0],
        last_id: newLastId
      })

      addToDo({
        id: newLastId,
        title: toDoTitle.trim(),
        description: toDoDescription.trim(),
        status: listToDoStatuses[parseInt(toDoStatus)]
      })
      handleEditFilterStatuses(  // New Filter Statuse
        currentStatusIndex(listToDoStatuses[parseInt(toDoStatus)]),
        filterStatuses, "+"
      )

      // Notification
      dispatch(setToDoNotificationModal({
        status: true,
        text: `Новая задача «${toDoTitle}» успешно добавлена`
      }))

      close()
    }
  }

  const titleMW = <p>{title.toUpperCase()}</p>
  const contentMW = 
    <>
      <div id="content-status">
        <label htmlFor="todo-status">{listToDoStatuses[parseInt(toDoStatus)]}</label>
        <input
          type="range"
          name="todo-status"
          min="0" max={listToDoStatuses.length - 1}
          value={toDoStatus}
          onChange={(e) => setToDoStatus(e.target.value)}
        />
      </div>
      <div id="content-title">
        <label htmlFor="todo-title">Название</label>
        <input
          required
          type="text"
          name="todo-title"
          value={toDoTitle}
          onChange={(e) => setToDoTitle(e.target.value)}
        />
      </div>
      <div id="content-description">
        <label htmlFor="todo-description">Описание</label>
        <textarea
          required
          name="todo-description"
          value={toDoDescription}
          onChange={(e) => setToDoDescription(e.target.value)}
        />
      </div>
    </>
  const buttonsMW = 
    <>
      <button
        onClick={() => handleSaveToDo()}>{title}</button>
      <button onClick={() => close()}>{"Закрыть".toUpperCase()}</button>
    </>

  document.body.style.overflowY = 'hidden'
  return (
    <div id="main-modal-window">
      <div id="modal-window">
        <div id="modal-window-header">{titleMW}</div>
        <div id="modal-window-content">{contentMW}</div>
        <div id="modal-window-btns">{buttonsMW}</div>
      </div>
    </div>
  )
}
