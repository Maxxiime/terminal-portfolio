export type Locale = "fr" | "en" | "es";

export const supportedLocales = ["fr", "en", "es"] as const;

export const localeLabels: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  es: "Español",
};

export const answerLanguageNames: Record<Locale, string> = {
  fr: "French",
  en: "English",
  es: "Spanish",
};

export const commandNotFoundMessages: Record<Locale, string[]> = {
  fr: [
    "Bien tenté.",
    "Autorisation refusée par la police du fun.",
    "Accès sudo refusé.",
    "Vous n'êtes pas dans le fichier sudoers.",
    "rm -rf bloqué.",
    "Accès refusé.",
    "Commande rejetée.",
    "404: privilèges de shell introuvables.",
    "Calmez-vous, Mr Robot.",
    "Cet incident ne sera signalé à absolument personne.",
    "Le pare-feu a tout vu.",
    "Cette commande vient d'une autre timeline.",
    "Segmentation fault (de vos attentes).",
    "Authentification échouée.",
    "Peut-être commencer par devenir root.",
    "Le homelab a survécu à une journée de plus.",
  ],
  en: [
    "Nice try.",
    "Permission denied by the fun police.",
    "sudo access rejected.",
    "You are not in the sudoers file.",
    "rm -rf blocked.",
    "Access denied.",
    "Command rejected.",
    "404: shell privileges not found.",
    "Calm down there, Mr. Robot.",
    "This incident will be reported to absolutely nobody.",
    "The firewall saw everything.",
    "That command belongs to another timeline.",
    "Segmentation fault (of your expectations).",
    "Authentication failed.",
    "Maybe try becoming root first.",
    "The homelab survived another day.",
    "Even the containers looked nervous.",
    'The AI agents reviewed this and said "absolutely not".',
  ],
  es: [
    "Buen intento.",
    "Permiso denegado por la policía del humor.",
    "Acceso sudo rechazado.",
    "No estás en el archivo sudoers.",
    "rm -rf bloqueado.",
    "Acceso denegado.",
    "Comando rechazado.",
    "404: privilegios de shell no encontrados.",
    "Tranquilo, Mr. Robot.",
    "Este incidente no será reportado a absolutamente nadie.",
    "El firewall lo vio todo.",
    "Ese comando pertenece a otra línea temporal.",
    "Segmentation fault (de tus expectativas).",
    "Autenticación fallida.",
    "Tal vez deberías empezar por ser root.",
    "El homelab sobrevivió otro día.",
  ],
};

export const resolveLocale = (value?: string | null): Locale => {
  const normalized = value?.toLowerCase().trim() || "";

  if (normalized.startsWith("fr")) return "fr";
  if (normalized.startsWith("es")) return "es";
  return "en";
};

export const uiText = {
  fr: {
    commandDescriptions: {
      about: "résumé du profil",
      certification: "certifications rangées par date",
      clear: "vider le terminal",
      contact: "contact et liens de profil",
      education: "études et détails de formation",
      experience: "expérience infrastructure professionnelle",
      exit: "quitter la page",
      gui: "ouvrir le CV dans un nouvel onglet",
      help: "voir les commandes disponibles",
      lab: "détails du homelab",
      language: "choisir la langue",
      question: "poser une question IA sur mon CV / portfolio",
      skills: "stack principale et outils",
      welcome: "afficher la section d'accueil",
    },
    helpAutocomplete: "autocomplète la commande",
    helpPrevious: "revient à la commande précédente",
    helpClear: "vide le terminal",
    helpShortcutTab: "Tab",
    helpShortcutPrevious: "Flèche haut",
    bootSequence: [
      {
        prefix: "[boot]",
        message: "démarrage des conteneurs",
        variant: "boot",
      },
      {
        prefix: "[boot]",
        message: "synchronisation des données du profil",
        variant: "boot",
      },
      {
        prefix: "[boot]",
        message: "réveil des routines d'automatisation",
        variant: "boot",
      },
      {
        prefix: "[hint]",
        message: "on soudoye les conteneurs avec du café",
        variant: "hint",
      },
      { prefix: "[ok]", message: "application portfolio prête", variant: "ok" },
    ],
    bootHints: [
      "on soudoie les conteneurs avec du café",
      "supplier kubernetes de bien vouloir fonctionner",
      "négocier avec l'équilibreur de charge",
      "redémarrer l'espoir et l'optimisme",
      "convaincre le DNS que tout va bien",
      "tout mettre sur le dos du réseau",
      "apprendre au pare-feu à se détendre",
      "synchroniser avec les phases de la lune",
      "s'excuser auprès des tâches cron",
      "implorer le proxy inverse de se calmer",
      "fuir les alertes d'astreinte",
      "réentraîner l'IA sur des grains de café",
      "sacrifier un canard en caoutchouc au débogueur",
      "vérifier si ça marche en prod",
      "l'éteindre et le rallumer",
      "grepper le sens de la vie",
      "rajouter de la RAM dans le cloud",
      "demander à chatgpt pourquoi la prod est en feu",
      "aliaser rm -rf en s'il-vous-plaît-non",
      "crier après systemd",
      "nettoyer les images docker inutilisées et les regrets",
      "ignorer la fuite mémoire pour l'instant",
      "vider le cache et le karma",
      "attendre que le pipeline de build aille mieux",
      "dire à terraform qu'il a bien travaillé",
      "remplacer null par des bonnes ondes",
      "déployer en staging et appeler ça terminé",
      "chmod 777 et passer à autre chose",
      "ajouter une couche d'abstraction de plus",
      "écrire les tests après coup",
      "ouvrir un ticket et l'oublier",
      "piper tout vers /dev/null",
      "livrer un fix avec un hotfix pour le fix",
      "committer des secrets par accident encore",
      "lancer apt-get upgrade en priant",
      "attendre que le VPN se souvienne de vous",
      "rassurer les logs que tout va bien",
      "blâmer un test flaky en bonne conscience",
      "résoudre un conflit de merge à pile ou face",
      "planifier un postmortem pour le postmortem",
    ],
    welcomeHeadline: "Bienvenue sur mon terminal portfolio",
    welcomeHint:
      "Tape help pour lister les commandes disponibles ou question pour obtenir des réponses assistées par l'IA à propos du portfolio.",
    questionPlaceholder: "Pose une question sur mon CV ou mon portfolio.",
    questionUsage:
      "Usage: question <pose une question sur mon expérience, mes compétences, mes projets...>",
    questionLoadingTitle: "Interrogation de l'agent portfolio…",
    questionLoadingRead:
      "Lecture du CV, de l'expérience, des compétences et des projets",
    questionLoadingDraft:
      "Rédaction d'une réponse naturelle orientée recruteur",
    questionElapsed: "Temps écoulé",
    questionFallback:
      "Je n'ai pas pu extraire une réponse à partir du contexte du portfolio.",
    questionServiceUnavailable:
      "Le service de questions est indisponible pour le moment.",
    questionTimeout: "Le service de questions a pris trop de temps à répondre.",
    questionRateLimited:
      "OpenRouter limite temporairement les requêtes. Réessaie dans un instant.",
    questionInvalidApiKey: "La clé API OpenRouter semble invalide ou expirée.",
    questionConnectivityIssue:
      "Le réseau ou le DNS empêche de joindre OpenRouter.",
    questionModelOverloaded:
      "Le modèle demandé est saturé ou indisponible pour l'instant.",
    openRouterMissing: "OpenRouter n'est pas encore configuré sur le serveur.",
    educationHeading: "Études",
    certificationsHeading: "Certifications",
    languagesHeading: "Langues",
    experienceHeading: "Expérience professionnelle",
    experienceReplyHint: "Tape 1, 2 ou 3 pour ouvrir un poste.",
    experienceSwitchHint: "Tape 1, 2 ou 3 pour changer de poste.",
    contactReplyHint: "Tape 1, 2, 3 ou 4 pour ouvrir le lien.",
    contactSwitchHint: "Tape 1, 2, 3 ou 4 pour ouvrir un autre lien.",
    labHeading: "Self-Hosted Infrastructure, Automation & AI Lab",
    labInfrastructureHeading: "Infrastructure",
    aiHeading: "IA",
    emailHint: "Utilise contact pour les liens de profil actuels.",
    usageLabel: "Usage",
    exampleLabel: "ex",
    projectPlaceholder: "numero-du-projet",
    languageCurrent: "Actuelle",
    languageReplyHint: "Tape 1, 2 ou 3 pour choisir la langue",
    commandNotFound: "commande introuvable",
    exitFallback:
      "Fermeture de l'onglet bloquée, redirection vers une page vide.",
  },
  en: {
    commandDescriptions: {
      about: "profile summary",
      certification: "certifications by date",
      clear: "clear the terminal",
      contact: "contact and profile links",
      education: "education and training details",
      experience: "professional infrastructure experience",
      exit: "leave the page",
      gui: "open the CV in a new tab",
      help: "check available commands",
      lab: "self-hosted lab overview",
      language: "choose the language",
      question: "ask AI about my CV / portfolio",
      skills: "core stack and tools",
      welcome: "display hero section",
    },
    helpAutocomplete: "autocompletes the command",
    helpPrevious: "go back to previous command",
    helpClear: "clear the terminal",
    helpShortcutTab: "Tab",
    helpShortcutPrevious: "Up Arrow",
    bootSequence: [
      { prefix: "[boot]", message: "starting containers", variant: "boot" },
      { prefix: "[boot]", message: "syncing profile data", variant: "boot" },
      {
        prefix: "[boot]",
        message: "warming automation routines",
        variant: "boot",
      },
      {
        prefix: "[hint]",
        message: "bribing containers with coffee",
        variant: "hint",
      },
      { prefix: "[ok]", message: "portfolio app ready", variant: "ok" },
    ],
    bootHints: [
      "bribing containers with coffee",
      "asking kubernetes to please just work",
      "negotiating with the load balancer",
      "rebooting hope and optimism",
      "convincing DNS this is fine",
      "blaming the network for everything",
      "teaching the firewall to relax",
      "syncing with the moon phases",
      "apologizing to the cron jobs",
      "begging the reverse proxy to chill",
      "hiding from the on-call alert",
      "retraining the AI on coffee beans",
      "sacrificing a rubber duck to the debugger",
      "checking if it works in production",
      "turning it off and on again",
      "grepping for the meaning of life",
      "adding more RAM to the cloud",
      "asking chatgpt why prod is down",
      "aliasing rm -rf to please-dont",
      "yelling at systemd",
      "pruning unused docker images and feelings",
      "ignoring the memory leak for now",
      "clearing the cache and the karma",
      "waiting for the build pipeline to feel better",
      "telling terraform it did a good job",
      "overriding null with good vibes",
      "deploying to staging and calling it done",
      "chmod 777 and moving on",
      "adding another layer of abstraction",
      "writing tests after the fact",
      "opening a ticket and forgetting about it",
      "piping everything to /dev/null",
      "shipping a fix with a hotfix for the fix",
      "committing secrets by accident again",
      "running apt-get upgrade and praying",
      "waiting for the VPN to remember who you are",
      "assuring the server logs that everything is fine",
      "blaming a flaky test in good conscience",
      "resolving a merge conflict with a coin toss",
      "scheduling a postmortem for the postmortem",
    ],
    welcomeHeadline: "Welcome to my terminal portfolio",
    welcomeHint:
      "Type help to list available commands or question for AI-assisted answers about the portfolio.",
    questionPlaceholder: "Ask a question about my CV or portfolio.",
    questionUsage:
      "Usage: question <ask about my experience, skills, projects...>",
    questionLoadingTitle: "Querying portfolio agent…",
    questionLoadingRead: "Reading CV, experience, skills and projects",
    questionLoadingDraft: "Preparing answer",
    questionElapsed: "Elapsed",
    questionFallback:
      "I couldn't extract an answer from the portfolio context.",
    questionServiceUnavailable: "Question service is unavailable right now.",
    questionTimeout: "Question service took too long to respond.",
    questionRateLimited:
      "OpenRouter is temporarily rate limiting requests. Try again in a moment.",
    questionInvalidApiKey: "The OpenRouter API key looks invalid or expired.",
    questionConnectivityIssue:
      "DNS or network connectivity is preventing access to OpenRouter.",
    questionModelOverloaded:
      "The requested model is overloaded or unavailable right now.",
    openRouterMissing: "OpenRouter is not configured yet on the server.",
    educationHeading: "Education",
    certificationsHeading: "Certifications",
    languagesHeading: "Languages",
    experienceHeading: "Professional experience",
    experienceReplyHint: "Type 1, 2 or 3 to open a role.",
    experienceSwitchHint: "Type 1, 2 or 3 to switch roles.",
    contactReplyHint: "Type 1, 2, 3 or 4 to open the link.",
    contactSwitchHint: "Type 1, 2, 3 or 4 to open another link.",
    labHeading: "Self-Hosted Infrastructure, Automation & AI Lab",
    labInfrastructureHeading: "Infrastructure",
    aiHeading: "AI",
    emailHint: "Use contact for the current profile links.",
    usageLabel: "Usage",
    exampleLabel: "eg",
    projectPlaceholder: "project-no",
    languageCurrent: "Current",
    languageReplyHint: "Type 1, 2 or 3 to choose the language",
    commandNotFound: "command not found",
    exitFallback: "Tab close was blocked, redirecting to a blank page.",
  },
  es: {
    commandDescriptions: {
      about: "resumen del perfil",
      certification: "certificaciones ordenadas por fecha",
      clear: "limpiar el terminal",
      contact: "contacto y enlaces del perfil",
      education: "educación y detalles de formación",
      experience: "experiencia profesional en infraestructura",
      exit: "salir de la página",
      gui: "abrir el CV en una nueva pestaña",
      help: "ver comandos disponibles",
      lab: "vista general del lab self-hosted",
      language: "elegir idioma",
      question: "preguntar a la IA sobre mi CV / portfolio",
      skills: "stack principal y herramientas",
      welcome: "mostrar la sección de bienvenida",
    },
    helpAutocomplete: "autocompleta el comando",
    helpPrevious: "vuelve al comando anterior",
    helpClear: "limpia el terminal",
    helpShortcutTab: "Tab",
    helpShortcutPrevious: "Flecha arriba",
    bootSequence: [
      { prefix: "[boot]", message: "arrancando contenedores", variant: "boot" },
      {
        prefix: "[boot]",
        message: "sincronizando datos del perfil",
        variant: "boot",
      },
      {
        prefix: "[boot]",
        message: "activando rutinas de automatización",
        variant: "boot",
      },
      {
        prefix: "[hint]",
        message: "sobornando contenedores con café",
        variant: "hint",
      },
      { prefix: "[ok]", message: "aplicación portfolio lista", variant: "ok" },
    ],
    bootHints: [
      "sobornando contenedores con café",
      "rogando a kubernetes que funcione",
      "negociando con el balanceador de carga",
      "reiniciando la esperanza y el optimismo",
      "convenciendo al DNS de que todo está bien",
      "culpando a la red de todo",
      "enseñando al firewall a relajarse",
      "sincronizando con las fases de la luna",
      "pidiendo disculpas a los cron jobs",
      "suplicando al proxy inverso que se calme",
      "escapando de las alertas de guardia",
      "reentrenando la IA con granos de café",
      "sacrificando un patito de goma al debugger",
      "comprobando si funciona en producción",
      "apagarlo y encenderlo otra vez",
      "grepeando el sentido de la vida",
      "añadiendo más RAM a la nube",
      "preguntando a chatgpt por qué la prod está en llamas",
      "aliasando rm -rf a por-favor-no",
      "gritándole a systemd",
      "limpiando imágenes docker inútiles y remordimientos",
      "ignorando el memory leak por ahora",
      "limpiando la caché y el karma",
      "esperando que el pipeline de build se recupere",
      "diciéndole a terraform que lo hizo bien",
      "reemplazando null con buenas vibras",
      "desplegando en staging y llamándolo terminado",
      "chmod 777 y seguir adelante",
      "añadiendo otra capa de abstracción",
      "escribiendo los tests a posteriori",
      "abriendo un ticket y olvidarlo",
      "redirigiendo todo a /dev/null",
      "entregando un fix con un hotfix para el fix",
      "commiteando secretos por accidente otra vez",
      "ejecutando apt-get upgrade y rezando",
      "esperando a que la VPN recuerde quién eres",
      "asegurando a los logs que todo está bien",
      "culpando a un test flaky con buena conciencia",
      "resolviendo un conflicto de merge a cara o cruz",
      "programando un postmortem para el postmortem",
    ],
    welcomeHeadline: "Bienvenido a mi terminal portfolio",
    welcomeHint:
      "Escribe help para listar los comandos disponibles o question para obtener respuestas asistidas por IA sobre el portfolio.",
    questionPlaceholder: "Haz una pregunta sobre mi CV o portfolio.",
    questionUsage:
      "Uso: question <pregunta sobre mi experiencia, habilidades, proyectos...>",
    questionLoadingTitle: "Consultando al agente del portfolio…",
    questionLoadingRead: "Leyendo CV, experiencia, habilidades y proyectos",
    questionLoadingDraft:
      "Redactando una respuesta natural orientada a reclutamiento",
    questionElapsed: "Tiempo transcurrido",
    questionFallback:
      "No pude extraer una respuesta del contexto del portfolio.",
    questionServiceUnavailable:
      "El servicio de preguntas no está disponible en este momento.",
    questionTimeout: "El servicio de preguntas tardó demasiado en responder.",
    questionRateLimited:
      "OpenRouter está limitando temporalmente las solicitudes. Inténtalo de nuevo en un momento.",
    questionInvalidApiKey:
      "La clave API de OpenRouter parece inválida o caducada.",
    questionConnectivityIssue: "El DNS o la red impiden acceder a OpenRouter.",
    questionModelOverloaded:
      "El modelo solicitado está saturado o no está disponible ahora mismo.",
    openRouterMissing: "OpenRouter todavía no está configurado en el servidor.",
    educationHeading: "Educación",
    certificationsHeading: "Certificaciones",
    languagesHeading: "Idiomas",
    experienceHeading: "Experiencia profesional",
    experienceReplyHint: "Escribe 1, 2 o 3 para abrir un puesto.",
    experienceSwitchHint: "Escribe 1, 2 o 3 para cambiar de puesto.",
    contactReplyHint: "Escribe 1, 2, 3 o 4 para abrir el enlace.",
    contactSwitchHint: "Escribe 1, 2, 3 o 4 para abrir otro enlace.",
    labHeading: "Self-Hosted Infrastructure, Automation & AI Lab",
    labInfrastructureHeading: "Infraestructura",
    aiHeading: "IA",
    emailHint: "Usa contact para los enlaces actuales del perfil.",
    usageLabel: "Uso",
    exampleLabel: "ej",
    projectPlaceholder: "numero-del-proyecto",
    languageCurrent: "Actual",
    languageReplyHint: "Escribe 1, 2 o 3 para elegir el idioma",
    commandNotFound: "comando no encontrado",
    exitFallback:
      "No se pudo cerrar la pestaña, redirigiendo a una página en blanco.",
  },
} as const;

export const getCommandNotFoundMessage = (locale: Locale, index: number) => {
  const messages =
    commandNotFoundMessages[locale] || commandNotFoundMessages.en;

  if (!messages.length) {
    return "command not found";
  }

  const safeIndex =
    ((index % messages.length) + messages.length) % messages.length;
  return messages[safeIndex] || messages[0];
};

export const pickCommandNotFoundIndex = (
  locale: Locale,
  previousIndex: number | null,
  random: () => number = Math.random
) => {
  const messages =
    commandNotFoundMessages[locale] || commandNotFoundMessages.en;

  if (messages.length <= 1) {
    return 0;
  }

  const lastIndex = previousIndex ?? -1;

  for (let attempt = 0; attempt < 8; attempt += 1) {
    const nextIndex = Math.floor(random() * messages.length);
    if (nextIndex !== lastIndex) {
      return nextIndex;
    }
  }

  return (lastIndex + 1) % messages.length;
};
