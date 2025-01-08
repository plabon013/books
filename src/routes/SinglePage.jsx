import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    CardMedia,
    Chip,
    Stack,
    CircularProgress,
    Alert,
    Button,
    Rating,
} from '@mui/material';
import useAxios from '../services/useAxios';

function SinglePage() {
    const { id } = useParams(); // Get the book ID from the URL
    const { data, alert, loading, get } = useAxios('http://localhost:3000'); // API hook
    const [book, setBook] = useState(null); // State to store book details
    const navigate = useNavigate(); // Hook to navigate back to the previous page

    useEffect(() => {
        fetchBook();
    }, [id]);

    const fetchBook = async () => {
        await get(`books/${id}`); // Fetch the book details by ID
    };

    useEffect(() => {
        if (data) {
            setBook(data); // Update the local book state
        }
    }, [data]);

    return (
        <Box sx={{ maxWidth: 900, mx: 'auto', p: 2 }}>
            {/* Show an alert if any */}
            {alert.show && <Alert severity={alert.type}>{alert.message}</Alert>}
            {/* Show a loading spinner while fetching data */}
            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            )}
            {/* Display book details */}
            {book && !loading && (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: 4,
                        mt: 4,
                    }}
                >
                    {/* Book Image */}
                    <CardMedia
                        component="img"
                        sx={{
                            width: { xs: '100%', md: '40%' },
                            height: 'auto',
                            borderRadius: 2,
                        }}
                        image={book.img}
                        alt={book.name}
                    />
                    {/* Book Information */}
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            {book.name}
                        </Typography>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Author: {book.author}
                        </Typography>
                        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                            {book.genres.map((genre, index) => (
                                <Chip key={index} label={genre} variant="outlined" />
                            ))}
                        </Stack>
                        <Typography variant="body1" gutterBottom>
                            <strong>Reading Status:</strong>{' '}
                            {book.completed ? 'Completed' : 'In Progress'}
                        </Typography>
                        {book.start && book.end && (
                            <Typography variant="body1" gutterBottom>
                                <strong>Started:</strong> {book.start} <br />
                                <strong>Finished:</strong> {book.end}
                            </Typography>
                        )}
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2 }}>
                            <Typography variant="body1">
                                <strong>Rating:</strong>
                            </Typography>
                            <Rating value={book.stars} readOnly size="medium" />
                        </Stack>
                        {/* Back Button */}
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ mt: 4 }}
                            onClick={() => navigate(-1)} // Go back to the previous page
                        >
                            Back to Books
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
}

export default SinglePage;