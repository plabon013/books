import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Button,
  CircularProgress,
  Stack,
  Rating,
  Chip,
  Typography,
  TextField,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAxios from '../services/useAxios';

function Books() {
  const { data, alert, loading, get, resetAlert } = useAxios('http://localhost:3000'); // Include resetAlert here
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (books.length === 0) {
      fetchBooks();
    }
  }, []);

  const fetchBooks = async () => {
    await get('books');
  };

  useEffect(() => {
    if (data) {
      setBooks(data);
      setFilteredBooks(data);
    }
  }, [data]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = books.filter(
      (book) =>
        book.name.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term) ||
        book.genres.some((genre) => genre.toLowerCase().includes(term))
    );
    setFilteredBooks(filtered);
  };

  return (
    <Box sx={{ mx: 'auto', p: 2 }}>
      {alert.show && <Alert severity={alert.type}>{alert.message}</Alert>}
      <TextField
        fullWidth
        label="Search"
        id="search"
        value={searchTerm}
        onChange={handleSearch}
        sx={{ mb: 2 }}
      />
      {loading && <CircularProgress />}
      {!loading && (
        <div>
          <Stack
            sx={{ justifyContent: 'space-around' }}
            spacing={{ xs: 1 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            {filteredBooks.map((book) => (
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '15%',
                  minWidth: 200,
                }}
                key={book.id}
              >
                <CardMedia
                  sx={{ height: 250 }}
                  image={book.img}
                  title={book.name}
                />
                <Box sx={{ pt: 2, pl: 2 }}>
                  {book.genres.map((genre, i) => (
                    <Chip key={i} label={genre} variant="outlined" size="small" />
                  ))}
                  <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                    {book.name}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {book.author}
                  </Typography>
                </Box>
                <CardActions
                  sx={{
                    justifyContent: 'space-between',
                    mt: 'auto',
                    pl: 2,
                  }}
                >
                  <Rating name="read-only" value={book.stars} readOnly size="small" />
                  <Button
                    size="small"
                    onClick={() => {
                      resetAlert(); // Clear the alert
                      navigate(`/book/${book.id}`); // Navigate to the detailed page
                    }}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Stack>
        </div>
      )}
    </Box>
  );
}

export default Books;