import { AppBar, Avatar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { useHistory, useLocation } from "react-router";
import { sections } from "./others/sections";
import Image from '../assets/images/logo2.png';
import { ArrowBackIos } from "@material-ui/icons";
import { useContext } from "react";
import UserContext from "../context/user";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => {
    return ({
        page: {
            backgroundColor: '#f9f9f9',
            width: '100%',
            padding: theme.spacing(3)
        },
        drawer: {
            width: drawerWidth,
            justifyContent: "center"
        },
        drawerPaper: {
            width: drawerWidth,
            background: theme.palette.primary.main,
            color: 'white'
        },
        active: {
            backgroundColor: theme.palette.primary.light,
            marginTop: 10
        },
        listItem: {
            marginTop: 10
        },
        root: {
            display: 'flex'
        },
        appbar: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
        toolbar: theme.mixins.toolbar,
        logo: {
            margin: 20
        },
        avatar: {
            display: "flex",
            width: '100%',
            padding: 8,
            justifyContent: 'flex-end',
            alignItems: "center",
            marginRight: 20
        },
        avatarCircle: {
            color: theme.palette.secondary.main,
            backgroundColor: theme.palette.primary.main,
            marginRight: 20
        }
    });
});

export default function Layout({ children }) {

    const location = useLocation();
    const history = useHistory();
    const classes = useStyles();
    const { userActive } = useContext(UserContext);

    const getTextBar = () => {

        let text = '';

        switch (location.pathname) {
            case '/dashboard':
                text = 'Inicio'
                break;
            case '/projects':
                text = 'Proyectos'
                break;
            case '/team':
                text = 'Equipo'
                break;
            case '/stadistics':
                text = 'Estadisticas'
                break;
            case '/settings':
                text = 'Configuraciones'
                break;
            case '/preferences':
                text = 'Preferencias'
                break;
            case '/projects/add-project':
                text = 'Nuevo Proyecto'
                break;
            default:
                text = 'Detalles'
                break;
        }

        return text;
    }
    const textBar = getTextBar();
    return (
        <div className={classes.root}>
            <AppBar
                className={classes.appbar}
                elevation={2}
                color='secondary'>
                <Toolbar>
                    {(location.pathname === '/projects/add-project' || 'Detalles' === getTextBar()) ? <IconButton aria-label='Atras' onClick={() => { history.goBack() }}><ArrowBackIos /></IconButton> : null}
                    <Typography variant='h6'>{textBar}</Typography>
                    <Box className={classes.avatar}>
                        <Avatar className={classes.avatarCircle}>{userActive?.name.firstName[0]}</Avatar>
                        <Typography variant='subtitle1'>{userActive?.name.firstName} {userActive?.name.lastName}</Typography>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                anchor="left"
                classes={{
                    paper: classes.drawerPaper
                }}>
                <img src={Image} className={classes.logo} />
                <List>                    
                    {sections.map((item) => {
                    return (item.name !== 'line') ? <ListItem key={item.name}
                        button
                        onClick={() => history.push(item.path)}
                        className={(location.pathname == item.path) ? classes.active : classes.listItem}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItem> : <Divider light='true' style={{ background: 'white', marginTop: 20 }} />;
                })}
                </List>
            </Drawer>
            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div>
        </div>
    );
}