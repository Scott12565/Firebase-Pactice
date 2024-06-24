import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firbase-config/firebase";

const GetDocs = () => {
    const [filesData, setFilesData] = useState([]);

    console.log(filesData);
    const displayData = async () => {
        const querySnapShot = await getDocs(collection(db, 'myFilesData'));
        const data =  querySnapShot.docs.map(doc => {
            console.log(doc.data());
            return {
                id: doc.id,
                ...doc.data(),
            }
        });

        setFilesData(data);
        // console.log(filesData)
    }
    useEffect(() => {
        displayData();
}, [])

    return ( 
        <div>
            {
                filesData.map(file => (
                    <div key={file.id}>
                        <h1>{file.name}</h1>
                        <p>{file.author}</p>
                        <img src={file.url} alt={file.name} style={{
                            width: '100%',
                            height: '500px'
                        }} />
                    </div>
                ))
            }
        </div>
     );
}
 
export default GetDocs;