# EmployeeSuccessModal

Un composant modal réutilisable pour afficher les détails de succès de création d'employé dans l'application HRnet.

## 📦 Installation

Ce composant utilise le package `@alibee/react-modal` qui doit être installé dans le projet :

```bash
npm install @alibee/react-modal --legacy-peer-deps
```

## 🔧 Utilisation

```jsx
import EmployeeSuccessModal from '../../components/EmployeeSuccessModal';

function CreateEmployee() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createdEmployee, setCreatedEmployee] = useState(null);

  const handleCreateAnother = () => {
    // Focus sur le premier champ du formulaire
    document.getElementById('first-name')?.focus();
  };

  return (
    <div>
      {/* Votre formulaire de création d'employé */}
      
      <EmployeeSuccessModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        employee={createdEmployee}
        onCreateAnother={handleCreateAnother}
      />
    </div>
  );
}
```

## 🎯 Props

| Prop | Type | Requis | Description |
|------|------|--------|-------------|
| `isOpen` | `boolean` | ✅ | Contrôle l'état d'ouverture du modal |
| `onClose` | `() => void` | ✅ | Fonction appelée lors de la fermeture |
| `employee` | `Object` | ✅ | Données de l'employé créé |
| `onCreateAnother` | `() => void` | ❌ | Fonction pour créer un autre employé |

### Structure de l'objet employee

```javascript
{
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  startDate: string,
  street: string,
  city: string,
  state: string,
  zipCode: string,
  department: string
}
```

## 🎨 Fonctionnalités

### ✅ **Détails professionnels**
- Affichage complet des informations de l'employé
- Calcul automatique de l'ancienneté
- Formatage de l'adresse complète
- Badge visuel pour le département

### 🎯 **Boutons de navigation**
- **📋 Voir la liste des employés** : Redirection vers `/employee-list`
- **➕ Créer un autre employé** : Fermeture + focus sur le formulaire
- **🏠 Accueil** : Redirection vers la page d'accueil

### 🎨 **Interface**
- Design moderne avec gradients et animations
- Responsive pour mobile et desktop
- Fermeture par Escape et clic extérieur
- Messages informatifs avec prochaines étapes

## 📁 Structure des fichiers

```
app/components/EmployeeSuccessModal/
├── index.jsx                    # Composant principal
├── EmployeeSuccessModal.css     # Styles du composant
└── README.md                   # Documentation
```

## 🔄 Réutilisabilité

Ce composant est conçu pour être réutilisable dans d'autres parties de l'application où vous devez afficher des détails de succès d'employé, par exemple :

- Après modification d'un employé
- Après suppression d'un employé
- Affichage de détails d'employé existant

## 🎨 Personnalisation

Les styles peuvent être personnalisés en modifiant le fichier `EmployeeSuccessModal.css`. Le composant utilise des classes CSS modulaires pour éviter les conflits de styles.

## 📱 Responsive

Le composant s'adapte automatiquement aux écrans mobiles :
- Grille d'informations en colonne unique
- Boutons empilés verticalement
- Espacement réduit pour les petits écrans 