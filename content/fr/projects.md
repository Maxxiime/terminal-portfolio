# Projets & Lab

Une sélection de projets personnels, d'expérimentations et de prototypes axés sur l'infrastructure, l'automatisation, le self-hosting et l'IA appliquée aux opérations.

## 🧠 Lab IA, agents & automatisation

Un environnement self-hosted dédié à l'expérimentation de modèles IA locaux, d'agents, de mémoire à long terme et de workflows automatisés.

L'objectif est d'aller au-delà des simples chatbots en connectant l'IA aux outils et aux données de l'infrastructure, afin de lui permettre de rechercher des informations, d'analyser l'état des systèmes et d'exécuter des workflows contrôlés.

**Exemples :**

* LLM locaux accélérés par GPU avec Ollama
* Routage multi-modèles et multi-fournisseurs
* Agents IA disposant d'outils et d'un accès à l'infrastructure
* Mémoire à long terme et récupération contextuelle
* Workflows automatisés et tâches planifiées
* Intégration de l'IA avec les services du homelab

**Technologies :** Ollama · OpenWebUI · Hermes · Hindsight · OmniRoute · n8n · MCP · NVIDIA/CUDA

---

## 🏗️ Homelab & infrastructure self-hosted

Une plateforme d'infrastructure personnelle utilisée comme environnement à long terme pour l'expérimentation et l'exploitation.

Elle permet d'acquérir une expérience pratique sur des problématiques similaires à celles rencontrées dans des environnements réels : virtualisation, haute disponibilité, conteneurs, réseau, stockage, sauvegardes, gestion des identités, monitoring et déploiement d'applications.

**Exemples :**

* Cluster Proxmox multi-nœuds
* Virtualisation et conteneurisation
* Réplication et haute disponibilité
* Sauvegardes automatisées
* Réseau privé inter-sites
* Applications self-hosted et services internes
* Monitoring et observabilité
* Gestion centralisée des identités

**Technologies :** Proxmox · Docker · Kubernetes · ZFS · Tailscale · Grafana · Authentik · Gitea · Ansible

---

## 🏠 Domotique avancée

Un écosystème domotique self-hosted construit autour de Home Assistant, avec une approche axée sur l'automatisation plutôt que sur le simple contrôle des appareils.

Les automatisations combinent la détection de présence, l'état des appareils, les horaires, les capteurs et les informations contextuelles afin de prendre automatiquement certaines décisions.

**Exemples :**

* Détection de présence multi-capteurs
* ESP32, Bluetooth et mmWave
* Automatisations contextuelles
* Monitoring des appareils et de l'infrastructure
* Intégration avec des services self-hosted
* Expérimentations de contrôle en langage naturel avec une IA locale

**Technologies :** Home Assistant · ESPHome · ESP32 · Zigbee · MQTT · Bluetooth · mmWave

---

## 🤖 Opérations d'infrastructure assistées par IA

Une couche conversationnelle expérimentale permettant d'interagir avec l'infrastructure sans remplacer les outils existants d'administration et d'observabilité.

L'IA agit comme une couche d'orchestration capable de sélectionner et d'utiliser différents outils et sources de données en fonction de la demande.

**Cas d'usage explorés :**

* Interroger l'état de systèmes Linux
* Rechercher et corréler des logs
* Identifier des erreurs et anomalies
* Interroger l'inventaire informatique
* Vérifier l'état de santé des services et équipements
* Déclencher des diagnostics automatisés
* Synthétiser les résultats provenant de plusieurs outils

L'objectif est de transformer une demande telle que *« Pourquoi ce service ne fonctionne-t-il plus ? »* en une séquence contrôlée de diagnostics, de collecte de données et d'analyse.

**Technologies :** LLM · Agents IA · MCP · API · Linux · Monitoring · Automatisation

---

## 📊 Observabilité & outils d'exploitation

Développement et expérimentation d'outils conçus pour répondre à des besoins concrets liés à l'infrastructure et aux opérations.

**Projets et expérimentations :**

* Centralisation et analyse des logs avec Grafana
* Tableaux de bord de monitoring
* Collecte de métriques système
* Scripts de sauvegarde des configurations d'équipements réseau
* Vérifications automatisées de l'état des services
* Alertes et workflows basés sur l'état de l'infrastructure
* Scripts et utilitaires d'administration Linux

**Technologies :** Grafana · Prometheus · Loki · InfluxDB · Telegraf · Python · Bash

---

## ⚙️ Automatisation des workflows & tâches

Automatisation de tâches récurrentes qui nécessiteraient autrement une intervention manuelle ou des vérifications répétées.

**Exemples :**

* Collecte et filtrage automatisés d'informations
* Recherches et monitoring planifiés
* Corrélation de plusieurs sources de données
* Notifications uniquement lorsqu'un résultat pertinent est détecté
* Tâches planifiées exécutées par des scripts ou des agents IA
* Workflows combinant API, IA et services internes

**Technologies :** n8n · Python · APIs · cron · Agents IA

---

## 🌐 Portfolio interactif avec IA

Ce portfolio est lui-même un projet technique.

Il combine une interface de type terminal avec un assistant IA capable d'utiliser le contenu du portfolio comme contexte afin de répondre dynamiquement aux questions des visiteurs.

Le contenu est séparé de l'application et peut être chargé depuis plusieurs sources, permettant de faire évoluer les informations du portfolio sans reconstruire l'ensemble de l'application.

**Technologies :** React · TypeScript · Docker · Nginx · Markdown · APIs LLM · OpenRouter

---

# Prototypes orientés entreprise

Certains projets personnels servent également de plateformes d'expérimentation pour des cas d'usage applicables à des environnements d'infrastructure professionnels.

## Assistant IA pour les opérations d'infrastructure

Un prototype d'assistant conçu pour interroger différents outils d'infrastructure et d'exploitation à partir de demandes en langage naturel.

**Exemples de scénarios :**

> « Trouve les flux réseau qui ont été bloqués au cours des dernières heures. »

L'agent peut rechercher dans les logs, filtrer les événements pertinents, corréler les informations et produire une synthèse exploitable.

> « Quels équipements rencontrent actuellement des problèmes ? »

L'agent peut combiner les informations provenant des systèmes de monitoring et de l'inventaire informatique.

> « Analyse les erreurs récentes sur ce serveur Linux. »

L'agent peut récupérer les informations système pertinentes, analyser les logs et proposer les prochaines étapes de diagnostic.

L'objectif n'est pas de remplacer les outils d'exploitation existants, mais de fournir une couche d'orchestration permettant de les interroger, de corréler leurs données et de les utiliser plus rapidement.
