import { Container, Typography } from "@material-ui/core";
import AddTaskForm from "./components/AddTaskForm";
import { useParams } from "react-router";
import UserContext from "../../context/user";
import { useContext } from "react";

export default function AddTask() {
    const { getProjectDetail, projectDetail, getUsers, users } = useContext(UserContext);
    return (
        <Container>
            <Typography>Nueva tarea</Typography>
            <AddTaskForm />
        </Container>
    );
}