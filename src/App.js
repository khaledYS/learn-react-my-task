import Navbar from './component/Navbar';
import {useState, useEffect} from 'react';
import {v4 as ranUID} from 'uuid';
import './App.css';
import Input from './component/Input';
import Output from './component/Output';

window.addEventListener('DOMContentLoaded', ()=>{
  try {
    JSON.parse(localStorage.getItem('tasks'))
    
      (typeof JSON.parse(localStorage.getItem('tasks')) == "object") ? console.log("true") :
      (typeof JSON.parse(localStorage.getItem('tasks')) != "object") ? localStorage.setItem("tasks",JSON.stringify([])):
        localStorage.setItem("tasks",[]);
  }catch(Err){
    localStorage.setItem("tasks",JSON.stringify([]));
    console.warn("fake ErR")
  }
})


function App() {


  function LSCheck(value){
    if(value === "No Task" || value === "" || value === "No Tasks"){
      return ''
    }else{
      return JSON.parse(value)
    }
  }

  const [allTasks, setAllTasks] =useState(LSCheck(localStorage.getItem('tasks')));

  useEffect(()=>{
    var x = JSON.stringify(allTasks);
    (Object.keys(allTasks).length > 0) ?  localStorage.setItem("tasks", x):localStorage.setItem("tasks", JSON.stringify([]));
    // setAllTasks(JSON.parse(localStorage.getItem('tasks')));
  },[allTasks]);


  function handleAdd(task){
    let taskWOspaces = task.replaceAll(" ", "");
    console.log(`taskWOspaces = ${taskWOspaces}`);
    console.log(`task = ${task}`);
    if(taskWOspaces.length == 0){
      console.log("damn broo u cant insert non thing in here");
    }else{
      let theNewTasks = allTasks;
      theNewTasks.push({id:ranUID() , done : false, task:task});
      setAllTasks(theNewTasks);
      localStorage.setItem('tasks', JSON.stringify(allTasks));
      console.log("54 ", allTasks);
    }
  }

  function handleDelete(id) {
    let theNewTasksWODeleted = allTasks.filter(x => x.id !== id);
    if(Object.keys(theNewTasksWODeleted).length == 0){theNewTasksWODeleted = ""};
    console.log(theNewTasksWODeleted);
    setAllTasks(theNewTasksWODeleted);
    console.log(allTasks);
  }

  function ToConsole(LINE){
    console.log(`hi its me , i went from line ${LINE}`)
  }
  useEffect(()=>{
    console.log("alltasks has changed");
    return(
      <Output handleDelete={handleDelete} ToConsole={ToConsole} allTasks={allTasks} />
      
    )
  },[allTasks])

  const Output = () => {
    if(allTasks !== "" || Object.keys(allTasks).length > 0){
        console.log("i got into", allTasks);
        return (
          <>{
              allTasks.map(x =>(
                <div key={x.id}>{x.task}<button onClick={()=> {handleDelete(x.id)}}>Delete ME</button></div>
              ))
            }
          </>
         )
        
    }else
    {
        return(<div>You DOnt HAve Tasks <br/> Add ONe <br/> WhY nOT ....</div>)
    }

      }

  return (
    <>  
      <Navbar />
      <Input handleAdd={handleAdd}/>
      <Output handleDelete={handleDelete} ToConsole={ToConsole} allTasks={allTasks} />
    </>
  );
}



export default App;
