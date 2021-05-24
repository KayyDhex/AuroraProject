import { Paper, Typography } from "@material-ui/core";

export default function TagComponent(props){
    switch (props.tag) {
        case '0':
            return <Paper className={props.classes.tag}><Typography variant='inherit'>Al dia</Typography></Paper>
            break;
        case '1':
            return <Paper className={props.classes.tag1}><Typography variant='inherit'>Medio</Typography></Paper>
            break;
        case '2':
            return <Paper className={props.classes.tag2}><Typography variant='inherit'>Urgente</Typography></Paper>
            break;
    }
}