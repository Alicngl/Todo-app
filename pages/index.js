import {
  Container,
  Snackbar,
  Alert,
  Typography,
  Box,
  Button,
  Avatar,
} from "@mui/material";
import Head from "next/head";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { TodoContext } from "../contexts/TodoContext";
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { auth } from "../firebase";

export default function Home() {
  const { currentUser } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("succes");
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = (type, msg) => {
    setAlertMessage(msg);
    setAlertType(type);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <TodoContext.Provider value={{ showAlert }}>
      <Container maxWidth="md">
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Avatar src={currentUser.photoURL} />
          <Typography>{currentUser.displayName}</Typography>
          <Button variant="contained" onClick={() => auth.signOut()}>
            Çıkış
          </Button>
        </Box>
        <TodoForm />
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={alertType}
            sx={{ width: "100%" }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
        <TodoList />
      </Container>
    </TodoContext.Provider>
  );
}
