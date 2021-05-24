import 'date-fns';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Button, FormControl, InputLabel, makeStyles, MenuItem, Select, TextField, Grid } from "@material-ui/core";
import { useState, useContext } from "react";
import UserContext from '../../../context/user';
import { useHistory } from "react-router";
import { users } from "../../../data/db.json";
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

export default function AddTaskForm() {

    const history = useHistory();
    const classes = useStyles();
    const { projectDetail } = useContext(UserContext);
    const [name, setName] = useState("");
    const [details, setDetail] = useState("");
    const [user, setUser] = useState("");
    const [endDate, setEndDate] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTask = { name: name, user: user, detail: details, endDate: endDate, checked: false }
        const task = [newTask, ...projectDetail.task];
        console.log(task);
        fetch(`http://localhost:3000/projects/${projectDetail.id}`, {
            method: 'PATCH',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ task })
        }).then(() => history.goBack());
    };

    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <TextField
                onChange={(e) => { setName(e.target.value) }}
                value={name}
                label="Nombre de la tarea"
                variant="outlined"
                fullWidth
            />
            <FormControl className={classes.formControl}>
                <InputLabel>Encargado</InputLabel>
                <Select
                    value={user}
                    onChange={(e) => { setUser(e.target.value) }}
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
                Crear
            </Button>

        </form>
    );
}