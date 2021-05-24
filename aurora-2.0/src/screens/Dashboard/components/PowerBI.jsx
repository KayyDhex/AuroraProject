import { Container, makeStyles, Typography } from "@material-ui/core";
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client'

const useStyles = makeStyles((theme)=>({
    container:{
        height : '80vh',
        margin : '10px'
    }
}));

export default function PowerBI() {

    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <PowerBIEmbed
                embedConfig={{
                    type: 'dashboard',   // Supported types: report, dashboard, tile, visual and qna
                    embedUrl: 'https://app.powerbi.com/view?r=eyJrIjoiN2E0NWNlOWEtZmZhNC00YjA1LTk0NjEtOWMwN2M5MzU2ZTQyIiwidCI6ImFjYTUxNjMxLTAwZmUtNDkwZC05MWFiLTE2M2VmODcyNjBlZSIsImMiOjR9',
                    tokenType: models.TokenType.Embed,
                    settings: {
                        panes: {
                            filters: {
                                expanded: false,
                                visible: false
                            }
                        },
                        background: models.BackgroundType.Transparent,
                    }
                }}

                eventHandlers={
                    new Map([
                        ['loaded', function () { console.log('Report loaded'); }],
                        ['rendered', function () { console.log('Report rendered'); }],
                        ['error', function (event) { console.log(event.detail); }]
                    ])
                }

                cssClassName={classes.container}

                getEmbeddedComponent={(embeddedReport) => {
                    window.report = embeddedReport;
                }}
            />
        </Container>
    );
}