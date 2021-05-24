import { Container, Typography } from "@material-ui/core";
import AddProjectForm from "./components/AddProjectForm";

export default function AddProject(){
    return(
        <Container>
            <Typography>Nuevo Proyecto</Typography>
            <AddProjectForm />
        </Container>
    );
}