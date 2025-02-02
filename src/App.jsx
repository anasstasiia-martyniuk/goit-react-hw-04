import { useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageCard from './components/ImageCard/ImageCard';
import CustomLoader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageModal from './components/ImageModal/ImageModal';
import LoadMoreBtn from './components/LoadMoreButton/LoadMoreButton';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';



export default function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({});
  const [currentSearch, setCurrentSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = async (results, query) => {
    try {
      setLoading(true);
      setImages(results);
      setCurrentSearch(query);
      setCurrentPage(1);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    try {
      setLoading(true);
      const nextPage = currentPage + 1;
      const response = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: {
          query: currentSearch,
          client_id: '1D37ZDRQZeZP3C2WPuc407dk3IPd5_MACV_uW0xCiKE',
          page: nextPage,
        },
      });
      setImages(prevImages => [...prevImages, ...response.data.results]);
      setCurrentPage(nextPage);
    } catch (error) {
      toast.error('Failed to fetch images. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (imageUrl, alt) => {
    setSelectedImage({ imageUrl, alt });
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <SearchBar onSubmit={handleSearch} />
      {loading ? <CustomLoader /> : null}
      {images.length > 0 && (
        <ImageGallery>
          {images.map((image) => (
            <ImageCard
              key={image.id}
              imageUrl={image.urls.small}
              alt={image.alt_description}
              onImageClick={() => handleOpenModal(image.urls.regular, image.alt_description)}
            />
          ))}
        </ImageGallery>
      )}
      {images.length === 0 && !loading && <ErrorMessage />}
      <LoadMoreBtn onLoadMore={handleLoadMore} hasMoreImages={images.length > 0} />
      <ImageModal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        imageUrl={selectedImage.imageUrl}
        alt={selectedImage.alt}
      />
    </div>
  );
}