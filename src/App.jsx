import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import CustomLoader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageModal from './components/ImageModal/ImageModal';
import LoadMoreBtn from './components/LoadMoreButton/LoadMoreBtn';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import Modal from "react-modal";



export default function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [topic, setTopic] = useState();
  const [page, setPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({});
  const [totalPages, setTotalPages] = useState(1);

  // const handleSearch = async (results, query) => {
  //   try {
  //     setLoading(true);
  //     setImages(results);
  //     setCurrentSearch(query);
  //     setCurrentPage(1);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);
  
    const handleOpenModal = (pictures) => {
      setSelectedImage(pictures);
      setModalIsOpen(true);
    };
  
    const handleCloseModal = () => {
      setModalIsOpen(false);
      setSelectedImage(null)
    };
  
    const handleLoadMore = () => {
      setPage((prev) => prev + 1)
    }

useEffect(() => {
  async function fetchPictures(topic, page){
    try {
      setError(false);
      setLoading(true);
      const response = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: {
          query: topic,
          client_id: '1D37ZDRQZeZP3C2WPuc407dk3IPd5_MACV_uW0xCiKE',
          page,
          per_page: 15,
        },
      });

      if (page === 1) {
        setImages(response.data.results)
      } else {
        setImages(prevImages => [...prevImages, ...response.data.results]);}

      setTotalPages(response.data.total_pages);
    } catch (error) {
      setError(true)
      toast.error('Failed to fetch images. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (topic) {
    fetchPictures(topic, page);
  }
}, [topic, page])

  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <SearchBar onSubmit={(newTopic) => {setTopic(newTopic)
        setPage(1)
        setImages([])}
      } />
      {loading ? <CustomLoader /> : null}
        <ImageGallery images={images} onClick={handleOpenModal} />
      {images.length === 0 && !loading && <ErrorMessage />}
      <LoadMoreBtn onLoadMore={handleLoadMore} hasMoreImages={images.length > 0} />
      {modalIsOpen && (<ImageModal
        modalIsOpen={modalIsOpen}
        modalIsClosed={handleCloseModal}
        selectedImage={selectedImage}
      />
      )}
    </div>
  );
}