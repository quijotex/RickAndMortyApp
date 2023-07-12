const Location = ({ url }) => {

    return(
        <> 
        <div className="location-name">
            <h1>Name:</h1>
            <p>{url.name}</p>
        </div>
        <div className="location-type">
            <h2>Type:</h2>
            <p>{url.type}</p>
        </div>
        <div className="location-dimension">
        <h3>Dimension:</h3>
        <p>{url.dimension}</p>
        </div>
        <div className="location-residents">
        <h3>Population:</h3> 
        <p>{url?.residents?.length}</p>
        </div>
        </>
    )
}

export default Location