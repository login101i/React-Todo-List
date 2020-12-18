
import React, { useState } from "react";
import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Button,
    Modal,
    Input,
} from "@material-ui/core";
import './todo.css'
import { db } from '../firebase'
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import FlipMove from 'react-flip-move';


const useStyles = makeStyles((theme) => ({
    modal: {
        position: "absolute",        // position: "center",
        minWidth: 400,
        maxWidth:800,
        borderRadius: 17,
        backgroundColor: theme.palette.background.paper,
        // border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),

        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)',
        border: 'none',
        
    },

    button: {
        width: 150,
        // border: '2px solid #000',
        margin: "10px",
    },
    buttonUpdate: {
        width: 150,
        // border: '2px solid #000',
        margin: "10px",
        backgroundColor: 'green',
        color: 'white'
    },
    head: {
        textAlign: 'center'
    },
    input: {
        height: 25,
        marginRight: 33
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemText: {
        textTransform: 'capitalize'
    }
}));

function Todo(props) {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState();

    const classes = useStyles();


    const handleOpen = () => {
        setOpen(true);
    };

    const updateTodo = () => {
        // update the todo with the new input
        db.collection("todos").doc(props.todo.id).set(
            {
                todo: input,
            },
            { merge: true }
        );
        setOpen(false);
    };

    const customLeaveAnimation = {
        from: { transform: 'scale(1, 1)' },
        to: { transform: 'scale(0.5, 1) translateY(-20px)' }
    };

    return (
        <>
            <Modal open={open} onClose={(e) => setOpen(false)}>
                <div className={classes.modal}>
                    <h2 className={classes.head}>Update  Task</h2>
                    <div className={classes.container}>

                        <input
                            placeholder={props.todo.todo}
                            value={input}
                            onChange={(Event) => setInput(Event.target.value)}
                            className={classes.input}
                        />
                        <Button
                            variant="contained"
                            color="default"
                            onClick={updateTodo}
                            className={classes.buttonUpdate}
                            disabled={!input}
                        >
                            Upload ✔
                       </Button>
                    </div>
                </div>
            </Modal>
            <FlipMove leaveAnimation={customLeaveAnimation}>
                <div className="todoList__container">
                    <List className="todo__list">
                        <ListItem>
                            <ListItemAvatar></ListItemAvatar>
                            <ListItemText className={classes.itemText} primary={props.todo.todo} />
                        </ListItem>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={(Event) =>
                                db.collection("todos").doc(props.todo.id).delete()
                            }
                            className={classes.button}
                            startIcon={<DeleteIcon />}
                        >
                            Delete
                           </Button>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={(e) => setOpen(true)}
                            className={classes.button}
                            endIcon={<EditIcon>send</EditIcon>}
                        >
                            Edit
                                 </Button>

                        {/* <Button className="edit__btn" onClick={e => setOpen(true)}>Edit</Button> */}
                        {/* <DeleteForeverIcon onClick={Event =>db.collection('todos').doc(props.todo.id).delete()}>❌Delete</DeleteForeverIcon> */}
                    </List>
                </div>
            </FlipMove>
        </>
    );
}

export default Todo;
