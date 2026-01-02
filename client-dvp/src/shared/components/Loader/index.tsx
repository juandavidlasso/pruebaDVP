import { CircularProgress, Dialog } from '@mui/material';

const Loader = () => {
    return (
        <Dialog
            open={true}
            sx={{
                '& .MuiPaper-root': {
                    width: '300px',
                    height: '200px',
                    borderRadius: 5,
                    px: 3,
                    py: 4,
                    gap: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
            }}
        >
            <CircularProgress />
        </Dialog>
    );
};

export default Loader;
