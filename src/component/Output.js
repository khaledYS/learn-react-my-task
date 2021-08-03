import { useEffect } from 'react';
import {v4 as ranUID} from 'uuid';
const Output = ({allTasks, handleDelete, ToConsole}) => {
  useEffect(()=>{
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

  },[allTasks]);
}

export default Output;