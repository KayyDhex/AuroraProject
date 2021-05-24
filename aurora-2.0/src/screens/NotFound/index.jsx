import { Box, makeStyles, Typography } from "@material-ui/core";

const useStyle = makeStyles((theme) => {
    return ({
        NotFound: {
            margin: 0,
            top: 0,
            backgroundColor: 'rgba(31, 54, 106, 1)',
            width: "100vw",
            height: "100vh"
        },
    });
});

export default function NotFound() {

    const classes = useStyle();

    return (
        <div className={classes.NotFound}>
            <Box display="flex" justifyContent="center" m={1} p={1}>
                <Typography variant="h1">404 Not Found</Typography>
            </Box>
        </div>);
}