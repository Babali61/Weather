import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import EmployeeSuccessModal from '../../components/EmployeeSuccessModal';
import { addEmployee } from '../../store/features/employeeSlice';
import { states } from '../../data/states';
import { departments } from '../../data/departments';
import "react-datepicker/dist/react-datepicker.css";
import './page.css';

/**
 * @component CreateEmployee
 * @description Composant de création d'un nouvel employé avec formulaire et validation
 * @returns {JSX.Element} Formulaire de création d'employé
 */
const CreateEmployee = () => {
  const dispatch = useDispatch();

  // États du formulaire
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: null,
    startDate: null,
    street: '',
    city: '',
    state: null,
    zipCode: '',
    department: null
  });
  
  // État pour le modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createdEmployee, setCreatedEmployee] = useState(null);
  
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
   * Gestionnaire de changement pour les champs du formulaire
   * @param {string} field - Nom du champ
   * @param {any} value - Nouvelle valeur
   */
  const handleFieldChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);
  
  /**
   * Gestion de la soumission du formulaire
   * @param {Event} e - Événement de soumission
   */
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    const newEmployee = {
      ...formData,
      dateOfBirth: formData.dateOfBirth ? formData.dateOfBirth.toLocaleDateString() : '',
      startDate: formData.startDate ? formData.startDate.toLocaleDateString() : '',
      state: formData.state ? formData.state.value : '',
      department: formData.department ? formData.department.value : ''
    };
    
    dispatch(addEmployee(newEmployee));
    setCreatedEmployee(newEmployee);
    setIsModalOpen(true);
    resetForm();
  }, [formData, dispatch]);
  
  /**
   * Réinitialisation du formulaire
   */
  const resetForm = useCallback(() => {
    setFormData({
      firstName: '',
      lastName: '',
      dateOfBirth: null,
      startDate: null,
      street: '',
      city: '',
      state: null,
      zipCode: '',
      department: null
    });
  }, []);

  /**
   * Fonction pour créer un autre employé
   */
  const handleCreateAnother = useCallback(() => {
    // Focus sur le premier champ du formulaire
    document.getElementById('first-name')?.focus();
  }, []);
  
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
                value={formData.firstName}
                onChange={(e) => handleFieldChange('firstName', e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="last-name">Nom</label>
              <input 
                type="text" 
                id="last-name" 
                value={formData.lastName}
                onChange={(e) => handleFieldChange('lastName', e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="date-of-birth">Date de naissance</label>
              <DatePicker
                id="date-of-birth"
                selected={formData.dateOfBirth}
                onChange={(date) => handleFieldChange('dateOfBirth', date)}
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
                selected={formData.startDate}
                onChange={(date) => handleFieldChange('startDate', date)}
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
                    value={formData.street}
                    onChange={(e) => handleFieldChange('street', e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="city">Ville</label>
                  <input 
                    id="city" 
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleFieldChange('city', e.target.value)}
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
                    value={formData.state}
                    onChange={(option) => handleFieldChange('state', option)}
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
                    value={formData.zipCode}
                    onChange={(e) => handleFieldChange('zipCode', e.target.value)}
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
                value={formData.department}
                onChange={(option) => handleFieldChange('department', option)}
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
      
      {/* Utilisation du composant modal réutilisable */}
      <EmployeeSuccessModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        employee={createdEmployee}
        onCreateAnother={handleCreateAnother}
      />
    </div>
  );
};

export default CreateEmployee;