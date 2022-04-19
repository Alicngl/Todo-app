import { ListItemText,ListItem,IconButton } from "@mui/material";
import moment from "moment";
import "moment/locale/tr"
import { deleteDoc,doc } from "firebase/firestore";
import { db } from "../firebase";
import {Delete,MoreVert} from "@mui/icons-material"
import { TodoContext } from "../contexts/TodoContext"; 
import { useContext } from "react";
import { useRouter } from "next/router";

export default function Todo({todo}){

    const router=useRouter()
    const {tarih,aciklama,baslik,id}=todo
    const {showAlert}=useContext(TodoContext)
    

    const handleDelete=async(id,e)=>{
        e.preventDefault()
        const ref=doc(db,"todo",id)
        await deleteDoc(ref)
        showAlert("warning","Belge Silindi !")
        console.log("aferin takımyıldızı");
    }

    const handleMOre=(id,e)=>{
        router.push(`/todos/${id}`)
    }
    return(
        <div >
            <ListItem sx={{mt:3, boxShadow:3}} style={{backgroundColor:"#fafafa"}}
            secondaryAction={
                <>
                    <IconButton onClick={(e)=>handleDelete(id,e)}>
                        <Delete/>
                    </IconButton>
                    <IconButton onClick={(e)=>handleMOre(id,e)}>
                        <MoreVert/>
                    </IconButton>
                </>
            }>
                <ListItemText primary={baslik} secondary={moment(tarih).format("LLL")} />
            </ListItem>
        </div>
    )
}