import React from "react";

function Cards(props) {
  const cardStyle = {
    backgroundImage: `url(${props.backgroundImage})`,
    height: '300px', 
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
  };
  
  return (
    <div className={`card ${props.darkMode ? "dark" : ""}`} style={cardStyle}>

      <h1 className="c_hi">{props.title}</h1>
     
       <img
        src={props.flagImageSrc}
        alt={` ${props.title}`}
        className="card-flag"
      />
       
    

    </div>
  );
}

export default Cards;
