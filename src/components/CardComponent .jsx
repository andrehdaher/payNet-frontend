import React from 'react';

const CardComponent = ({ title, description, buttonText, onClick }) => {
  return (
    
    <div className="card w-96 bg-base-100 card-sm shadow-sm">
  
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="justify-end card-actions">
          <button className="btn btn-primary" onClick={onClick}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;