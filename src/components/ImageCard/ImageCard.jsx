import css from "./ImageCard.module.css"
export default function ImageCard({ image, onClick }) {
    return (
        <div className={css.card}>
            <img 
            className={css.cardimg} 
            src={image.urls.small} 
            alt={image.alt_description || "No description"}
            onClick={() => onClick(image)} />
        </div>
    );
}