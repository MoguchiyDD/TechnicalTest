import { ChangeEvent } from "react"
import { useAppSelector, useAppDispatch } from "../../../store/hooks"
import { filterStatusesApiSlice } from "../../../features/api/endpoints/filterStatuses"
import { addListStatuses, setCurrentStatus } from "../../../features/todo/toDoStatusSlice"
import "../../../assests/style/skeleton/todo/status/status.scss"
import "../../../assests/style/error/todo/status/status.scss"

type Id = { id: string }


export const FilterStatusesView = ({id}: Id) => {
  const listToDoStatuses = useAppSelector((state) => state.toDoStatus.listStatuses)  // List with Filter Statuses
  const dispatch = useAppDispatch()

  const {  // RTK Query : Filter Statuses for ToDo
    data: filterStatuses,
    isLoading,
    isSuccess,
    isError,
    error
  } = filterStatusesApiSlice.useGetFilterStatusesQuery()

  // Title Filter Status
  let titleStatus
  if ((filterStatuses !== undefined) && (listToDoStatuses !== undefined)) {
    switch(id) {
      case "1": {
        titleStatus = <p className="title">{filterStatuses[0].status}</p>
        const status: string | undefined = listToDoStatuses.find(
          (status: string) => status === filterStatuses[0].status
        )
        if (status === undefined) {
          dispatch(addListStatuses(filterStatuses[0].status))
        }
        break
      }
      case "2": {
        titleStatus = <p className="title">{filterStatuses[1].status}</p>
        const status: string | undefined = listToDoStatuses.find(
          (status: string) => status === filterStatuses[1].status
        )
        if (status === undefined) {
          dispatch(addListStatuses(filterStatuses[1].status))
        }
        break
      }
      case "3": {
        titleStatus = <p className="title">{filterStatuses[2].status}</p>
        const status: string | undefined = listToDoStatuses.find(
          (status: string) => status === filterStatuses[2].status
        )
        if (status === undefined) {
          dispatch(addListStatuses(filterStatuses[2].status))
        }
        break
      }
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const indexStatus = parseInt(event.target.id.split(/[ ,]+/)[1])
    const listToDoStatuses = document.querySelectorAll(".filter .todo-status input[type=checkbox]")
    if (listToDoStatuses.length >= 1) {

      // Clear CheckBoxes
      for (let index = 0; index < listToDoStatuses.length; index++) {
        if (listToDoStatuses[index].id !== event.target.id) {
          const element = document.getElementById(listToDoStatuses[index].id) as HTMLInputElement
          if (!(element === null)) {
            element.checked = false
          }
        }
      }

      // New Status
      if (event.target.checked) {
        if (filterStatuses !== undefined) {
          dispatch(setCurrentStatus(filterStatuses[indexStatus - 1].status))
        }
      } else dispatch(setCurrentStatus(""))
    }
  }

  let content
  if (isLoading) {
    content = <div id="skeleton-status" />
  } else if (isError) {
    if ("status" in error) {
      const errorMessage = "error" in error ? error.error : JSON.stringify(error.data)
      console.log(error)
      content = <p id="error-status">{errorMessage}</p>
    }
  } else if (isSuccess) {
    content = 
      <>
        <div className="todo-status">
          {titleStatus}
          <input type="checkbox" id={`switch ${id}`} onChange={(event) => handleChange(event)} />
          <label className={`switch ${id}`} htmlFor={`switch ${id}`}></label>
        </div>
      </>
  }

  return content
}
