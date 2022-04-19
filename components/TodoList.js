import { useContext, useEffect,useState } from "react";
import { collection,onSnapshot,query,orderBy } from "firebase/firestore";
import { db } from "../firebase";
import Todo from "./Todo";
import { Typography } from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";
import { where } from "firebase/firestore";


export default function TodoList(){
    
   const {currentUser}=useContext(AuthContext)

    const [todos,setTodos]=useState([])

    useEffect(()=>{
        const ref=collection(db,"todo")
        const q=query(ref,where("kullaniciEmail","==",currentUser?.email),orderBy("tarih","desc"))

        const unsub=onSnapshot(q,(snap)=>{
            

            setTodos(snap.docs.map(doc=>(
                {...doc.data(),id:doc.id,tarih:doc.data().tarih?.toDate().getTime()}
                
            )))
        })
        return unsub 
    },[])
    return(
        <div>
            {todos.length===0 ? (
                <Typography sx={{mt:4}} variant="h5">HENÜZ TODO EKLENMEDİ</Typography>
            ):(
                <Typography sx={{mt:4}} variant="h5">TODO LİSTESİ</Typography>
            )}
            {todos.map(todo=><Todo key={todo.id}  todo={todo}/>)}
        </div>
    )
}