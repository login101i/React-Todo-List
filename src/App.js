import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, FormControl, InputLabel, Input, FormHelperText } from '@material-ui/core';
import Todo from './components/Todo'
import { db } from './firebase';
import firebase from "firebase"
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({


  buttonAdd: {
    width: 150,
    margin: "10px",
    backgroundColor: 'green',
    color:"white",
  },
})
)


function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState("")

  const classes = useStyles();




  console.log(todos)

  // when the app loads, we need to listen to database and then we get some data using fetch, 
  useEffect(() => {
    // fires when app is loaded
    db.collection('todos').orderBy("timestamp", "desc").onSnapshot(snapshot => {
      // console.log(snapshot.docs.map(doc => doc.data().todos))
      // console.log(snapshot.docs.map(doc => doc.data()))
      setTodos(snapshot.docs.map(doc => ({ id: doc.id, todo: doc.data().todo })))
    })
  }, [])

  // Function on button to add todo
  const addTodo = (Event) => {
    Event.preventDefault();

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setInput("");
  }



  return (
    <div className="App">
      <h1 className="App-header">Todo List </h1>

      {/* Wraping up in form to make sure enter key will submiting the form  */}
      <form className="form">
        <FormControl>
          {/* <InputLabel><span role="img" aria-label="emoji"> </span> Write here</InputLabel> */}
          <InputLabel>  Write here</InputLabel>
          <Input autoCapitalize={true} value={input} onChange={event => setInput(event.target.value)} />
          <FormHelperText>Thank you for using this form.</FormHelperText>
        </FormControl>

        {/* using material ui */}
        <Button className={classes.buttonAdd} disabled={!input} type="submit" variant="contained" onClick={addTodo}>
          Add
        </Button>
      </form>
      <ul className="listContainer">
        {todos.map(todo => (
          <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
