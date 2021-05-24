import { IconButton,Container, makeStyles, TableContainer, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box, Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import TagComponent from "../../components/others/TagComponent";
import VisibilityIcon from '@material-ui/icons/Visibility';

const data = [{ id: 0, name: 'Funciones Financieras', advisor: 'Christian Rodriguez', date: '20-05-2021', priority: '0' },
{ id: 1, name: 'Funciones Financieras', advisor: 'Christian Rodriguez', date: '20-05-2021', priority: '0' },
{ id: 2, name: 'Funciones Financieras', advisor: 'Christian Rodriguez', date: '20-05-2021', priority: '1' },
{ id: 3, name: 'Funciones Financieras', advisor: 'Christian Rodriguez', date: '20-05-2021', priority: '2' },
{ id: 4, name: 'Funciones Financieras', advisor: 'Christian Rodriguez', date: '20-05-2021', priority: '1' }];

const useStyles = makeStyles((theme) => ({
    tag: {
        width: 80,
        margin: 0,
        padding: 2,
        textAlign: 'center',
        backgroundColor: '#2196F3',
        color: 'white'
    },
    tag1: {
        width: 80,
        margin: 0,
        padding: 2,
        textAlign: 'center',
        backgroundColor: '#FF9800',
        color: 'white'
    },
    tag2: {
        width: 80,
        margin: 0,
        padding: 2,
        textAlign: 'center',
        backgroundColor: '#F44336',
        color: 'white'
    },
    title: {
        marginTop: theme.spacing(3)
    },
    btnAddProject: {
        width: '80%',
        display: "flex",
        justifyContent: 'flex-end',
        alignItems: "flex-end",
        marginTop: 10,
        marginRight: 40
    },
    boxProjects: {
        display: 'flex',
        flexDirection: 'row'
    }
}));

export default function Projects() {

    const classes = useStyles();
    const history = useHistory();
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/projects')
            .then(res => res.json())
            .then(data => setProjects(data));
    }, []);

    return (
        <Container>
            <Box className={classes.boxProjects}>
                <Typography variant='subtitle1' className={classes.title} noWrap>Todos los proyectos</Typography>
                <Box className={classes.btnAddProject}><Button color='primary' onClick={() => history.push("/projects/add-project")}><Typography variant='caption'>Nuevo Proyecto</Typography></Button></Box>
            </Box>
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Proyecto</TableCell>
                            <TableCell align="right">Encargado</TableCell>
                            <TableCell align='right'>Fecha de Entrega</TableCell>
                            <TableCell align='left'>Prioridad</TableCell>
                            <TableCell align='right'>Ver Mas</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component='th' scope="row">{row.name}</TableCell>
                                <TableCell align='right'>{row.advisor}</TableCell>
                                <TableCell align='right'>{row.endDate}</TableCell>
                                <TableCell align='right'><TagComponent tag={row.priority} classes={classes} /></TableCell>
                                <TableCell align='right'>
                                <IconButton onClick={() => history.push(`/projects/project-detail/${row.id}`)}><VisibilityIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}