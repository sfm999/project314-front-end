import { AppBar, Card, Container, createTheme, CssBaseline, Grid, Paper, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import MailIcon from '@mui/icons-material/Mail';
import BadgeIcon from '@mui/icons-material/Badge';
import { styled } from '@mui/material/styles';

const customer = {
    "name": "Stuart", 
    "familyName": "fletcher-miller",
    "email": "test@testmail.com.au",
    "plan":{"type": "subscription"}
};

const theme = createTheme({
    palette: {
        backgroundColor: "black",
    }
})

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.backgroundColor,
}))

const drawerWidth = 320;

export default function CustomerProfile(){
    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="relative"
                sx={{ 
                    width: `calc(100% - ${drawerWidth}px)`,
                    mr: `${drawerWidth}px`, backgroundColor: "white",
                    boxShadow: "none"
                 }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Permanent Drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="main"
                sx={{ flexGrow: 1, backgroundColor: '#f1f1f1'}}
            >
                <Toolbar />

            </Box>
        </Box>
    );
}