import React, { useState, useEffect } from 'react';
import 'whatwg-fetch';
import logo from './logoUMG.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const result = await response.json();
        setPosts(result);
        setLoadingPosts(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoadingPosts(false);
      }
    };

    const fetchPhotos = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/photos');
        const result = await response.json();
        setPhotos(result);
        setLoadingPhotos(false);
      } catch (error) {
        console.error('Error fetching photos:', error);
        setLoadingPhotos(false);
      }
    };

    fetchPosts();
    fetchPhotos();
  }, []);

  // Paginación para posts
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPosts = posts.slice(indexOfFirstItem, indexOfLastItem);

  // Maneja el cambio de página
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Calcula el número total de páginas
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(posts.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="App">
      <header className="App-header">
        <nav className="nav">
          <a className="nav-link active" aria-current="page" href="/">Inicio</a>
          <a className="nav-link" href="/">Productos</a>
          <a className="nav-link" href="/">Contacto</a>
        </nav>
        <h1>Bienvenido a mi proyecto</h1>
        <img src={logo} className="App-logo" alt="Logo"/>
        <p>
          Para más información visítanos <code>¡Somos UMG!</code>
        </p>
        <a
          className="App-link"
          href="https://www.umg.edu.gt/"
          target="_blank"
          rel="noopener noreferrer">
          Acceso a UMG
        </a>
      </header>
      <main>
        <h2>Página de Inicio</h2>
        <p>Este es el contenido de mi página</p>
        <button onClick={() => alert("button clicked!")} className="btn btn-success">Haz Click</button>

        <h3>Posts desde la API</h3>
        <table className="table table-striped-columns" id='list'>
          <thead>
            <tr>
              <th>No.</th>
              <th>Título</th>
              <th>Contenido</th>
            </tr>
          </thead>
          <tbody>
            {loadingPosts ? (
              <tr><td colSpan="3">Cargando datos ...</td></tr>
            ) : (
              currentPosts.map(post => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.body}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn btn-secondary">
            👈 Anterior
          </button>
          <span id="informacion-pagina">
            Página {currentPage} de {pageNumbers.length}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pageNumbers.length}
            className="btn btn-secondary">
            Siguiente 👉
          </button>
        </div>

        <h3>Fotos desde la API</h3>
        <div className="row">
          {loadingPhotos ? (
            <p>Cargando fotos...</p>
          ) : (
            photos.slice(0, 10).map(photo => ( // Muestra las primeras 10 fotos
              <div className="col-md-4" key={photo.id}>
                <div className="card mb-4">
                  <img src={photo.url} className="card-img-top" alt={photo.title} />
                  <div className="card-body">
                    <h5 className="card-title">{photo.title}</h5>
                    <a href={photo.thumbnailUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Ver Imagen</a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
