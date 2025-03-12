import {useState} from "react";
import {
    Avatar,
    Button,
    Paper,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Select,
    MenuItem,
    Box,
    CircularProgress
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import {useSelector, useDispatch} from "react-redux";
import {useUpdateProfile} from "../hooks/useUpdateProfile.ts";
import {setUser} from "../store/slices/authSlice.ts";

const languageOptions = [
    {value: "en", label: "🇬🇧 English"},
    {value: "ru", label: "🇷🇺 Русский"},
    {value: "de", label: "🇩🇪 Deutsch"}
];

function Account() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const {mutate: updateProfile, isLoading} = useUpdateProfile();

    // Загружаем данные из Redux
    const user = auth.user;

    const [avatarUrl, setAvatarUrl] = useState(user?.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${Math.random().toString(36).substring(7)}`);
    const [name, setName] = useState(user?.fullName || "User");
    const [language, setLanguage] = useState(user?.language || "en"); // en, ru, de

    const [openNameDialog, setOpenNameDialog] = useState(false);
    const [openLanguageDialog, setOpenLanguageDialog] = useState(false);
    const [tempName, setTempName] = useState(name);
    const [tempLanguage, setTempLanguage] = useState(language);

    const reGenerateAvatar = () => {
        const newSeed = Math.random().toString(36).substring(7);
        const newAvatarUrl = `https://api.dicebear.com/7.x/adventurer/svg?seed=${newSeed}`;

        setAvatarUrl(newAvatarUrl);
        updateProfile({avatar: newAvatarUrl});

        // Обновляем Redux
        dispatch(setUser({user: {...user, avatar: newAvatarUrl}, token: auth.token}));
    };

    const handleSaveName = () => {
        setName(tempName);
        updateProfile({fullName: tempName});

        // Обновляем Redux
        dispatch(setUser({user: {...user, fullName: tempName}, token: auth.token}));

        setOpenNameDialog(false);
    };

    const handleSaveLanguage = () => {
        setLanguage(tempLanguage);
        updateProfile({language: tempLanguage});

        // Обновляем Redux
        dispatch(setUser({user: {...user, language: tempLanguage}, token: auth.token}));

        setOpenLanguageDialog(false);
    };

    if (isLoading) return <CircularProgress/>;

    // Получаем отображаемое название языка
    const currentLanguageLabel = languageOptions.find(lang => lang.value === language)?.label || "🇬🇧 English";

    return (
        <div className="w-full flex flex-col items-center h-full px-5">
            <Paper sx={{width: "100%", maxWidth: 500, padding: 3, backgroundColor: "#212121", color: "white"}}>

                {/* Avatar */}
                <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2}}>
                    <Typography variant="h6">Your Avatar</Typography>
                    <div className='flex items-center gap-5'>
                        <Avatar src={avatarUrl} sx={{width: 50, height: 50}}/>
                        <Button variant="contained" startIcon={<RefreshIcon/>} onClick={reGenerateAvatar}>
                            Re-generate
                        </Button>
                    </div>
                </Box>

                {/* Name */}
                <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2}}>
                    <Typography variant="h6">Your Name</Typography>
                    <div className='flex items-center gap-5'>
                        <Typography variant="body1">{name}</Typography>
                        <Button variant="outlined" startIcon={<EditIcon/>} onClick={() => setOpenNameDialog(true)}>
                            Edit
                        </Button>
                    </div>
                </Box>

                {/* Language */}
                <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    <Typography variant="h6">Language</Typography>
                    <div className='flex items-center gap-5'>
                        <Typography variant="body1">{currentLanguageLabel}</Typography>
                        <Button variant="outlined" startIcon={<EditIcon/>} onClick={() => setOpenLanguageDialog(true)}>
                            Edit
                        </Button>
                    </div>
                </Box>
            </Paper>

            {/* Edit Name Modal */}
            <Dialog open={openNameDialog} onClose={() => setOpenNameDialog(false)}>
                <DialogTitle sx={{backgroundColor: "#212121", color: "white"}}>Edit Name</DialogTitle>
                <DialogContent sx={{backgroundColor: "#212121"}}>
                    <TextField
                        fullWidth
                        variant="standard"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        InputLabelProps={{style: {color: "white"}}}
                        InputProps={{style: {color: "white"}}}
                    />
                </DialogContent>
                <DialogActions sx={{backgroundColor: "#212121"}}>
                    <Button color="error" onClick={() => setOpenNameDialog(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSaveName}>Save</Button>
                </DialogActions>
            </Dialog>

            {/* Edit Language Modal */}
            <Dialog open={openLanguageDialog} onClose={() => setOpenLanguageDialog(false)}>
                <DialogTitle sx={{backgroundColor: "#212121", color: "white"}}>Edit Language</DialogTitle>
                <DialogContent sx={{backgroundColor: "#212121"}}>
                    <Select
                        fullWidth
                        value={tempLanguage}
                        onChange={(e) => setTempLanguage(e.target.value)}
                        sx={{backgroundColor: "#333", color: "white", borderRadius: 1}}
                    >
                        {languageOptions.map(({value, label}) => (
                            <MenuItem key={value} value={value}>{label}</MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions sx={{backgroundColor: "#212121"}}>
                    <Button color="error" onClick={() => setOpenLanguageDialog(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSaveLanguage}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Account;
