import React, { useState, useEffect } from 'react';
import {
  TextField, Select, MenuItem, List, ListItem, Card, CardContent,
  Typography, IconButton
} from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import allProductApi from "@api/allProductApi";
import useDebounce from "@assets/useDebounce";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ImageDisplay from "@utils/ImageDisplay";

function ImageCarousel({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!images || !images.length) return null;

  const navigateToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const navigateToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div style={{ position: 'relative' }}>
      <ImageDisplay imageId={images[currentImageIndex]} />
      {images.length > 1 && (
        <>
          <IconButton
            style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}
            onClick={navigateToPreviousImage}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton
            style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}
            onClick={navigateToNextImage}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </>
      )}
    </div>
  );
}

export default function ListMarble() {
  const [marbles, setMarbles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('default');
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    setCurrentPage(0);
    setHasMoreItems(true);
    fetchMarbles();
  }, [debouncedSearchTerm, sortType]);

  const fetchMarbles = () => {
    const paginationOptions = {
      pageNumber: currentPage,
      pageSize: 20
    };

    allProductApi.fetchActiveProduct("marbles", { ...paginationOptions, searchTerm })
      .then(response => {
        if (response.number + 1 >= response.totalPages) {
          setHasMoreItems(false);
        }
        setMarbles(prevMarbles => [...prevMarbles, ...response.content]);
      })
      .catch(error => {
        console.error('Failed to fetch marbles:', error);
      });
  };

  const fetchNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <Select
        value={sortType}
        onChange={e => setSortType(e.target.value)}
        variant="outlined"
        style={{ marginLeft: '20px' }}
      >
        <MenuItem value="default">Sort by...</MenuItem>
        <MenuItem value="name">Name</MenuItem>
        <MenuItem value="price">Price</MenuItem>
      </Select>

      <InfiniteScroll
        dataLength={marbles.length}
        next={fetchNextPage}
        hasMore={hasMoreItems}
        loader={<h4>Loading...</h4>}
      >
        <List>
          {marbles.map(marble => (
            <ListItem key={marble.id}>
              <Card>
                <ImageCarousel images={marble.imageURL || []} />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {marble.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${marble.price}
                  </Typography>
                  {/* ... The rest of the marble properties as you've defined them */}
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
      </InfiniteScroll>
    </div>
  );
}
