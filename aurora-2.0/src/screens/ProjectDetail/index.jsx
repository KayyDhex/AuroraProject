import { Container, TextField, Typography, Box, makeStyles, Grid, Avatar, Button, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { users } from "../../data/db.json";
import UserContext from "../../context/user";
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import TagComponent from "../../components/others/TagComponent";
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import TaskSection from "../Dashboard/components/TaskSection";
import TaskList from "./components/TaskList";

const useStyles = makeStyles((theme) => ({
    tag: {
        width: 80,
        padding: 2,
        marginTop: theme.spacing(2),
        textAlign: 'center',
        backgroundColor: '#2196F3',
        color: 'white'
    },
    tag1: {
        width: 80,
        padding: 2,
        marginTop: theme.spacing(2),
        textAlign: 'center',
        backgroundColor: '#FF9800',
        color: 'white'
    },
    tag2: {
        width: 80,
        padding: 2,
        marginTop: theme.spacing(2),
        textAlign: 'center',
        backgroundColor: '#F44336',
        color: 'white'
    },
    boxAvatar: {
        textAlign: 'center'
    },
    title: {
        marginTop: theme.spacing(3)
    },
    btnTask: {
        width: '80%',
        display: "flex",
        justifyContent: 'flex-end',
        alignItems: "flex-end",
        marginTop: 10,
        marginRight: 40
    },
    boxTask: {
        display: 'flex',
        flexDirection: 'row'
    },
    btnGeneral: {
        marginTop: 50
    },
    avatarColor: {
        color: theme.palette.secondary.main,
        backgroundColor: theme.palette.primary.main
    },
    btnRemove: {
        backgroundColor: 'red',
        color: 'white'
    },
    btnEdit: {
        backgroundColor: theme.palette.primary.dark,
        color: 'white',
        marginRight: 10
    },
    formControl: {
        margin: theme.spacing(3),
        minWidth: '90%',
    }
}));

export default function ProjectDetail() {

    const { id } = useParams();
    const { getProjectDetail, projectDetail, getUsers } = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const [newUser, setNewUser] = useState({});
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        console.log("Entro: " + id);
        getProjectDetail(id).catch(null);
    }, []);

    const handleRemoveProject = async () => {
        await fetch("http://localhost:3000/projects/" + id, {
            method: 'DELETE',
        })
        history.push("/dashboard");
    }
    const handleClickOpen = () => {
        setOpen(true);
        getUsers().catch(null);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleAddUser = (e) => {
        e.preventDefault();

        const usersTeam = [newUser, ...projectDetail.usersTeam];

        fetch(`http://localhost:3000/projects/${id}`, {
            method: 'PATCH',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ usersTeam })
        }).then(() => history.goBack());
        setOpen(false);
    }

    return (
        <Container>
            <Box width='100%'>
                <Typography variant='h5'>{projectDetail.name}</Typography>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-start"
                >
                    <Box>
                        <Typography>Fecha de entrega: {projectDetail.endDate}</Typography>

                    </Box>
                    <Box className={classes.boxAvatar}>
                        <Typography>Participantes</Typography>
                        <AvatarGroup max={4}>
                            {projectDetail.usersTeam?.map((value) => (
                                <Avatar alt={value.name.firstName} className={classes.avatarColor}>{value.name.firstName[0]}</Avatar>
                            ))}
                        </AvatarGroup>
                        <Button onClick={handleClickOpen}>Añadir</Button>
                    </Box>
                </Grid>
            </Box>
            <Typography>Detalles:</Typography>
            <Typography>{projectDetail.details}</Typography>
            <Box>
                <Box className={classes.boxTask}>
                    <Typography variant='subtitle1' className={classes.title} noWrap>Tareas</Typography>
                    <Box className={classes.btnTask}><Button color='primary' onClick={() => history.push(`/projects/add-task`)}><Typography variant='caption'>Agregar Tarea</Typography></Button></Box>
                </Box>
                <TaskList projects={projectDetail} />
            </Box>
            <Box className={classes.btnGeneral}>
                <Button className={classes.btnEdit} variant="contained" endIcon={<EditIcon />} onClick={() => history.push(`/projects/update-project/${id}`)}>Editar Proyecto</Button>
                <Button className={classes.btnRemove} variant="contained" endIcon={<DeleteForeverIcon />} onClick={handleRemoveProject}>Eliminar Proyecto</Button>
            </Box>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Inscribir usuario</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Selecciona a el usuario que inscribiras en este proyecto.
            </DialogContentText>
                    <FormControl className={classes.formControl}>
                        <InputLabel id='label1'>Correo electronico</InputLabel>
                        <Select
                            value={newUser}
                            onChange={(e) => { setNewUser(e.target.value) }}
                        >
                            {users.map((user) => (
                                <MenuItem value={user}>{user.name.firstName} {user.name.lastName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleAddUser} color="primary">
                        Añadir
          </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
//<TaskSection data={projectDetail.task} />