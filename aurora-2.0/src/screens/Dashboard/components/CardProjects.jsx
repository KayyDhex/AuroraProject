import { Container, Typography, Paper, makeStyles, Card, CardContent, CardActionArea, CircularProgress, Box, Grid } from "@material-ui/core";
import { useHistory } from "react-router";
import TagComponent from "../../../components/others/TagComponent";


function CircularProgressWithLabel(props) {
    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress variant="determinate" {...props} />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="button" component="div" color="textSecondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

const useStyles = makeStyles((theme) => ({
    card: {
        marginLeft: 10,
        width: 300,
        height: 130
    },
    tag: {
        width: 80,
        padding: 2,
        textAlign: 'center',
        backgroundColor: '#2196F3',
        color: 'white'
    },
    tag1: {
        width: 80,
        padding: 2,
        textAlign: 'center',
        backgroundColor: '#FF9800',
        color: 'white'
    },
    tag2: {
        width: 80,
        padding: 2,
        textAlign: 'center',
        backgroundColor: '#F44336',
        color: 'white'
    },
    progressCircle: {
        justifyContent: 'flex-end',
        alignItems: "flex-end",
    },
    box: {
        display: 'flex',
        flexDirection: 'column'
    }
}));

export default function CardProjects({ id, name, lastDate, nextTask, progress, tag }) {

    const classes = useStyles();
    const history = useHistory();
    return (
        <Card className={classes.card}>
            <CardActionArea onClick={() => history.push(`/projects/project-detail/${id}`)}>
                <CardContent>
                    <TagComponent tag={tag} classes={classes} />
                    <Typography color="textSecondary" variant='h6' noWrap>{name}</Typography>
                    <Grid alignItems="stretch"
                        className={classes.root}
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                        xs>
                        <Box display='flex' className={classes.box}>
                            <Typography noWrap variant='caption'>{lastDate}</Typography>
                            <Typography noWrap variant='caption'>Siguiente Tarea: {nextTask}</Typography>
                        </Box>
                        <CircularProgressWithLabel variant="determinate" value={progress} className={classes.progressCircle} />
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}