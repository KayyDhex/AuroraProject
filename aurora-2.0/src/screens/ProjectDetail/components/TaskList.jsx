import React from 'react';
import { Accordion, AccordionSummary, Container, Checkbox, FormControlLabel, AccordionDetails, Typography, Paper } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

export default function TaskList({projects}){
    return(
        <Container>
            {projects.task?.map((value, index)=>(
                <Accordion key={index}>
                <AccordionSummary
                    expandIcon={<ExpandMore />}>
                    <FormControlLabel
                        aria-label="Acknowledge"
                        onClick={(event) => event.stopPropagation()}
                        onFocus={(event) => event.stopPropagation()}
                        control={<Checkbox color='primary' checked={value.checked}/>}
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
        </Container>
    );
}