# Portfolio content

Ces fichiers Markdown sont la source éditoriale destinée au portfolio CLI et à l’assistant IA. Les trois langues (`fr`, `en`, `es`) contiennent les mêmes rubriques.

Éditer le fichier correspondant à la commande : `content/fr/welcome.md`, `about.md`, `skills.md`, `lab.md`, `experience.md`, `projects.md`, `education.md`, `certification.md` ou `ai.md`.

En mode `local`, Docker monte directement ce dossier : éditez un fichier puis rechargez la page, sans relancer `deploy.sh`. En mode `github`, committez le fichier sur la branche publique configurée puis rechargez la page. Le navigateur détecte le nouveau SHA et recharge tous les Markdown ; rien n’est poussé dans le container.

Le contenu doit rester factuel et public. Ne pas y placer de secrets, tokens, IP internes ou informations confidentielles.

## Formats particuliers

### `welcome.md`

```md
# Titre d'accueil

## Nom complet

Sous-titre

Phrase d'aide optionnelle
```

Supprimez la phrase d'aide pour ne rien afficher à cet emplacement.

### `about.md`

```md
# Nom complet

Titre / rôle principal

Premier paragraphe du profil.

Autre paragraphe.
```

### `experience.md`

```md
## Entreprise — Poste

Période · Lieu

Résumé optionnel affiché dans la liste.

- Détail du poste.
- Autre détail.
```

Chaque section `##` devient automatiquement un choix numéroté. Sans résumé, le premier élément de la liste est utilisé dans l'aperçu.

### `certification.md`

```md
## Nom de la certification

Émetteur

Date

Icon: office365.svg
```

Placez l'image dans `src/public/brands/`. `Icon:` accepte un nom de fichier ou un chemin public comme `/brands/office365.svg`.

### `projects.md`

Chaque titre Markdown devient une section de la commande `projects`. Les paragraphes et listes sont affichés dans leur ordre d'origine.
