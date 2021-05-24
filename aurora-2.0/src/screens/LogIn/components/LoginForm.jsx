import { Box, Button, InputAdornment, makeStyles, Paper, TextField, Typography } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link, useHistory } from "react-router-dom";
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { useState, useContext, useEffect } from "react";
import UserContext from "../../../context/user";
const useStyle = makeStyles((theme) => {
    return ({
        root: {
            textAlign: 'center'
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            margin: theme.spacing(3),
            alignItems: 'center'
        },
        textInput: {
            margin: 10
        },
        title: {
            margin: 20
        }
    });
});

export default function LoginForm() {

    const classes = useStyle();
    const { login, logout, userActive } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);
    const history = useHistory();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3000/users')
            .then(res => res.json())
            .then(data => setUsers(data));
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        users.map((value) => {
            if (value.email === username && value.password === password) {
                login(value);
                history.push('/dashboard');
            } else {
                handleClickOpen();
            }
        });
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box width='30%' height='50%'>
            <Paper elevation={3} variant="outlined" className={classes.root} square>
                <Typography variant='h6' className={classes.title}>Accede con tu cuenta normal</Typography>
                <form className={classes.form} autoComplete="off" onSubmit={handleSubmit}>
                    <TextField
                        className={classes.textInput}
                        value={username}
                        onChange={(e) => { setUsername(e.target.value) }}
                        required id="userNameInput"
                        label="Nombre de usuario..."
                        type="email"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <AccountCircle color='primary' />
                                </InputAdornment>
                            )
                        }}
                    />
                    <TextField
                        className={classes.textInput}
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        required label="contraseña"
                        type="password"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <VpnKeyIcon color='primary' />
                                </InputAdornment>
                            )
                        }}
                    />
                    <Button color='primary'><Typography variant='caption'>¿has olvidado tu contraseña?</Typography></Button>
                    <Button variant="contained" color="primary" type='submit'>Ingresar</Button>
                </form>
            </Paper>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Error al ingresar"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Usuario y/o Contraseña incorrectos. Por favor, vuelva a intentarlo.
                        </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>Aceptar</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}