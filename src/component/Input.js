import { v4 as ranUID } from "uuid";

  const Input = ({ handleAdd}) => {
    return (
      // //  onSubmit={e =>{
      //   addTask(e.target.querySelector('input'), e)
      // }}
      <form onSubmit={(e)=>{
        e.preventDefault();
        handleAdd(e.target.querySelector('input').value);
        e.target.querySelector('input').value = "";
      }}>
        <input placeholder="enter ur task " type="text" className="taskInput"></input>
        <button type="submit" className="taskInputBtm" > send</button>
      </form>
     );
    }
 export default Input;