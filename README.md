# Cypressio MacarteV4



## Documentation : Tests automatisés Cypress.io "macarte" 

Les tests ont été écrits pour pouvoir être joués sur les environnements de :

    * prod (https://macarte.ign.fr/)
    * qualif (https://macarte-qualif.ign.fr/)
    * local (localhost machine developpeur)    

Par défaut, la baseUrl pointe sur la prod.
```console
"baseUrl": "https://macarte.ign.fr/",
``` 
Au besoin, elle peut être changer dans le fichier de configuration *cypress_macarte/cypress.json* 

#### Lancer les tests en prod (mode headless)

```console 
    ./node_modules/.bin/cypress run --spec cypress/integration/save_map.js
  ```  

--spec cypress/integration/save_map.js sert à spécifier un fichier à lancer


#### Lancer les tests en prod (mode chrome)

```console 
    ./node_modules/.bin/cypress run --spec cypress/integration/save_map.js --browser chrome --no-exit
  ```  
*--browser chrome* sert à spécifier un navigateur  
*--no-exit* sert à garder le navigateur ouvert à la fin de l'execution   

#### Lancer les tests en qualif

```console 
    ./node_modules/.bin/cypress run --env host=qualif --spec cypress/integration/save_map.js --browser chrome
  ```  

#### Lancer les tests en local (nécessite un pré-requis)

**Pré-requis** : 

* dans le fichier de configuration **cypress_macarte/cypress.json** 
    * définir votre url de projet en local   
        ```javascript
        "env": {
            "qualif": "https://macarte-qualif.ign.fr/",
            "prod" : "https://macarte.ign.fr/",
            "local": "https://localhost:8000/my_local_url"
        },
        ```
    * définir vos identifiants d'utilisateur local dans le fichier **/cypress_macarte/cypress/fixtures/userdata.json**
       ```javascript
       "local" : {
            "email": "localemail",
            "password": "mylocalpassword"
       }
        ```
    * définir vos urls vers une carte de test dans le fichier **/cypress_macarte/cypress/fixtures/userdata.json**
        ```javascript
        "local": {
            "email": "localemail",
            "password": "mylocalpassword"
            "edition": "edition/local",
            "carte": "/mon-compte/carte/local1245/macarte"
        }
        ```  


**Pour lancer en environnement local sur une machine de développeur:** 
**Bypass or Set a proxy on Linux**  
**By-passing the proxy**  

Si vous rencontrez des problèmes de connection sur votre localhost, taper la ligne suivante :      

```console
export NO_PROXY=localhost.ign.fr    
```

**Set a proxy**  

Dans la console: 

```console
export HTTP_PROXY=http://proxy.ign.fr:3128/
```

Assurez-vous d'avoir effectué tous les pré-requis puis taper en ligne de commande:     
```console 
    ./node_modules/.bin/cypress run --env host=local --spec cypress/integration/save_map.js --browser chrome
  ```  

**IMPORTANT !: à lire avant de lancer un test:**

Si vous voyez cette erreur en sortie de test, lisez bien le paragraphe ci-dessous:   

 ![error-snapshot-diff](https://user-images.githubusercontent.com/26600506/100128098-25373a00-2e80-11eb-87df-f12d7478780d.PNG)


Ce test comporte une comparaison visuel d'image. En effet, il compare la carte pré-enregistrée (lors du premier lancement du test) à celle générée au rejeu du test.

Voici un example de comparaison d'images (les différences entre l'image de droite et celle de gauche apparaissent au centre en rouge)

![error-snapshot-diff](https://user-images.githubusercontent.com/26600506/100217847-3af63f00-2f14-11eb-9ebc-56c97b23bb0f.PNG)


Il est donc important de bien tenir compte de ceci: 

Avant de lancer un test, (et lorsque vous changer d'envirronement d'exécution), vérifier que le repertoire **snapshots/** soit vide : 
```
* cypress_macarte/cypress/snapshots/
```
ainsi que le repertoire 
```
* cypress_macarte/cypress/snapshots/save_map.js/__diff_output__/ 
```

C'est dans le répertoire **snapshots/** qu'une capture d'écran viendra etre stockée lors de la première execution du script.   
C'est dans le répertoire __diff_output__/ que s'écrira une image comparative (uniquement en cas de différence avec le snapshot).


## Screenshots vidéo d'exemple:  

#### Vidéo du script "Localisation d'une adresse" en environnement de "qualif": 

![localisation-adresse_video](https://user-images.githubusercontent.com/26600506/104338640-0146bb00-54f7-11eb-8d29-6d438c5bd6e9.mp4)

* Saisie d'une adresse
* Chargement de la carte correspondant à cette adresse
* Comparaison de l'écran obtenu via comparateur d'images


#### Vidéo du script "Création de formes" en environnement de "qualif": 

![draw_form_video](https://user-images.githubusercontent.com/26600506/104926010-e3b69d00-599f-11eb-9178-58009a0e98b2.mp4)

* Se connecter avec l'utilisateur de qualif
* Vérifier la présence des boutons dans la drawbar
* Création de formes
* Comparaison avec l'image de référence (prendre une capture d'écran de l'image actuelle et comparaison avec l'image de référence) 
* Se déconnecter 

#### Vidéo du script "Sauvegarde map" en environnement de "qualif": 

![save_map_video](https://user-images.githubusercontent.com/26600506/104931298-7eb27580-59a6-11eb-8768-3e02edcf2240.mp4)

* Se connecter avec l'utilisateur de qualif
* Charger une carte existante 
* Faire une capture d'écran de la carte chargée 
* Sauvergarder la carte
* Vérifier que la carte a bien été sauvegardé avec la date du jour.   
* Comparaison de la carte avec l'image de référence 
* Se déconnecter 