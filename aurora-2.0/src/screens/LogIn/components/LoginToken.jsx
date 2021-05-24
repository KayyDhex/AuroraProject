import { Box, Button, InputAdornment, makeStyles, Paper, TextField, Typography } from "@material-ui/core";
import Image from "../../../assets/images/team-bro.png"
const useStyle = makeStyles((theme) => {
    return ({
        root:{
            textAlign: 'center'
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            margin: theme.spacing(3),
            alignItems: 'center'
        },
        textInput:{
            margin: 10
        },
        title:{
            margin:20
        }
    });
});

export default function LoginToken() {


    const classes = useStyle();
    return (
        <Box width='30%' height='50%'>
            <Paper elevation={3} variant="outlined" className={classes.root} square> 
            <Typography variant='h6' className={classes.title} align='center'>Accede con tu cuenta institucional</Typography>
            <img src={Image} width='160px'/>
            <form className={classes.form}>
                <Button variant="contained" color="primary">Office 360</Button>
            </form>
        </Paper>
        </Box>
    );
}