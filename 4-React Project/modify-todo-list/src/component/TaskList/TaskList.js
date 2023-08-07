import React, { memo } from "react";

const TaskList = (props) => {
  const {
    tasks,
    deleteHandler,
    editHandler,
    clearTaskHandler,
    filterTaskHandler,
    filteredTasks,
  } = props;
  return (
    <div className="card-action">
      <h5 id="task-title">Tasks</h5>
      <div className="input-field col s12">
        <input
          type="text"
          name="filter"
          id="filter"
          onChange={filterTaskHandler}
        />
        <label>Filter Task</label>
      </div>

      <ul className="collection">
        {filteredTasks.length > 0 &&
          filteredTasks.map((singleTask, index) => {
            return (
              <li className="collection-item" key={index}>
                {singleTask}
                <a
                  href="/"
                  className="delete-item secondary-content"
                  onClick={(event) => deleteHandler(event, index)}
                >
                  <i className="fa fa-remove"></i>
                </a>
                <a
                  href="/"
                  className="edit-item secondary-content"
                  onClick={(event) => editHandler(event, index)}
                >
                  <i className="fa fa-edit"></i>
                </a>
              </li>
            );
          })}
      </ul>
      <a href="/" className="clear-tasks btn black" onClick={clearTaskHandler}>
        Clear Task
      </a>
    </div>
  );
};

export default memo(TaskList);
