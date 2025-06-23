
import { useNavigate } from 'react-router-dom';
import Modal from '@alibee/react-modal';
import '@alibee/react-modal/dist/index.css';
import './EmployeeSuccessModal.css';

/**
 * @component EmployeeSuccessModal
 * @description Composant modal réutilisable pour afficher les détails de succès de création d'employé
 * @param {Object} props - Propriétés du composant
 * @param {boolean} props.isOpen - État d'ouverture du modal
 * @param {Function} props.onClose - Fonction de fermeture du modal
 * @param {Object} props.employee - Données de l'employé créé
 * @param {Function} props.onCreateAnother - Fonction pour créer un autre employé
 * @returns {JSX.Element} Modal de succès avec détails de l'employé
 */
const EmployeeSuccessModal = ({ 
  isOpen, 
  onClose, 
  employee, 
  onCreateAnother 
}) => {
  const navigate = useNavigate();


  /**
   * Formatage de l'adresse complète
   */
  const formatAddress = (employee) => {
    const parts = [employee.street, employee.city, employee.state, employee.zipCode];
    return parts.filter(part => part).join(', ');
  };

  /**
   * Gestionnaire pour créer un autre employé
   */
  const handleCreateAnother = () => {
    onClose();
    if (onCreateAnother) {
      onCreateAnother();
    }
  };

  /**
   * Gestionnaire pour voir la liste des employés
   */
  const handleViewList = () => {
    onClose();
    navigate('/employee-list');
  };

  /**
   * Gestionnaire pour retourner à l'accueil
   */
  const handleGoHome = () => {
    onClose();
    navigate('/');
  };

  // Boutons pour le pied de page du modal
  const modalFooter = (
    <div className="modal-footer-buttons">
      <button 
        onClick={handleViewList}
        className="button button-primary"
        title="Consulter la liste complète des employés"
      >
        📋 Voir la liste des employés
      </button>
      <button 
        onClick={handleCreateAnother}
        className="button button-secondary"
        title="Créer un autre employé"
      >
        ➕ Créer un autre employé
      </button>
      <button 
        onClick={handleGoHome}
        className="button button-outline"
        title="Retourner à l'accueil"
      >
        🏠 Accueil
      </button>
    </div>
  );

  // Contenu détaillé du modal
  const modalContent = employee && (
    <div className="employee-details">
      <div className="message message-success">
        <h3>✅ Employé créé avec succès !</h3>
        <p>L'employé a été ajouté à la base de données et est maintenant disponible dans la liste des employés.</p>
      </div>
      
      <div className="employee-info-card">
        <h4>📋 Informations de l'employé</h4>
        <div className="info-grid">
          <div className="info-item">
            <strong>Nom complet :</strong>
            <span>{employee.firstName} {employee.lastName}</span>
          </div>
          <div className="info-item">
            <strong>Département :</strong>
            <span className="department-badge">{employee.department}</span>
          </div>
          <div className="info-item">
            <strong>Date de début :</strong>
            <span>{employee.startDate}</span>
          </div>
          <div className="info-item">
            <strong>Date de naissance :</strong>
            <span>{employee.dateOfBirth}</span>
          </div>
          <div className="info-item">
            <strong>Adresse :</strong>
            <span>{formatAddress(employee)}</span>
          </div>
        </div>
      </div>
      
      <div className="next-steps">
        <h4>🔄 Prochaines étapes</h4>
        <ul>
          <li>L'employé peut maintenant être consulté dans la liste des employés</li>
          <li>Vous pouvez créer un autre employé en utilisant le bouton "Créer un autre employé"</li>
          <li>Consultez la liste complète pour voir tous les employés de l'entreprise</li>
        </ul>
      </div>
    </div>
  );

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title="🎉 Employé créé avec succès !"
      size="lg"
      footer={modalFooter}
      closeOnEscape={true}
      closeOnClickOutside={true}
    >
      {modalContent}
    </Modal>
  );
};

export default EmployeeSuccessModal; 