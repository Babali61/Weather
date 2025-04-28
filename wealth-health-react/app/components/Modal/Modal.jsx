import { useEffect, useRef } from 'react';
import './Modal.css';

/**
 * Composant Modal
 * 
 * Un composant simple de fenêtre modale qui peut être utilisé pour afficher
 * des informations ou demander confirmation à l'utilisateur.
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {boolean} props.isOpen - Indique si le modal est ouvert
 * @param {function} props.onClose - Fonction appelée lorsque le modal est fermé
 * @param {React.ReactNode} props.children - Contenu à afficher dans le modal
 * @param {string} props.className - Classes CSS additionnelles
 * @param {boolean} props.closeOnEscape - Si true, le modal se ferme avec la touche Escape
 * @param {boolean} props.closeOnClickOutside - Si true, le modal se ferme en cliquant à l'extérieur
 * @param {string} props.size - Taille du modal ('sm', 'md', 'lg')
 * @param {React.ReactNode} props.footer - Contenu du pied de modal (optionnel)
 * @param {string} props.title - Titre du modal (optionnel)
 */
const Modal = ({
  isOpen,
  onClose,
  children,
  className = '',
  closeOnEscape = true,
  closeOnClickOutside = true,
  size = 'md',
  footer,
  title
}) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  // Gestion de la touche Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (closeOnEscape && e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Empêcher le défilement du document lorsque le modal est ouvert
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      // Focus le premier élément focusable dans le modal
      setTimeout(() => {
        if (contentRef.current) {
          const focusableElements = contentRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElements.length > 0) {
            focusableElements[0].focus();
          }
        }
      }, 100);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, closeOnEscape]);

  // Gestion du clic à l'extérieur du modal
  const handleOutsideClick = (e) => {
    if (closeOnClickOutside && modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  // Fonction pour déterminer la classe de taille
  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'modal-sm';
      case 'lg': return 'modal-lg';
      default: return '';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOutsideClick} aria-modal="true" role="dialog">
      <div 
        ref={modalRef}
        className={`modal ${getSizeClass()} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="modal-close" 
          onClick={onClose} 
          aria-label="Fermer"
          title="Fermer"
        >
          ×
        </button>
        
        {title && <h2 className="modal-title">{title}</h2>}
        
        <div className="modal-content" ref={contentRef}>
          {children}
        </div>
        
        {footer && (
          <div className="modal-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal; 