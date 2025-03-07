import { createTheme, ThemeOptions } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
    typography: {
        fontFamily: '"Poppins", sans-serif',
        h1: { fontWeight: 700 },
        h2: { fontWeight: 600 },
        h3: { fontWeight: 500 },
        h4: { fontWeight: 500 },
        h5: { fontWeight: 400 },
        h6: { fontWeight: 400 },
    },
    shape: {
        borderRadius: 10
    },
    palette: {
        mode: 'dark',
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#f50057',
        },
        info: {
            main: '#102d43',
        },
        success: {
            main: '#00ea0b',
        },
        background: {
            default: '#212121',
            paper: '#373737',
        },
    },
};

const theme = createTheme(themeOptions);

export default theme;
