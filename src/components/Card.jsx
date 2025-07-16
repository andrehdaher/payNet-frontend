// components/ServiceCard.jsx
const ServiceCard = ({ title, description, image, buttonText, onClick }) => {
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure className="px-10 pt-10">
        <img src={image} alt={title} className="rounded-xl h-32 object-cover" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions">
          <button className="btn btn-primary" onClick={onClick}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
