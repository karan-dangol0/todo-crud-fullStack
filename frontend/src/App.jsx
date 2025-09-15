import "./App.css";
import { FaTrash } from "react-icons/fa";
import { MdCancel, MdLogoDev } from "react-icons/md";
import { MdOutlineDoneOutline } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { showError } from "./helper";

// import { ShinyText , TextPressure} from "react-bits";

const App = () => {
  const [taskValue, setTaskValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingValue, setEditingValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const getTask = async () => {
    try {
      {
        /*const url = "http://localhost:3000/" 
      const res = await fetch(url, {
        method: "GET",
      });

      const data = await res.json();
      */
      }

      // const res = await axios.get("http://localhost:3000/");
      
      const res = await axios.get("https://todo-crud-full-stack-six.vercel.app/");
      //

      setTasks(res.data.data); // _id task completed createdAt updatedAt

      //
    } catch (error) {}
  };
  useEffect(() => {
    getTask();
  }, []);

  const handleChange = (e) => {
    setTaskValue(e.target.value);
  };
  
  const handleEditChange = e => {
    setEditingValue(e.target.value);
  }

  const handleDbClick = task => {
    setEditingId(task._id);
    setEditingValue(task.task);
  }

  const handleSubmit = async () => {
    
    if (taskValue.trim() === "") {

      showError("Enter a todo!")
      return;
    };
    try {
      setLoading(true);
      // const url = "http://localhost:3000/";
      const url = "https://todo-crud-full-stack-six.vercel.app/";

      let res = await axios.post(url, {
        task: taskValue,
        completed: false,
      });
      // const { data: { success, message, error } } = res;
      // const { data } = res; 
      console.log(res);
      

      // console.log(data);

      //
      getTask();
    } catch (error) {
      console.log(error);
      if (error.status === 429) {
        showError("Too many request! Try again after 1min");
      } else {
        
        showError("Enter a longer Task name! ", error);
      }
    } finally {
      setLoading(false);
    }
  };
  

  const handleDelete = async (id) => {
    try {
      // const url = `http://localhost:3000/${id}`;
      const url = `https://todo-crud-full-stack-six.vercel.app/${id}`;
      const res = await axios.delete(url);
      getTask();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditSubmit = async (id) => {
    try {
      // const url = `http://localhost:3000/${id}`;
      const url = `https://todo-crud-full-stack-six.vercel.app/${id}`;
      const res = await axios.put(url, {
        task: editingValue,
         
      })
      setEditingId(null);
      getTask();
    } catch (error) {
      console.log(error);
       
    }
  }

  const handleComplete = async (id) => {
    try {
      await axios.put(id, {
        completed: true,
      });
      getTask();
    } catch (error) {
      showError("Something went Wrong!"); 
    }

  }
  return (
    <>
      {/* {tasks?.map(task => (
        <ul>
          <ol key={task._id}>{task.task}</ol>
        </ul>
      ))}*/}

      <div className="min-h-screen bg-gray-200  flex flex-col items-center justify-center">
        <p className="text-gray-400 absolute rotate-y-45 top-[200px]">Pro tip! Double click todo to edit</p>
        <h1 className="text-9xl text-red-5 mt-40 mb-10 ">Just do it!</h1>

        <div className="flex flex-col items-center w-full px-4">
          <div className="flex w-full max-w-[500px] gap-3 flex-wrap sm:flex-nowrap">
            <input
              type="text"
              name=""
              id=""
              className="border border-gray-500 px-5  max-w-[500px] w-full rounded-2xl bg-white text-gray-700"
              value={taskValue}
              onChange={handleChange}
            />
            <button
              className="bg-blue-400 px-5 py-3 text-white rounded-2xl ml-5 transition duration-200 hover:bg-blue-500"
              onClick={handleSubmit}
              // disabled={!taskValue.trim() || loading}
            >
              {/*{loading ? "loading..." : "Do it!"}*/}
              Do it
            </button>
          </div>

          <div className="max-w-[200px] mt-10 justify-center  select-none ">
            <ul className="flex items-center justify-center flex-col ">
              {tasks?.map((task) => (
                <li className={`flex flex-row items-center m-2 ${task.completed ? "line-through" : "line-none"}`} key={task._id}>

                  {editingId === task._id ? (
                   <input type="text" value={editingValue} onChange={handleEditChange} onBlur={()=> handleEditSubmit(task._id)} onKeyDown={(e) => e.key === "Enter" && handleEditSubmit(task._id)}  autoFocus /> 
                  ) : (
                  <span onDoubleClick={() => handleDbClick(task)}>{task.task}</span>
                  )}
                
                  

                  <span onClick={() => handleDelete(task._id)}>
                    <FaTrash className="ml-4" />
                  </span>{" "}
                  <span onClick={() => handleComplete(task._id)}>
                    <MdOutlineDoneOutline className="ml-2" />
                  </span>


                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <ToastContainer limit={33333} />
    </>
  );
};

export default App;
