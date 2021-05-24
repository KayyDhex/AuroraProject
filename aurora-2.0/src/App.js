import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import UserProvider from "./context/user/Provider";
import Routes from "./routes"

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1F366A',
            light: '#4b5e87',
            dark: '#15254a'
        },
        secondary: {
            main: '#FFFFFF',
            light: '#FFFFFF',
            dark: '#FFFFFF',
        }
    },
    typography: {
        fontFamily: 'Montserrat',
        fontWeightLight: 300,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 700
    }
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <UserProvider>
                <Routes />
            </UserProvider>
        </ThemeProvider>
    );
}

export default App;