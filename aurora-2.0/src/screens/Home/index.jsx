import { Box, Container, makeStyles, Typography } from "@material-ui/core";
import Image from "../../assets/images/bg.png";
import NavBar from "../../components/NavBar";
import "./style.css"
const useStyles = makeStyles((theme) => {
    return ({
        Home: {
        },
        sectionOne: {
            margin: 0,
            padding: 0,
            width: '100vw',
            height: '100vh',
            backgroundImage: `url(${Image})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            alignItems: 'center',
            justifyContent: 'center'
        },
        containerFirst: {
            display: 'flex',
            flexDirection: 'row'
        },
        title:{
            marginLeft: 20
        },
        sectionTwo: {
            margin: 0,
            padding: 0,
            width: '100vw',
            height: '100vh',
            textAlign: 'center'
        }
    });
});

export default function Home() {
    const classes = useStyles();

    return (
        <div className={classes.Home}>
            <NavBar />
            <Box className={classes.sectionOne} display="flex" justifyContent="center" m={1} p={1}>
                <Typography variant='h1' color='secondary' className={classes.title}>Proyecto Aurora</Typography>
                <Container className={classes.containerFirst}>
                    <Typography variant='h6' color='secondary'>El Proyecto Aurora es un sistema de información contemplado para apoyar los procesos de producción de productos digitales de UniSabana e-learning</Typography>
                </Container>
            </Box>
            <Box className={classes.sectionTwo}>
                <Typography variant="h2">Ventajas</Typography>
            </Box>
        </div>);
}