# Client d'une liste de todo

## Lancer le projet

Tout d'abord lancer le projet back disponnible [ici](https://github.com/Mrtblg/todo-provided-server) sur le port 4000

Il est nécessaire d'avoir Node version 18 pour le projet front

Dans le front: 
- installer les dépendances `npm install`
- `npm start` pour lancer le projet
  
## Les choix techniques

Les technos utilisées sont:

- Vite pour le bundle
- Appollo pour les requêtes Graphql
- MUI pour l'affichage graphique
- eslint et prettier
- React Router

Pour le découpage il y a:

- `App.tsx` et `ìndex.html` pour le rendu de l'application
- `client.ts` qui correspond au client appollo
- un dossier `common` qui contient les éléments communs à toute l'application
- un dossier par fonctionnalité, ici il n'y en a qu'une: `todo`
- dans le dossier de la fonctionnalité on trouve:
  - `data` pour le contexte, les requêtes graphql et les types
  - `hook` pour les hooks custom
  - `pages` pour les pages qui à chacune un dossier `components` pour les composants spécifiques à la page

## Les améliorations possibles

- Fichier de configuration pour l'url du back
- Ajout de tests
- Ajout de la gestion du cache
- Ajout de skeleton pour gérer le loading plus finement
- Meilleure gestion de la taille du bundle et de son chargement


Bugs connus: si le filtre "Fait" est sélectionné et qu'on décoche une todo alors la todo reste (pareil pour "A faire"). C'est lié à l'optimistique rendering. J'ai préféré laisser tel quel j'avais peur que ce soit trop violent pour l'utilisateur de la voir disparaitre.
