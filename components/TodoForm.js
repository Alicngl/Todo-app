import { TextField,Button,Typography } from "@mui/material";
import { useState,useContext } from "react";
import { db } from "../firebase";
import { collection,addDoc,serverTimestamp } from "firebase/firestore";
import { TodoContext } from "../contexts/TodoContext"; 
import { AuthContext } from "../contexts/AuthContext";

export default function TodoForm(){

    const {showAlert}=useContext(TodoContext)
    const {currentUser}=useContext(AuthContext)

    const [todo,setTodo]=useState({
        baslik:"",
        aciklama:""
    })

    const handleClick=async(e)=>{
        if(todo.baslik=="" || todo.aciklama==""){
            showAlert("error","başlık yada açıklama boş geçilemez")
            return
        }
        //console.log(todo);
        const ref=collection(db,"todo")
        const docRef=await addDoc(ref,{...todo,kullaniciEmail:currentUser.email,tarih:serverTimestamp()})
        setTodo({ baslik:"",aciklama:""})
        showAlert("success",`${docRef.id} id li todo eklendi`)
        console.log("başardın yakışıklı");
    }
    return(
        <div>
            <Typography sx={{mt:1, fontWeight:"bold"}} variant="h5">YENİ TODO EKLE</Typography>
            <TextField label={"Başlık"} fullWidth sx={{mt:3}} onChange={e=>setTodo({...todo,baslik:e.target.value})} value={todo.baslik}></TextField>
            <TextField label={"Açıklama"} fullWidth sx={{mt:3}} onChange={e=>setTodo({...todo,aciklama:e.target.value})} value={todo.aciklama}></TextField>
            <Button variant="outlined" color="primary" sx={{mt:3}} onClick={handleClick}>Kaydet</Button>
        </div>
    )
}
