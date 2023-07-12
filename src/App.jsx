import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import Location from './Components/Location';
import ResidentInfo from './Components/ResidentInfo';
import logo from './assets/logo.svg'

function App() {
  const [ locationRandom, setLocationRandom ] = useState({});
  const [ searchId, setSearchId ] = useState("")

  useEffect(() => {
    
    const randomId = Math.floor((Math.random() * 126) + 1);

    axios
      .get(`https://rickandmortyapi.com/api/location/${randomId}`)
      .then((resp) => {
        setLocationRandom(resp.data);
      
      })
      .catch((error) => console.error(error));
  }, []);


  const handleLocation = (e) => {
    e.preventDefault()

    axios
      .get(`https://rickandmortyapi.com/api/location/${searchId}`)
      .then((resp) => {
        setLocationRandom(resp.data);
  })
     .catch((error) => console.error(error));
  }

  const [currentPage, setCurrentPage] = useState(1);
  const characterPerPage = 10;
 

  const lastIndex = characterPerPage * currentPage; 
  const firstIndex = lastIndex - characterPerPage;

  const characterPaginated = locationRandom?.residents?.slice(firstIndex, lastIndex)

  const totalPages = Math.ceil(locationRandom?.residents?.length / characterPerPage)

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  return (
    <>
    <header className='header-img'>
      <img className="logo-header" src={logo} alt=''/>
    </header>
    <section className='section-characters'>
      <div className='button-search'>
          <input type='text' id="inputId" placeholder='Type a number between 1 and 126'
              value={searchId}
              onChange={(e) => 
              setSearchId(e.target.value)}/>
            <button type="text" onClick={handleLocation}>Search <i className='bx bx-search-alt-2 bx-xs'></i></button>
        </div>
        <div className='information-general'>
        <Location
            url={locationRandom}/>
        </div>
          <ul>
            {characterPaginated?.map((character) => (
            <ResidentInfo
            key={character}
            url={character}/> )
            )}
            </ul>
      </section>
      <footer className='footer-pages'>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}> 
              Previous
            </button>
            {pages.map((num) => (
            <button key={num} onClick={() => setCurrentPage(num)}>
              {num}
            </button>
          ))}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}>
              Next
            </button>
      </footer>
    </>
  )
}

export default App
