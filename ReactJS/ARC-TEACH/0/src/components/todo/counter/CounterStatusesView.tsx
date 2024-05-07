import { filterStatusesApiSlice } from "../../../features/api/endpoints/filterStatuses"
import '../../../assests/style/skeleton/todo/counter/counter.scss'
import '../../../assests/style/error/todo/counter/counter.scss'
import '../../../assests/style/todo/counter/counter.scss'


export const CounterStatusesView = () => {
  const {  // RTK Query : Filter Statuses for ToDo
    data: filterStatuses,
    isLoading,
    isSuccess,
    isError,
    error
  } = filterStatusesApiSlice.useGetFilterStatusesQuery()

  let content
  if (isLoading) {
    content =
      <div id="skeleton-todo-counter-status">
        <div id="skeleton-counter-status" />
        <div id="skeleton-counter-status" />
        <div id="skeleton-counter-status" />
      </div>
  } else if (isError) {
    if (error !== undefined) {
      if ("status" in error) {
        const errorMessage = "error" in error ? error.error : JSON.stringify(error.data)
        content = <p id="error-counter-status">{errorMessage}</p>
      }
    }
  } else if (isSuccess) {
    if (filterStatuses !== undefined) {
      content = 
        <>
          <div id="todo-counter-status">
            <p>
              {filterStatuses[0].status}:&nbsp;
              <span>{filterStatuses[0].counterStatus}</span>
            </p>
            <p>
              {filterStatuses[1].status}:&nbsp;
              <span>{filterStatuses[1].counterStatus}</span>
            </p>
            <p>
              {filterStatuses[2].status}:&nbsp;
              <span>{filterStatuses[2].counterStatus}</span>
            </p>
          </div>
        </>
    }
  }

  return content
}
