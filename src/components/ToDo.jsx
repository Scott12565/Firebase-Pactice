import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firbase-config/firebase";

const ToDo = () => {

    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([])

    const handldeTaskAdd = async (e) => {
        e.preventDefault();
        if(task.trim() === '') return;
        try {
            await addDoc(collection(db, 'myToDos'), { task })
            setTasks((prevTasks) => [...prevTasks, { task }]);
            setTask('');
            console.log('Task added:', task);
        } catch (err) {
            console.log(err.message)
        }
        setTask('')
        console.log(tasks)
    }

    const getTodos = async () => {
        const querySnapShot = await getDocs(collection(db, 'myToDos'))
        const todo = querySnapShot.docs.map(doc => doc.data())
        setTasks(todo);
    }

    getTodos();
    // useEffect(() => {
        
    // }, [tasks]);
    
    return ( 
        <>
            <div>
                <div style={{
                    width: '100%'
                }}>
                    <h3>create a list</h3>
                    <div className="form-group" style={{
                        width: '100%',
                        padding: '10px'
                    }}>
                        <form className="form-control" onSubmit={handldeTaskAdd}>
                            <label htmlFor="name">Enter task</label>
                            <input type="text" placeholder="Enter task here" value={task} onChange={e => setTask(e.target.value)} />
                            <button>Add</button>
                        </form>
                    </div>
                </div>

                <div className="tasks">
                    <ul>
                        {
                            tasks.map((todo, index) => (
                                <li key={index}>
                                    <p>{todo.task}</p>
                                    <span>&times;</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </>
     );
}
 
export default ToDo;