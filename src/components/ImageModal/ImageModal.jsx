import ReactModal from "react-modal";
import css from "./ImageModal.module.css"

export default function ImageModal ({ isOpen, onRequestClose, imageUrl, alt }) {
  return (
    <ReactModal
    style={{
      overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.50)'
      },
      content: {
        position: 'absolute',
        top: '48px',
        left: '64px',
        right: '64px',
        bottom: '48px',
        border: '0',
        background: 'rgba(255, 255, 255, 0.75)',
        overflow: 'hidden',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '24px',
        outline: 'none',
        padding: '20px'
      }
    }}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image Modal"
    >
      <button onClick={onRequestClose} className={css.close}>Close</button>
      <img src={imageUrl} alt={alt} className={css.imgM}/>
    </ReactModal>
  );
}