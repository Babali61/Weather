# HRnet - Application de Gestion des Ressources Humaines

## Description
HRnet est une application web moderne de gestion des ressources humaines développée avec React. Elle permet de créer et gérer les employés d'une entreprise avec une interface utilisateur intuitive et performante.

## Prérequis
- Node.js (version 14.0.0 ou supérieure)
- npm (version 6.0.0 ou supérieure)
- Un navigateur web moderne (Chrome, Firefox, Safari, Edge)

## Installation

1. Clonez le dépôt :
```bash
git clone https://github.com/Babali61/Weather.git
```

2. Installez les dépendances :
```bash
npm install
```

3. Pour le développement, lancez l'application :
```bash
npm start
```

4. Pour la production, créez un build et lancez le serveur :
```bash
npm run build
npx serve -s dist
```

L'application sera accessible à l'adresse `http://localhost:3000` en local et `https://10.0.0.2:3000` en network

## Fonctionnalités

- Création d'un nouvel employé avec validation des données
- Liste des employés avec pagination et filtrage
- Gestion d'état globale avec Context API
- Interface utilisateur responsive et moderne
- Composants React personnalisés (Modal, DatePicker, Select)

## Structure du Projet

```
Weather/
├── app/
│   ├── components/     # Composants réutilisables
│   ├── data/       # Contextes React
│   ├── routes/         # Pages de l'application
│   └── store/       # Store Redux
├── performance/      # Dossier de performance avec rapport et graphique de comparaison metric
├── public/           # Fichiers statiques
└── src/             # Code source principal
```

## Performance

L'application a été optimisée pour de meilleures performances :
- Utilisation de `useMemo` et `useCallback` pour la mémorisation
- Gestion d'état optimisée avec Context API
- Chargement paresseux des composants
- Optimisation des rendus avec React.memo

## Tests de Performance

Les tests de performance peuvent être exécutés uniquement lorsque l'application est en version production (build) et accessible sur `http://10.0.0.2:3000`.

Pour lancer les tests de performance :

1. Assurez-vous que l'application est en version production :
```bash
npm run build
npx serve -s dist
```

2. À la racine du projet, exécutez :
```bash
node performance/performance-test.js
```

Cette commande va générer :
- Un rapport de performance pour la version jQuery
- Un rapport de performance pour la version React
- Une image graphique comparant les performances des deux versions

Les rapports et le graphique seront générés dans le dossier `performance/`.

## Contribution

1. Fork le projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## Contact

Yavuzyilmaz Ali - [https://www.linkedin.com/in/ali-yavuzyilmaz-0097a0150/]

Lien du projet : [https://github.com/Babali61/Weather.git]
