import { Button, Container, TableContainer, Typography, Paper, TableHead, TableBody, TableRow, TableCell, Table, Avatar, makeStyles, Box, IconButton } from "@material-ui/core";
import { useEffect, useState } from "react";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
    box: {
        display: 'flex',
        flexDirection: 'row'
    },
    avatar: {
        marginRight: 20
    },
    title: {
        marginTop: theme.spacing(3)
    },
    btnAddUser: {
        width: '80%',
        display: "flex",
        justifyContent: 'flex-end',
        alignItems: "flex-end",
        marginTop: 10,
        marginRight: 40
    },
    boxUser: {
        display: 'flex',
        flexDirection: 'row'
    }
}));

export default function Team() {

    const classes = useStyles();
    const history = useHistory();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/users')
            .then(res => res.json())
            .then(data => setUsers(data));
    });

    const handleRemoveUser = async (id) => {
        await fetch("http://localhost:3000/users/" + id, {
            method: 'DELETE',
        })
        const newUsers = users.filter(user => user.id != id);
        setUsers(newUsers);
    }

    return (
        <Container>
            <Box className={classes.boxUser}>
                <Typography variant='subtitle1' className={classes.title} noWrap>Todos los usuarios</Typography>
                <Box className={classes.btnAddUser}><Button color='primary' onClick={() => history.push("/projects/add-user")}><Typography variant='caption'>Ingresar Usuario</Typography></Button></Box>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Participantes</TableCell>
                            <TableCell align="right">Area</TableCell>
                            <TableCell align='right'>Rol</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users?.map((value) => (
                            <TableRow key={value.id}>
                                <TableCell>
                                    <Box className={classes.box}>
                                        <Avatar className={classes.avatar}>{value?.name.firstName[0]}</Avatar>
                                        <Box>
                                            <Typography variant='subtitle1'>{value?.name.firstName} {value?.name.lastName}</Typography>
                                            <Typography variant='caption'>{value?.email}</Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">{value?.area}</TableCell>
                                <TableCell align='right'>{value?.role}</TableCell>
                                <TableCell align='right'>
                                    <IconButton onClick={() => history.push(`/projects/update-user/${value?.id}`)}><EditIcon /></IconButton>
                                    <IconButton onClick={() => handleRemoveUser(value?.id)}><DeleteForeverIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}