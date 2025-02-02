import css from "./ImageGallery.module.css"

export default function ImageGallery({ children }) {
    return (
        <ul className={css.gal}>
            {children.map((child, index) => (
                <li key={index}>
                    <div>{child}</div>
                </li>
            ))}
        </ul>
    );
}