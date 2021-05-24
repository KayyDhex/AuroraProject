import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Button, FormControl, InputLabel, makeStyles, MenuItem, Select, TextField, Box } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router";

const emailDB = [
    { id: 0, email: "hanscorca@unisabana.edu.co" },
    { id: 1, email: "chrisrodca@unisabana.edu.co" },
    { id: 2, email: "josephrogo@unisabana.edu.co" },
    { id: 3, email: "carolpaga@unisabana.edu.co" },
    { id: 4, email: "jorgelepra@unisabana.edu.co" },
    { id: 5, email: "almapizo@unisabana.edu.co" },
    { id: 6, email: "celiacrube@unisabana.edu.co" },
    { id: 7, email: "emanuelalva@unisabana.edu.co" },
    { id: 8, email: "santiagogamin@unisabana.edu.co" },
];

const useStyles = makeStyles((theme) => (
    {
        root: {
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column'
        },
        field: {
            minWidth: '40%',
            marginTop: 10,
            marginBottom: 10
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: '40%',
        }
    }
));

export default function AddUserForm() {

    const history = useHistory();
    const classes = useStyles();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [lastAcces] = useState("20-05-2021");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [area, setArea] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ name: { firstName, lastName }, email, lastAcces, password, role, area })
        }).then(() => history.goBack());
    };

    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <TextField
                onChange={(e) => { setFirstName(e.target.value) }}
                value={firstName}
                className={classes.field}
                label='Nombre'
                variant='outlined'
                required
            />
            <TextField
                onChange={(e) => { setLastName(e.target.value) }}
                value={lastName}
                className={classes.field}
                label='Apellido'
                variant='outlined'
                required
            />
            <FormControl className={classes.formControl}>
                <InputLabel>Correo Unisabana</InputLabel>
                <Select
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                    required>
                    {emailDB.map((value) => (
                        <MenuItem value={value.email}>{value.email}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                onChange={(e) => { setPassword(e.target.value) }}
                value={password}
                className={classes.field}
                required
                label="contraseña"
                type="password"
                variant="outlined"
            />
            <Box>
                <FormControl className={classes.formControl}>
                    <InputLabel>Rol</InputLabel>
                    <Select
                        value={role}
                        onChange={(e) => { setRole(e.target.value) }}
                        required>
                        <MenuItem value='Administrador'>Administrador</MenuItem>
                        <MenuItem value='Lider'>Lider</MenuItem>
                        <MenuItem value='Project Manager'>Project Manager</MenuItem>
                        <MenuItem value='PAT'>PAT</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel>Area</InputLabel>
                    <Select
                        value={area}
                        onChange={(e) => { setArea(e.target.value) }}
                        required>
                        <MenuItem value='Produccion'>Produccion</MenuItem>
                        <MenuItem value='Diseño Instrucional'>Diseño Instrucional</MenuItem>
                        <MenuItem value='Proyectos'>Proyectos</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Button
                type="submit"
                color="primary"
                variant="contained"
                endIcon={<ArrowForwardIosIcon />}>
                Crear
            </Button>

        </form>
    );
}