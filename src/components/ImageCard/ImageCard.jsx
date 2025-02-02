import css from "./ImageCard.module.css"
export default function ImageCard({ imageUrl, alt, onImageClick }) {
    return (
        <div onClick={onImageClick} className={css.card}>
            <img className={css.cardimg} src={imageUrl} alt={alt} />
        </div>
    );
}