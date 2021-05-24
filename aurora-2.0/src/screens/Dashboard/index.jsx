import { Container, Typography, makeStyles, Button, Box } from "@material-ui/core";
import { useState, useEffect } from "react";
import CardProjects from "./components/CardProjects";
import PowerBI from "./components/PowerBI";
import TaskSection from "./components/TaskSection";


const data=[{name:"Aperturas Cohorte 5",detail:"Aperturas Cohorte 5",checked:true},
{name:"Aperturas Cohorte 5",detail:"Aperturas Cohorte 5",checked:true},
{name:"Aperturas Cohorte 5",detail:"Aperturas Cohorte 5",checked:false},
{name:"Aperturas Cohorte 5",detail:"Aperturas Cohorte 5",checked:true}];


const useStyles = makeStyles((theme) => ({
    root: {
        padding: 0
    },
    carousel: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        marginBottom: 10
    },
    taskSection: {
        marginTop: theme.spacing(3)
    },
    title: {
        marginTop: theme.spacing(3)
    },
    btnShowMore: {
        width: '100%',
        display: "flex",
        justifyContent: 'flex-end',
        alignItems: "flex-end",
        marginTop: 10,
        marginRight: 40
    },
    boxTask: {
        display: 'flex',
        flexDirection: 'row'
    }
}));
export default function Dashboard() {

    const classes = useStyles();
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/projects')
            .then(res => res.json())
            .then(data => setProjects(data));

        console.log(projects);
    }, []);

    return (
        <Container className={classes.root}>
            <Typography variant='subtitle1'>Proyectos en curso</Typography>
            <Container className={classes.carousel}>
                {projects.map((value) => (
                    <CardProjects key={value.id} id={value.id} name={value.name} lastDate={value.endDate} nextTask='Apertura cohorte 5' progress={value.progress} tag={value.priority} />
                ))}
            </Container>
            <Typography variant='subtitle1'>Resumen de actividades</Typography>
            <PowerBI />
            <Box className={classes.boxTask}><Typography variant='subtitle1' className={classes.title}>Tareas</Typography>
                <Box className={classes.btnShowMore}><Button color='primary'><Typography variant='caption'>Ver todas</Typography></Button></Box>
            </Box>
            <TaskSection data={data} />
        </Container>
    );
}