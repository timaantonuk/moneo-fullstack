import {Button, TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";

function Register() {
    return (
        <section className='flex justify-center items-center h-screen'>
            <div className='main-wrapper flex flex-col items-center justify-center py-5'>
                <Typography variant="h2" sx={{marginBottom: '1rem'}}>Moneo App</Typography>
                <Typography variant="h5" sx={{marginBottom: '3rem'}}>Register new account</Typography>

                <form className='flex flex-col gap-5 w-full px-20' action="">
                    <TextField
                        label="Full Name"
                        name="fullName"
                        fullWidth
                    />

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

                    <TextField
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        fullWidth
                        sx={{marginBottom: '2rem'}}
                    />

                    <Button type="submit" variant="contained" color="primary" size='large'>
                        Register
                    </Button>

                    <Button variant="outlined" color="primary" size='large'>
                        <Link to='/login'>
                            Already have an account? Log in
                        </Link>
                    </Button>


                </form>
            </div>

        </section>
    );
}

export default Register;