# Portfolio content

Ces fichiers Markdown sont la source éditoriale destinée au portfolio CLI et à l’assistant IA. Les trois langues (`fr`, `en`, `es`) contiennent les mêmes rubriques.

Éditer le fichier correspondant à la commande : `content/fr/welcome.md`, `about.md`, `skills.md`, `lab.md`, `experience.md`, `projects.md`, `education.md`, `certification.md` ou `ai.md`.

En mode `local`, Docker monte directement ce dossier : éditez un fichier puis rechargez la page, sans relancer `deploy.sh`. En mode `github`, committez le fichier sur la branche publique configurée puis rechargez la page. Le navigateur détecte le nouveau SHA et recharge tous les Markdown ; rien n’est poussé dans le container.

Le contenu doit rester factuel et public. Ne pas y placer de secrets, tokens, IP internes ou informations confidentielles.
