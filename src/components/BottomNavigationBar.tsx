import { useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Paper, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {AccountCircle, ShoppingCart} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';

function BottomNavigationBar() {
    const location = useLocation();

    const getTabValue = (pathname: string) => {
        switch (pathname) {
            case '/income':
                return 1;
            case '/expenses':
                return 2;
            default:
                return 0;
        }
    };

    const [value, setValue] = useState(getTabValue(location.pathname));

    return (
        <Box sx={{ width: '100%', position: 'absolute', bottom: 20 }}>
            <Paper elevation={3}>
                <BottomNavigation
                    value={value}
                    onChange={(_, newValue) => setValue(newValue)}
                    showLabels
                    sx={{ width: '100%' }}
                >
                    <BottomNavigationAction
                        label="Dashboard"
                        icon={<DashboardIcon />}
                        component={Link}
                        to="/"
                    />
                    <BottomNavigationAction
                        label="Income"
                        icon={<AttachMoneyIcon />}
                        component={Link}
                        to="/income"
                    />
                    <BottomNavigationAction
                        label="Expenses"
                        icon={<ShoppingCart />}
                        component={Link}
                        to="/expenses"
                    />
                    <BottomNavigationAction
                        label="Goals"
                        icon={<FlagCircleIcon />}
                        component={Link}
                        to="/goals"
                    />
                    <BottomNavigationAction
                        label="Account"
                        icon={<AccountCircle />}
                        component={Link}
                        to="/account"
                    />
                </BottomNavigation>
            </Paper>
        </Box>
    );
}

export default BottomNavigationBar;
