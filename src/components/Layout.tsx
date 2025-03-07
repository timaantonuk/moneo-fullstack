import { Avatar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import LanguageSelector from './LanguageSelector';
import BottomNavigationBar from './BottomNavigationBar';
import {generateRandomSeed} from "../utils/functions.ts";


function Layout() {
    return (
        <section className="flex justify-center items-center h-screen w-screen">
            <div className="main-wrapper flex flex-col items-center py-5 relative max-w-4xl">


                <div className="flex gap-2 items-center justify-between w-full px-10 mb-5">
                    <LogoutButton />
                    <div className="flex gap-2 items-center">
                        <Avatar
                            alt="Your Avatar"
                            sx={{ width: 64, height: 64 }}
                            src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${generateRandomSeed()}`}
                        />
                        <Typography variant="h4">Welcome, Tymofii 👋</Typography>
                    </div>
                    <LanguageSelector />
                </div>


                <div className="w-full flex-1">
                    <Outlet />
                </div>


                <BottomNavigationBar />
            </div>
        </section>
    );
}

export default Layout;
