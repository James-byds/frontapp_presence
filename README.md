# Documentation du Projet — USER Check-In App

Bienvenue dans la documentation du projet **USER Check-In App**. Cette application facilite la gestion de présences et d’informations utilisateurs via une interface web, connectée à une API dédiée.

## Table des matières

- [Démarrage rapide](#démarrage-rapide)
- [Scripts principaux](#scripts-principaux)
- [Déploiement en production](#déploiement-en-production)
- [API & Authentification](#api--authentification)
- [Endpoints principaux](#endpoints-principaux)
- [Accès & Démo](#accès--démo)
- [Notes additionnelles](#notes-additionnelles)

## Démarrage rapide

Cloner le dépôt :

```shell
git clone https://github.com/James-byds/frontapp_presence
cd frontapp_presence
```

Installer les dépendances :

```shell
npm i
```

Démarrer en mode développeur :

```shell
npm run dev
```

## Scripts principaux

- `npm run dev` : Démarrer le serveur en mode dév.
- `npm run build` : Construire l’application pour la production.
- `npm run preview` : Prévisualiser la version production localement.

## Déploiement en production

Pour déployer en production :

```shell
npm run build
npm run preview
```

## API & Authentification

L’application utilise une API distante pour toutes les opérations serveur.

- **Base URL API** :  
  `https://ingrwf12.cepegra-frontend.xyz/cockpit_james/api`

**Authentification API**  
Ajoutez votre `api-key` dans l’en-tête de chaque requête. Certaines routes mentionnent aussi un `api-token`.

```http
GET /content/item/{model}
Headers:
  api-key: 
```

Accès public : *Lecture seule*

## Endpoints principaux

### Content Module

| Méthode | Endpoint                                 | Description                                    |
|---------|------------------------------------------|------------------------------------------------|
| GET     | `/content/item/{model}`                  | Récupère un élément de modèle                  |
| POST    | `/content/item/{model}`                  | Crée/Mets à jour un modèle                     |
| GET     | `/content/item/{model}/{id}`             | Récupère un élément de contenu spécifique      |
| DELETE  | `/content/item/{model}/{id}`             | Supprime un élément de contenu par ID          |
| GET     | `/content/items/{model}`                 | Liste les éléments publiés d’un modèle         |
| GET     | `/content/items`                         | Liste les éléments de plusieurs modèles        |
| GET     | `/content/aggregate/{model}`             | Liste agrégée des éléments d’un modèle         |
| GET     | `/content/tree/{model}`                  | Arborescence des éléments                      |

#### Paramètres courants

- `model` (string) : Nom du modèle cible.
- `id` (string) : ID unique du contenu.
- `locale` (string) : Langue du contenu.
- `filter`, `fields`, `sort` : Objets JSON encodés, optionnels pour filtrage et projection.
- `populate` (int) : Inclure les contenus liés.

### System Module

| Méthode | Endpoint                 | Description                                       |
|---------|--------------------------|---------------------------------------------------|
| GET     | `/system/healthcheck`    | Vérifie l’état de santé du système (db, mémoire…) |

## Accès & Démo

- **API live** :  
  `https://ingrwf12.cepegra-frontend.xyz/cockpit_james`
  
- **Version en ligne** :  
  [https://jbappoint.netlify.app](https://jbappoint.netlify.app)

- **Profil DEV (test)** :
  - utilisateur : `Pierre`
  - mot de passe : `pass`

## Notes additionnelles

- L’API en production est en accès public mais limité à la lecture.
- Pour toute extension ou personnalisation, se référer à la structure des modèles et endpoints ci-dessus.