# Site MEDAS — guide rapide

## ⚠️ À faire en priorité : activer l'envoi automatique du formulaire de contact

Le formulaire de `contact.html` est prêt, mais il a besoin d'une **clé gratuite Web3Forms** pour envoyer les messages automatiquement vers `eglisemedasyamoussoukro@gmail.com`. Sans cette clé, le formulaire fonctionne quand même (il ouvre l'application e-mail à la place), mais ce n'est pas automatique.

**Étapes (5 minutes, gratuit, aucune carte bancaire) :**

1. Allez sur **https://web3forms.com**
2. Entrez `eglisemedasyamoussoukro@gmail.com` dans le champ prévu et cliquez sur "Create Access Key".
3. Ouvrez votre boîte mail — Web3Forms vous envoie un e-mail avec votre clé (une suite de lettres/chiffres).
4. Ouvrez `contact.html` dans VS Code, cherchez (Ctrl+F) :
   ```
   COLLEZ_VOTRE_CLE_WEB3FORMS_ICI
   ```
5. Remplacez ce texte par la clé reçue par e-mail (gardez les guillemets autour).
6. Sauvegardez. C'est tout — le formulaire enverra désormais les messages directement dans votre boîte mail, sans que le visiteur ait besoin d'ouvrir son application e-mail.

Tant que cette clé n'est pas configurée, le bouton "Envoyer le message" ouvre l'application e-mail du visiteur à la place (ça fonctionne, mais ce n'est pas automatique).

## Ce qui reste à compléter

| Élément | Statut |
|---|---|
| Logo réel | ✅ Fait |
| Numéro Wave / Orange Money | ✅ Fait |
| Formulaire de contact | ⏳ À faire — voir la clé Web3Forms ci-dessus |
| Cultes en ligne / Vidéos | ✅ Page dédiée créée (`videos.html`) — ajoutez vos vraies vidéos quand elles seront prêtes (voir les commentaires dans le fichier) |
| Événements | ⏳ À faire — dans `evenements.html`, remplacez l'état vide par vos cartes d'événements |
| Traductions allemand (DE) | ✅ Fait — menu, accueil et versets traduits |
| Traduction baoulé (BAO) | ⏳ Non fait — voir note ci-dessous |

## Note sur le baoulé

J'ai ajouté "BAO" dans le sélecteur de langue, mais je n'ai pas une connaissance assez fiable du baoulé pour traduire moi-même le site et les versets sans risquer des erreurs — en particulier pour les versets bibliques, où l'exactitude compte beaucoup. Pour l'instant, choisir "BAO" laisse le contenu en français.

Deux options :
- Un membre de l'église qui parle baoulé peut fournir les traductions des quelques phrases du menu (Accueil, Cultes, Contact, etc.) et des versets — je les intègre ensuite très rapidement.
- Pour les versets spécifiquement, la Société Biblique de Côte d'Ivoire a publié un Nouveau Testament en baoulé dans le domaine public : https://bibliamundi.com/wp-content/uploads/2023/09/Baoule-Bible-New-Testament.pdf — utilisable comme source si quelqu'un peut confirmer les passages exacts.

## Structure des fichiers

```
medas-site/
  index.html          Accueil
  a-propos.html       À propos / Fondateur
  cultes.html         Lieu de culte, horaires, cultes en ligne
  videos.html         Vidéos & directs
  departements.html   Les 9 ministères
  evenements.html     Événements (à remplir)
  dons.html           Dons (Wave / Orange Money)
  contact.html        Téléphone, email, WhatsApp, adresse, formulaire
  assets/
    css/style.css     Feuille de style unique
    js/main.js        Menu mobile, bandeau de versets, langue, formulaire
    img/              Logos, photos
```
