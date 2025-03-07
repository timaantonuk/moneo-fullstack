import {Button, TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";

function Login() {
    return (
        <section className='flex justify-center items-center h-screen'>
            <div className='main-wrapper flex flex-col items-center justify-center py-5'>
                <Typography variant="h2" sx={{marginBottom: '1rem'}}>Moneo App</Typography>
                <Typography variant="h5" sx={{marginBottom: '3rem'}}>Login to your account</Typography>

                <form className='flex flex-col gap-5 w-full px-20' action="">

                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        fullWidth
                    />

                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        fullWidth
                    />


                    <Button type="submit" variant="contained" color="primary" size='large'>
                        Register
                    </Button>

                    <Button variant="outlined" color="primary" size='large'>
                        <Link to='/register'>
                            New here? Create an account!
                        </Link>
                    </Button>


                </form>
            </div>

        </section>
    );
}

export default Login;