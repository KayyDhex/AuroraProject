import { Container, TextField, Typography, Box, makeStyles, Grid, Avatar, Button } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import UserContext from "../../context/user";
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import TagComponent from "../../components/others/TagComponent";
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import TaskSection from "../Dashboard/components/TaskSection";

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
    btnGeneral:{
        margin: 30
    }
}));

export default function ProjectDetail() {

    const { id } = useParams();
    const { getProjectDetail, projectDetail, getUsers, users } = useContext(UserContext);
    const [open, setOpen] = useState(false);
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
                
            </Box>
            <Box className={classes.btnGeneral}>
                <Button variant="contained" endIcon={<EditIcon />} onClick={() => history.push(`/projects/update-project/${id}`)}>Editar Proyecto</Button>
                <Button variant="contained" endIcon={<DeleteForeverIcon />} onClick={handleRemoveProject}>Eliminar Proyecto</Button>
            </Box>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Inscribir usuario</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Selecciona a el usuario que inscribiras en este proyecto.
            </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleClose} color="primary">
                        Añadir
          </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
//<TaskSection data={projectDetail.task} />