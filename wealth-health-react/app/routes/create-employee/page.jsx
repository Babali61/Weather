import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import Modal from '../../components/Modal';
import { states } from '../../data/states';
import { departments } from '../../data/departments';
import "react-datepicker/dist/react-datepicker.css";
import './page.css';

/**
 * Page de création d'un nouvel employé
 */
const CreateEmployee = () => {
  const navigate = useNavigate();
  // États du formulaire
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState(null);
  const [zipCode, setZipCode] = useState('');
  const [department, setDepartment] = useState(null);
  
  // État pour le modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Options pour les selects
  const stateOptions = states.map(state => ({
    value: state.abbreviation,
    label: state.name
  }));
  
  const departmentOptions = departments.map(dept => ({
    value: dept,
    label: dept
  }));
  
  /**
   * Gestion de la soumission du formulaire
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Récupération des données actuelles des employés
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    
    // Création du nouvel employé
    const newEmployee = {
      firstName,
      lastName,
      dateOfBirth: dateOfBirth ? dateOfBirth.toLocaleDateString() : '',
      startDate: startDate ? startDate.toLocaleDateString() : '',
      street,
      city,
      state: state ? state.value : '',
      zipCode,
      department: department ? department.value : ''
    };
    
    // Ajout du nouvel employé à la liste
    employees.push(newEmployee);
    
    // Sauvegarde dans le localStorage
    localStorage.setItem('employees', JSON.stringify(employees));
    
    // Ouverture du modal de confirmation
    setIsModalOpen(true);
    
    // Réinitialisation du formulaire
    resetForm();
  };
  
  /**
   * Réinitialisation du formulaire
   */
  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setDateOfBirth(null);
    setStartDate(null);
    setStreet('');
    setCity('');
    setState(null);
    setZipCode('');
    setDepartment(null);
  };
  
  // Boutons pour le pied de page du modal
  const modalFooter = (
    <>
      <button 
        onClick={() => navigate('/employee-list')}
        className="button button-primary"
      >
        Voir la liste des employés
      </button>
      <button 
        onClick={() => setIsModalOpen(false)}
        className="button button-danger"
      >
        Fermer
      </button>
    </>
  );
  
  return (
    <div className="create-employee fade-in">
      <div className="title-section">
        <h1>HRnet</h1>
        <p>Application de gestion des ressources humaines</p>
      </div>
      
      <div className="container">
        <div className="card slide-up">
          <div className="card-header">
            <h2>Créer un nouvel employé</h2>
            <Link to="/employee-list" className="link">
              Voir les employés actuels
            </Link>
          </div>
          
          <form onSubmit={handleSubmit} id="create-employee">
            <div className="form-group">
              <label htmlFor="first-name">Prénom</label>
              <input 
                type="text" 
                id="first-name" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="last-name">Nom</label>
              <input 
                type="text" 
                id="last-name" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="date-of-birth">Date de naissance</label>
              <DatePicker
                id="date-of-birth"
                selected={dateOfBirth}
                onChange={setDateOfBirth}
                dateFormat="dd/MM/yyyy"
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                placeholderText="Sélectionner une date"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="start-date">Date de début</label>
              <DatePicker
                id="start-date"
                selected={startDate}
                onChange={setStartDate}
                dateFormat="dd/MM/yyyy"
                showYearDropdown
                placeholderText="Sélectionner une date"
                required
              />
            </div>
            
            <fieldset className="address">
              <legend>Adresse</legend>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="street">Rue</label>
                  <input 
                    id="street" 
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="city">Ville</label>
                  <input 
                    id="city" 
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="state">État</label>
                  <Select
                    id="state"
                    classNamePrefix="select"
                    value={state}
                    onChange={setState}
                    options={stateOptions}
                    placeholder="Sélectionner un état"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="zip-code">Code postal</label>
                  <input 
                    id="zip-code" 
                    type="text"
                    pattern="[0-9]*"
                    maxLength="5"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    required
                  />
                </div>
              </div>
            </fieldset>
            
            <div className="form-group department-group">
              <label htmlFor="department">Département</label>
              <Select
                id="department"
                classNamePrefix="select"
                value={department}
                onChange={setDepartment}
                options={departmentOptions}
                placeholder="Sélectionner un département"
                required
              />
            </div>
            
            <div className="form-actions">
              <button type="submit" className="submit-button">
                Enregistrer l'employé
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Modal de confirmation */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Employé créé"
        footer={modalFooter}
      >
        <div className="message message-success">
          L'employé a été créé avec succès et ajouté à la liste des employés.
        </div>
        <p>
          Vous pouvez maintenant créer un autre employé ou consulter la liste des employés existants à l'aide des boutons ci-dessous.
        </p>
      </Modal>
    </div>
  );
};

export default CreateEmployee; 