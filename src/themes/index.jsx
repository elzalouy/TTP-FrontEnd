import { createTheme } from '@mui/material/styles';

// project imports
import componentStyleOverrides from './compStyleOverride';
import themePalette from './palette';
import themeTypography from './typography';


export const theme = () => {

    const themeOption = {
        heading: "#000000",
        paper: "#ffffff",
        backgroundDefault: "#ffffff",
        background: "#fafafb",
        darkTextPrimary: "#000000",
        darkTextSecondary: "#44444f",
        textDark: "#212121",
        menuSelected: "#ffffff",
        menuSelectedBack: "#000000",
        divider: "#eeeeee",
    };

    const themeOptions = {
        direction: 'ltr',
        palette: themePalette(themeOption),
        mixins: {
            toolbar: {
                minHeight: '48px',
                padding: '16px',
                '@media (min-width: 600px)': {
                    minHeight: '48px'
                }
            }
        },
        typography: themeTypography(themeOption)
    };

    const themes = createTheme(themeOptions);
    themes.components = componentStyleOverrides(themeOption);

    return themes;
};

export default theme;