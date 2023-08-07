import TaskList from "../TaskList/TaskList";
import React, { useState } from "react";
import Swal from "sweetalert2";

const Home = () => {
  const [taskInput, setTaskInput] = useState();
  const [tasks, setTasks] = useState([]);
  const [isEdit, setIsEdit] = useState(null);
  const [filterInput, setFilterInput] = useState();

  const taskInputHandler = (event) => {
    event.preventDefault();
    setTaskInput(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!taskInput) {
      Swal.fire({
        icon: "error",
        title: "Pleae enter the task",
      });
      return;
    }

    if (isEdit === null) {
      addTask();
    } else {
      editTask();
    }
    setTaskInput("");
  };

  const addTask = () => {
    setTasks([...tasks, taskInput]);
  };

  const editTask = () => {
    const currentIndex = isEdit;
    const tempTasks = [...tasks];
    tempTasks[currentIndex] = taskInput;

    setTasks(tempTasks);

    setIsEdit(null);
  };

  const deleteHandler = (event, index) => {
    event.preventDefault();
    Swal.fire({
      title: "Are You Sure?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((resutl) => {
      if (resutl.isConfirmed) {
        const tempTask = [...tasks];
        tempTask.splice(index, 1);
        setTasks(tempTask);
        Swal.fire("Task is deleted successfully");
      } else {
        Swal.fire("Task is not deleted ");
      }
    });
  };

  const editHandler = (event, index) => {
    event.preventDefault();
    setIsEdit(index);
    setTaskInput(tasks[index]);
  };

  const clearTaskHandler = (event) => {
    event.preventDefault();
    if (tasks == "") {
      Swal.fire({
        icon: "error",
        title: "Pleae enter the task",
      });
    } else {
      Swal.fire({
        title: "Are You Sure?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `No`,
      }).then((resutl) => {
        if (resutl.isConfirmed) {
          setTasks([]);
          Swal.fire("Task is deleted successfully");
        } else {
          Swal.fire("Task is not deleted ");
        }
      });
    }
  };
  const filterTaskHandler = (event) => {
    event.preventDefault();
    setFilterInput(event.target.value);
  };
  const filterInputValue = filterInput ? filterInput.toLowerCase() : "";
  const filteredTasks = tasks.filter((singleFilterTask) =>
    singleFilterTask.toLowerCase().includes(filterInputValue)
  );

  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          <div className="card">
            <div className="card-content">
              <span className="card-title">Task List</span>
              <div className="row">
                <form id="task-form" onSubmit={formSubmitHandler}>
                  <div className="input-field col s12">
                    <input
                      type="text"
                      name="task"
                      id="task"
                      onChange={taskInputHandler}
                      value={taskInput}
                    />
                    <label>new task</label>
                  </div>
                  <button
                    className="waves-effect waves-light btn"
                    type="submit"
                  >
                    {isEdit === null ? "Add" : "update"} Task
                  </button>
                </form>
              </div>
            </div>
            {/* TASK LIST */}
            <TaskList
              tasks={tasks}
              deleteHandler={deleteHandler}
              editHandler={editHandler}
              clearTaskHandler={clearTaskHandler}
              filterTaskHandler={filterTaskHandler}
              filteredTasks={filteredTasks}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
