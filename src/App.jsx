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


  const submit = (e) => {
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
    
       <div className='div-characters'>
       <div className='welcome'>
            <h2>Welcome to this crazy universe!</h2>
            </div>
          <div className='button-search'>
            <form onSubmit={(e) => submit(e)}>
              <input type='text' id="inputId" placeholder='Type a number between 1 and 126'
                  value={searchId}
                  onChange={(e) => 
                  setSearchId(e.target.value)}/>
                <button className="hover-button" type="submit">Search <i className='bx bx-search-alt-2 bx-xs'></i></button>
                </form>
            </div>
            <div className='information-general'>
            <Location
                url={locationRandom}/>
            </div>
            
              <ul className='render-characters'>
                {characterPaginated?.map((character) => (
                <ResidentInfo
                key={character}
                url={character}/> )
                )}
                </ul>
          <div className='paginated'>
            <button className='button-prev-next'
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}> 
              <i className='bx bx-first-page'></i>
            </button>
            {pages.map((num) => (
            <button className="button-pages" key={num} onClick={() => setCurrentPage(num)}>
              {num}
            </button>
          ))}
            <button className='button-prev-next'
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}>
              <i className='bx bx-last-page'></i>
            </button>
            </div>
        </div>
    </section>
    </>
  )
}

export default App
