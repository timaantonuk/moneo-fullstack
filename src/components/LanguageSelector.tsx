import React, { useState } from 'react';
import {Menu, MenuItem, Button, ListItemIcon, ListItemText, Box} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

type Language = 'en' | 'ru' | 'de';

const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
];

function LanguageSelector() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelectLanguage = (lang: Language) => {
        setSelectedLanguage(lang);
        handleClose();
    };

    const currentLanguage = languages.find(lang => lang.code === selectedLanguage);

    return (
        <div>
            <Button
                variant='contained'
                onClick={handleClick}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <span style={{ fontSize: '18px' }}>{currentLanguage?.flag}</span>
                    <span>{currentLanguage?.label}</span>
                </Box>
            </Button>


            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                {languages.map((language) => (
                    <MenuItem
                        key={language.code}
                        onClick={() => handleSelectLanguage(language.code as Language)}
                    >
                        <ListItemIcon sx={{ minWidth: '30px', display: 'flex', alignItems: 'center' }}>
                            <span style={{ fontSize: '20px' }}>{language.flag}</span>
                        </ListItemIcon>
                        <ListItemText primary={language.label} />
                        {selectedLanguage === language.code && (
                            <ListItemIcon sx={{ minWidth: '30px', display: 'flex', alignItems: 'center' }}>
                                <CheckIcon fontSize="small" />
                            </ListItemIcon>
                        )}
                    </MenuItem>

                ))}
            </Menu>
        </div>
    );
}

export default LanguageSelector;
