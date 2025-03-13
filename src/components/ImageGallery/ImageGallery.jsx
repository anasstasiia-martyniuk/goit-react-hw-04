import css from "./ImageGallery.module.css"
import ImageCard from "../ImageCard/ImageCard"

export default function ImageGallery({ images, onClick }) {
    return (
        <ul className={css.gal}>
            {images.map((image) => (
                <li key={image.id}>
                    <ImageCard image={image} onClick={onClick}/>
                </li>
            ))}
        </ul>
    );
}