import { NotificationToDoView } from "./components/todo/notification/NotificationToDoView"
import { FilterStatusesView } from "./components/todo/filter/FilterStatusesView"
import { CounterStatusesView } from "./components/todo/counter/CounterStatusesView"
import { ToDoView } from "./components/todo/ToDoView"
import { AddToDoView } from "./components/todo/add/AddToDoView"


function App() {
  return (
    <main>
      <div id="todo-block">
        <NotificationToDoView />
        <h1 id="title">ToDo</h1>
        <div id="todo">
          <div id="status">
            <div className="filter">
              <FilterStatusesView id="1" />
              <FilterStatusesView id="2" />
              <FilterStatusesView id="3" />
            </div>
          </div>
          <div id="list">
            <CounterStatusesView />
            <ToDoView />
          </div>
        </div>
        <AddToDoView />
      </div>
    </main>
  );
}

export default App
