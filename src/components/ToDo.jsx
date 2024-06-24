import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firbase-config/firebase";

const ToDo = () => {

    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([])

    const handldeTaskAdd = async (e) => {
        e.preventDefault();
        if (task.trim() === '') return;
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
        const querySnapShot = await getDocs(collection(db, 'myToDos'));
        const todos = querySnapShot.docs.map(doc => {
            console.log(doc.data());
            return {
                id: doc.id,
                ...doc.data()
            }
        });

        setTasks(todos);
        console.log(todos);
    }

    // getTodos();

    useEffect(() => {
        getTodos();
    }, [])

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'myToDos', id));
            console.log('doc is deleted');
            setTasks(tasks.filter(task => task.id !== id))
        } catch (err) {
            console.log(err.message);
        }
    }
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
                                <li key={index} style={{
                                    display: 'flex',
                                    justifyContent: "space-between",
                                    alignItems: 'center'
                                }}>
                                    <p>{todo.task}</p>
                                    <span style={{
                                        fontSize: '35px',
                                        color: 'red'
                                    }} onClick={() => handleDelete(todo?.id)}>&times;</span>
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