import React, { useState } from 'react';
import { Accordion, AccordionSummary, Container, Checkbox, FormControlLabel, AccordionDetails, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

export default function TaskList({ projects }) {

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container>
            {projects.task?.map((value, index) => (
                <Accordion key={index}>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}>
                        <FormControlLabel
                            aria-label="Acknowledge"
                            onClick={(event) => event.stopPropagation()}
                            onFocus={(event) => event.stopPropagation()}
                            control={<Checkbox color='primary' checked={value.checked} onClick={handleClickOpen} />}
                            label={value.name}
                        />
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography color="textSecondary">
                            {value.detail}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Completar Tarea</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Deseas marcar esta tarea como realizada?
                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleClose} color="primary">
                        Completar
          </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}