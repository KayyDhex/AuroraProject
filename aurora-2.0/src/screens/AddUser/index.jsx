import { Container, Typography } from "@material-ui/core";
import AddUserForm from "./components/AddUserForm"
export default function AddUser(){
    return(
        <Container>
            <Typography>Nuevo Usuario</Typography>
            <AddUserForm /> 
        </Container>
    );
}