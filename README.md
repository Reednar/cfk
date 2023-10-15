# Guide d'installation pour le projet CFK
Author: [Tony CHARBONNIER], [Loïc LEPIE], [Raphael DE CASTRO]

## Étape 1 : Clonage du projet
Clonez le projet depuis le référentiel Git en utilisant la commande suivante :
git clone [URL_du_projet]

## Étape 2 : Installation des dépendances
Installez les dépendances du projet en utilisant la commande suivante :
npm install
npm update

## Étape 3 : Configuration de la base de données MongoDB
Créez une base de données MongoDB nommée "cfk".
Importez les deux collections du dossier "bdd" dans la base de données "cfk".

## Étape 4 : Configuration des variables d'environnement
Créez un fichier ".env" à la racine du projet.
Copiez le contenu du fichier ".env.example" dans le fichier ".env".
Modifiez les variables d'environnement du fichier ".env" en fonction de votre configuration exemple :
MONGO_URI=[lien_vers_la_base_cfk]
SESSION_SECRET="47WY6qrkDM4mT44d"
PORT=3000

## Étape 5 : Lancement du serveur
Lancez le serveur en utilisant la commande suivante :
npm run start
