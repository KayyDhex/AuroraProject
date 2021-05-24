import { AppBar, Box, Button, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import logo from "../assets/images/logo.png"

const useStyles = makeStyles((theme) => {
    return ({
        root: {
            display: 'flex',
            margin: 0,
        },
        buttons: {
            display: "flex",
            width: '100%',
            padding: 8,
            justifyContent: 'flex-end',
            alignItems: "flex-end",
            marginRight: 20
        },
        button:{
            marginLeft: theme.spacing(2)
        },
        page: {
            backgroundColor: '#f9f9f9',
            width: '100%',
        },
        logo: {
            maxWidth: '190px',
            marginRight: '20px'
        },
        toolbar: theme.mixins.toolbar,
        appbar:{
            backgroundColor: 'transparent'
        }

    });
});

export default function NavBar() {

    const classes = useStyles();
    const history = useHistory();

    return (
            <AppBar className={classes.appbar}>
                <Toolbar>
                    <img src={logo} alt="Unisabana E-Learning" className={classes.logo} />
                    <Box className={classes.buttons}>
                        <Button color="secondary" className={classes.button}>Inicio</Button>
                        <Button color="secondary" className={classes.button}>Ventajas</Button>
                        <Button color="secondary" className={classes.button}>Acerca</Button>
                        <Button variant="contained" color="secondary" className={classes.button} onClick={()=>{history.push('/login')}}>Acceder</Button>
                    </Box>
                </Toolbar>
            </AppBar>
    );
}