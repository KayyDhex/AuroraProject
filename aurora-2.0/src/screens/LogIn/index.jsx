import { Box, Container, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import LoginForm from "./components/LoginForm";
import LoginToken from "./components/LoginToken";

const useStyle = makeStyles((theme) => {
    return ({
        root: {
            backgroundColor: 'primary',
            width: '100%',
            height: '100vh'
        },
    });
});

export default function LogIn() {

    const classes = useStyle();

    return (
        <Box bgcolor='primary.main'>
            <Grid
                alignItems="stretch"
                className={classes.root}
                container
                direction="row"
                justify="center"
                alignItems="center">
                <LoginToken />
                <LoginForm />
            </Grid>
        </Box>
    );
}