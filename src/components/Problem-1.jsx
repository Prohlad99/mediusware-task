import React, { useState } from "react";

const Problem1 = () => {
  const [show, setShow] = useState("all");
  const [formData, setFormData] = useState({ name: "", status: "" });
  const [activeTasks, setActiveTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [otherTasks, setOtherTasks] = useState([]);

  //   taking input data
  const handleInputChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

//   handling from submission 
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      name: formData.name,
      status: formData.status.toLowerCase(),
    };

    switch (newTask.status) {
      case "active":
        setActiveTasks([...activeTasks, newTask]);
        break;
      case "completed":
        setCompletedTasks([...completedTasks, newTask]);
        break;
      default:
        setOtherTasks([...otherTasks, newTask]);
        break;
    }

    setFormData({ name: "", status: "" });
  };

  const handleFilter = (val) => {
    setShow(val);
  };

//   all tasks 
  const getAllTasks = () => {
    return [...activeTasks, ...completedTasks, ...otherTasks];
  };

//   row rendering 
  const renderRows = () => {
    let tasksToRender;

    switch (show) {
      case "active":
        tasksToRender = activeTasks;
        break;
      case "completed":
        tasksToRender = completedTasks;
        break;
      default:
        tasksToRender = getAllTasks();
        break;
    }

    return tasksToRender.map((task, index) => (
      <tr key={index}>
        <td>{task.name}</td>
        <td>{task.status}</td>
      </tr>
    ));
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            className="row gy-2 gx-3 align-items-center mb-4"
            onSubmit={handleSubmit}
          >
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => handleInputChange(e, "name")}
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Status"
                value={formData.status}
                onChange={(e) => handleInputChange(e, "status")}
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleFilter("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleFilter("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleFilter("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>{renderRows()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
