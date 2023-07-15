import axios from "axios"
import { useState, useEffect } from "react"


const ResidentInfo = ({ url }) => {

    const [detail, setDetail] = useState({})
    
    useEffect(() => {
        axios
        .get(url)
        .then(resp => {
            setDetail(resp.data)
            console.log(resp.data)
            console.log(states())
        })
        .catch(error => console.log(error))
    }, [])
    document.getElementById('colors')
  
    const states = (colors) => {
        
      
                  if(detail?.status === 'Alive'){
                    colors.style.backgroundColor ===  'green'
                     
                  } else if(detail.status === 'Dead') {
                    colors.style.backgroundColor ===  'green'
                  } else {
                    colors.style.backgroundColor ===  'green'
                  }
                  
                }
    
    

   
    return (
    <>
         <li className="residentInfo"> 
            <img src={detail.image} alt=""/>
            <h2><span>{detail.name}</span></h2>
            <div className="status">
            <p><span className="span-status" id="colors">h</span> {detail.status}</p>
            </div>
            <div className="info-aditional">
            <h3>Specie<span className="span-specie">{detail.species}</span></h3>
            <h3>Origin<span className="span-origin">{detail.origin?.name}</span></h3>
            <h3>Appearences in episodes<span className="span-episode">{detail.episode?.length}</span></h3> 
            </div>      
         </li>
       
    </>
    )
}

export default ResidentInfo