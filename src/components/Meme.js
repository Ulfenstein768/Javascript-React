import React from "react";

export const Meme =({template, onClick}) => {
    return(
          <img 
            src={template.url} 
            key={template.id}
            alt={template.name} 

            onClick={onClick}

            style={{width: 200}} /> 
    )
}   