import HomeIcon from '@material-ui/icons/Home';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import GroupIcon from '@material-ui/icons/Group';
import TimelineIcon from '@material-ui/icons/Timeline';
import SettingsIcon from '@material-ui/icons/Settings';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export const sections=[
    {name: "Inicio", path:"/dashboard",icon: <HomeIcon color='secondary'/>},
    {name: "Proyectos", path:"/projects",icon: <BookmarksIcon color='secondary'/>},
    {name: "Equipo", path:"/team",icon: <GroupIcon color='secondary'/>},
    {name: "Estadisticas", path:"/stadistics",icon: <TimelineIcon color='secondary'/>},
    {name: "line"},
    {name: "Ajustes", path:"/settings",icon: <SettingsIcon color='secondary'/>},
    {name: "Preferencias", path:"/preferences",icon: <LiveHelpIcon color='secondary'/>},
    {name: "line"},
    {name: "Cerrar Sesion", path:"/",icon: <ExitToAppIcon color='secondary'/>},
];