# React Modal Component

Un composant de fenêtre modale simple, léger et personnalisable pour React.

## Installation

```bash
npm install @wealth-health/react-modal
```

## Fonctionnalités

- Affichage/masquage d'une fenêtre modale
- Fermeture en cliquant à l'extérieur
- Fermeture avec la touche Escape
- Animations fluides
- Entièrement personnalisable via CSS
- Zéro dépendance

## Utilisation

```jsx
import { useState } from 'react';
import Modal from '@wealth-health/react-modal';
import '@wealth-health/react-modal/dist/Modal.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Ouvrir Modal</button>
      
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
      >
        <h2>Titre du Modal</h2>
        <p>Contenu du modal...</p>
      </Modal>
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| isOpen | boolean | required | Contrôle si le modal est visible |
| onClose | function | required | Fonction appelée lorsque le modal doit être fermé |
| children | node | required | Contenu à afficher dans le modal |
| className | string | '' | Classes CSS additionnelles pour le modal |
| closeOnEscape | boolean | true | Si true, le modal se ferme lorsque l'utilisateur appuie sur Escape |
| closeOnClickOutside | boolean | true | Si true, le modal se ferme lorsque l'utilisateur clique à l'extérieur |

## Personnalisation

Vous pouvez personnaliser l'apparence du modal en surchargeant les classes CSS suivantes :

- `.modal-overlay` - L'arrière-plan semi-transparent qui couvre la page
- `.modal` - Le conteneur du modal
- `.modal-close` - Le bouton de fermeture
- `.modal-content` - Le contenu du modal

## Accessibilité

Ce composant est conçu avec l'accessibilité à l'esprit :

- Utilise `aria-modal="true"` pour indiquer un modal aux lecteurs d'écran
- Focus piégé à l'intérieur du modal quand il est ouvert
- Support de fermeture via clavier (Escape)

## Licence

MIT 