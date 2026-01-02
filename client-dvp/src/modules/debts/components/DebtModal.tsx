import type { JSX } from 'react';
import { Box, Button, Dialog, DialogTitle, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
    onClose: () => void;
    children: JSX.Element;
}

const DebtModal: React.FC<Props> = ({ children, onClose }) => {
    return (
        <Dialog
            open={true}
            sx={{
                '& .MuiPaper-root': {
                    width: '500px',
                    borderRadius: 5,
                    px: 3,
                    pt: 2,
                    pb: 4,
                },
            }}
        >
            <Box className="w-full justify-end flex">
                <Button type="button" className="m-0! p-0!" onClick={onClose}>
                    <CloseIcon className="h-9! w-9!" />
                </Button>
            </Box>
            <DialogTitle>
                <Typography
                    sx={{
                        fontSize: 30,
                        textAlign: 'center',
                    }}
                >
                    Registrar deuda
                </Typography>
            </DialogTitle>
            {children}
        </Dialog>
    );
};

export default DebtModal;
