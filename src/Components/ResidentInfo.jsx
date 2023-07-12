import axios from "axios"
import { useState, useEffect } from "react"


const ResidentInfo = ({ url }) => {

    const [detail, setDetail] = useState({})

    useEffect(() => {
        axios
        .get(url)
        .then(resp => {
            setDetail(resp.data) 
            
        })
        .catch(error => console.log(error))
    }, [])

   
    return (
    <>
         <li className="residentInfo"> 
            <img src={detail.image} alt=""/>
            <h2><span>{detail.name}</span></h2>
            <div className="status">
            <p><span>h</span> {detail.status}</p>
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