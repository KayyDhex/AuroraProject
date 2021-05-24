import 'date-fns';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Button, FormControl, InputLabel, makeStyles, MenuItem, Select, TextField, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { users } from "../../data/db.json";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    validate,
} from '@material-ui/pickers';


const useStyles = makeStyles((theme) => (
    {
        root: {
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column'
        },
        field: {
            minWidth: '40%'
        },
        formControl: {
            margin: theme.spacing(3),
            minWidth: '40%',
        }
    }
));

export default function UpdateProject(){
    
    const {id} = useParams();
    const history = useHistory();
    const classes = useStyles();

    const [name, setName] = useState("");
    const [details, setDetail] = useState("");
    const [endDate, setEndDate] = useState();
    const [advisor, setAdvisor] = useState("");
    const [progress,setProgress] = useState(0);
    const [priority, setPriority] = useState("0");
    const [usersTeam, setUsersTeam] = useState([]);
    const [task, setTask] = useState([]);

    useEffect(()=>{
        fetch(`http://localhost:3000/projects/${id}`)
            .then(res => res.json())
            .then(data => {
                setName(data.name);
                setDetail(data.details);
                setEndDate(data.endDate);
                setAdvisor(data.advisor);
                setProgress(data.progress);
                setPriority(data.priority);
                setUsersTeam(data.usersTeam);
                setTask(data.task);
            });
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/projects/${id}`, {
            method: 'PUT',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ name, details, endDate, advisor, progress, priority, usersTeam, task })
        }).then(() => history.goBack());
    };

    return (
        <form className={classes.root} onSubmit={handleSubmit}>
                <TextField
                    onChange={(e) => { setName(e.target.value) }}
                    value={name}
                    className={classes.field}
                    label='Nombre del proyecto'
                    variant='outlined'
                    required
                />
                <FormControl className={classes.formControl}>
                    <InputLabel>Encargado</InputLabel>
                    <Select
                        value={advisor}
                        onChange={(e) => { setAdvisor(e.target.value) }}
                    >
                        {users.map((value) => (
                            <MenuItem value={`${value.name.firstName} ${value.name.lastName}`}>{value.name.firstName} {value.name.lastName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    onChange={(e) => { setDetail(e.target.value) }}
                    value={details}
                    label="Detalles"
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Fecha Entrega"
                        value={endDate}
                        onChange={(date) => { setEndDate(date) }}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    endIcon={<ArrowForwardIosIcon />}>
                    Actualizar
            </Button>

        </form>
    );
}