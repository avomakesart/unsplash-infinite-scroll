import { useCallback, useRef, useState } from 'react';
import { Container } from './components/Container/Container';
import useGetData from './hooks/useGetData';
import { API_URL } from './api/apiUrl';

function App() {
  const [pageNumber, setPageNumber] = useState(1);
  const { loading, error, data, hasMore } = useGetData(API_URL, pageNumber);

  const observer = useRef();

  const lastImageElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, loading]
  );

  return (
    <Container>
      <h1 className='text-4xl text-black font-bold'>Infinite Scroll</h1>

      <div className='container mx-auto mt-10'>
        <div className='grid gap-10 md:grid-cols-2 lg:grid-cols-3'>
          {data.map((_data) =>
            _data.map((image, index) => {
              if (data.length === index + 1) {
                return (
                  <div
                    className='bg-white shadow-md border border-gray-100 p-4'
                    key={index}
                    ref={lastImageElementRef}
                  >
                    <img src={image.urls.full} alt={image.alt_description} />
                    <p className='text-base text-black font-medium'>
                      {image.description !== null
                        ? image.description
                        : 'No description'}
                    </p>
                  </div>
                );
              } else {
                return (
                  <div
                    className='bg-white shadow-md border border-gray-100 p-4'
                    key={index}
                  >
                    <img src={image.urls.regular} alt={image.alt_description} />
                    <p className='text-base text-black font-medium'>
                      {image.description !== null
                        ? image.description
                        : 'No description'}
                    </p>
                  </div>
                );
              }
            })
          )}
          {loading && 'Loading...'}
          {error && (
            <p className='text-black text-lg'>
              Ups something went wrong, try again later!
            </p>
          )}
        </div>
      </div>
    </Container>
  );
}

export default App;
