import { useState } from "react";
import { Avatar, Button, Paper, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, Box } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";

function Account() {
    const [avatarSeed, setAvatarSeed] = useState(Math.random().toString(36).substring(7));
    const [name, setName] = useState("Tymofii");
    const [language, setLanguage] = useState("English");

    const [openNameDialog, setOpenNameDialog] = useState(false);
    const [openLanguageDialog, setOpenLanguageDialog] = useState(false);
    const [tempName, setTempName] = useState(name);
    const [tempLanguage, setTempLanguage] = useState(language);

    const reGenerateAvatar = () => {
        setAvatarSeed(Math.random().toString(36).substring(7));
    };

    const handleSaveName = () => {
        setName(tempName);
        setOpenNameDialog(false);
    };

    const handleSaveLanguage = () => {
        setLanguage(tempLanguage);
        setOpenLanguageDialog(false);
    };

    return (
        <div className="w-full flex flex-col items-center h-full px-5">
            <Paper sx={{ width: "100%", maxWidth: 500, padding: 3, backgroundColor: "#212121", color: "white" }}>

                {/* Your Avatar - Avatar - Re-generate */}
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                    <Typography variant="h6">Your Avatar</Typography>
                    <Avatar
                        src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${avatarSeed}`}
                        sx={{ width: 50, height: 50 }}
                    />
                    <Button
                        variant="contained"
                        startIcon={<RefreshIcon />}
                        onClick={reGenerateAvatar}
                    >
                        Re-generate
                    </Button>
                </Box>

                {/* Your Name - Name - Edit */}
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                    <Typography variant="h6">Your Name</Typography>
                    <Typography variant="body1">{name}</Typography>
                    <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={() => setOpenNameDialog(true)}
                    >
                        Edit
                    </Button>
                </Box>

                {/* Language - Selected Language - Edit */}
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography variant="h6">Language</Typography>
                    <Typography variant="body1">{language}</Typography>
                    <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={() => setOpenLanguageDialog(true)}
                    >
                        Edit
                    </Button>
                </Box>
            </Paper>

            {/* Modal for Editing Name */}
            <Dialog open={openNameDialog} onClose={() => setOpenNameDialog(false)}>
                <DialogTitle sx={{ backgroundColor: "#212121", color: "white" }}>Edit Name</DialogTitle>
                <DialogContent sx={{ backgroundColor: "#212121" }}>
                    <TextField
                        fullWidth
                        variant="standard"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        InputLabelProps={{ style: { color: "white" } }}
                        InputProps={{ style: { color: "white" } }}
                    />
                </DialogContent>
                <DialogActions sx={{ backgroundColor: "#212121" }}>
                    <Button color="error" onClick={() => setOpenNameDialog(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSaveName}>Save</Button>
                </DialogActions>
            </Dialog>

            {/* Modal for Editing Language */}
            <Dialog open={openLanguageDialog} onClose={() => setOpenLanguageDialog(false)}>
                <DialogTitle sx={{ backgroundColor: "#212121", color: "white" }}>Edit Language</DialogTitle>
                <DialogContent sx={{ backgroundColor: "#212121" }}>
                    <Select
                        fullWidth
                        value={tempLanguage}
                        onChange={(e) => setTempLanguage(e.target.value)}
                        sx={{ backgroundColor: "#333", color: "white", borderRadius: 1 }}
                    >
                        <MenuItem value="English">🇬🇧 English</MenuItem>
                        <MenuItem value="Русский">🇷🇺 Русский</MenuItem>
                        <MenuItem value="Deutsch">🇩🇪 Deutsch</MenuItem>
                    </Select>
                </DialogContent>
                <DialogActions sx={{ backgroundColor: "#212121" }}>
                    <Button color="error" onClick={() => setOpenLanguageDialog(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSaveLanguage}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Account;
