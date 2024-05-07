import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { setToDoNotificationModal } from "../../../features/todo/toDoNotificationSlice"
import "../../../assests/style/todo/notification/notification.scss"


export const NotificationToDoView = () => {
  const notification = useAppSelector((state) => state.toDoNotification.modalNotificationToDo)
  const notificationText = useAppSelector((state) => state.toDoNotification.modalNotificationTextToDo)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (notification) {
      document.getElementById("todo-notification")!.style.opacity = "1";
      const timer = setTimeout(
        () => {
          dispatch(setToDoNotificationModal({
            status: !notification,
            text: ""
          }))
        }, 3000
      )
      return () => clearTimeout(timer)
    } else document.getElementById("todo-notification")!.style.opacity = "0";
  }, [notification])

  return (
    <div id="todo-notification">
      <p>{notificationText}</p>
    </div>
  )
}
