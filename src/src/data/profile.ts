import type { Locale } from "../i18n";

const baseProfile = {
  name: "Maxime Lemenand",
  firstName: "Maxime",
  email: "contact@maxime-lemenand.com",
  linkedinUrl: "https://www.linkedin.com/in/maximelemenand",
  terminalHost: "maxime-lemenand.com",
  guiUrl: "https://maxime-lemenand.com/",
  cvUrl: "https://maxime-lemenand.com/cv/resume.pdf",
  githubUrl: "https://github.com/Maxxiime",
  workingDir: "/home/maxime",
  whoami: "guest",
} as const;

type Localized<T> = Record<Locale, T>;

type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
};

type ProjectItem = {
  id: number;
  title: string;
  desc: string;
  url: string;
};

type SkillGroup = {
  name: string;
  items: string[];
};

type EducationDetail = {
  title: string;
  bullets: string[];
};

type EducationItem = {
  school: string;
  program: string;
  period: string;
  details?: EducationDetail[];
};

type ContactItem = {
  id: number;
  label: string;
  value: string;
  icon?: string;
  iconUrl?: string;
  url?: string;
};

type CertificationItem = {
  title: string;
  issuer: string;
  issued: string;
  iconUrl: string;
};

type SocialLink = {
  id: number;
  title: string;
  url: string;
  tab: number;
  icon: string;
};

const localizedProfileContent: Localized<{
  title: string;
  location: string;
  status: string;
}> = {
  fr: {
    title:
      "Infrastructure / DevOps | Automatisation, self-hosting, opérations assistées par l'IA",
    location: "Montréal, Québec, Canada",
    status:
      "Ouvert aux discussions autour de l'infrastructure, de la plateforme, de l'automatisation et des opérations assistées par l'IA.",
  },
  en: {
    title: "DevOps / SRE | Automation, Self-Hosting, AI-Driven Operations",
    location: "Montreal, Quebec, Canada",
    status:
      "Open to infrastructure, platform, automation and AI-assisted operations discussions.",
  },
  es: {
    title:
      "Infrastructure / DevOps | Automatización, self-hosting y operaciones asistidas por IA",
    location: "Montreal, Quebec, Canadá",
    status:
      "Abierto a conversaciones sobre infraestructura, plataforma, automatización y operaciones asistidas por IA.",
  },
};

const aboutSectionsByLocale: Localized<string[]> = {
  fr: [
    "Je travaille sur l'infrastructure, l'automatisation et les systèmes fiables, avec une approche DevOps très terrain.",
    "Mon parcours couvre les systèmes, le cloud, le réseau, la virtualisation, les conteneurs, l'observabilité et l'automatisation d'infrastructure.",
    "J'aime construire des environnements concrets à exploiter, plus simples à maintenir et plus faciles à faire évoluer.",
    "En dehors du travail, je construis des systèmes self-hosted, des automatisations résidentielles avancées et des workflows assistés par l'IA dans un homelab long terme.",
    "J'utilise déjà des agents IA et des outils LLM locaux pour la recherche infrastructure, la configuration, les revues, les migrations et différents workflows opérationnels.",
    "Je vise des rôles où je peux rester très proche de l'infrastructure et du DevOps tout en allant plus loin sur l'automatisation intelligente et les workflows à base d'agents.",
    "Je ne cherche pas à m'éloigner de l'infrastructure. Je cherche à capitaliser dessus.",
  ],
  en: [
    "I work on infrastructure, automation and reliable systems, with a strong hands-on DevOps mindset.",
    "My background spans systems, cloud, networking, virtualization, containers, observability and infrastructure automation.",
    "I enjoy building environments that are practical to operate, easier to maintain and simpler to scale.",
    "Outside of work, I build self-hosted systems, advanced home automation and AI-assisted workflows in a long-running homelab.",
    "I already use AI agents and local LLM tools for infrastructure research, configuration work, reviews, migration-related tasks and operational workflows.",
    "I want roles where I can stay close to infrastructure and DevOps while pushing further into intelligent automation and agent-based workflows.",
    "I’m not looking to move away from infrastructure. I’m looking to build on it.",
  ],
  es: [
    "Trabajo en infraestructura, automatización y sistemas confiables, con una mentalidad DevOps muy práctica.",
    "Mi experiencia cubre sistemas, cloud, redes, virtualización, contenedores, observabilidad y automatización de infraestructura.",
    "Me gusta construir entornos prácticos de operar, más fáciles de mantener y más simples de escalar.",
    "Fuera del trabajo, construyo sistemas self-hosted, automatización residencial avanzada y flujos asistidos por IA en un homelab de largo plazo.",
    "Ya utilizo agentes de IA y herramientas LLM locales para investigación de infraestructura, configuración, revisiones, migraciones y flujos operativos.",
    "Busco roles donde pueda seguir muy cerca de la infraestructura y DevOps mientras profundizo en automatización inteligente y flujos basados en agentes.",
    "No quiero alejarme de la infraestructura. Quiero construir sobre ella.",
  ],
};

const experiencesByLocale: Localized<ExperienceItem[]> = {
  fr: [
    {
      company: "Eidos-Montréal",
      role: "Administrateur systèmes / DevOps",
      period: "Mars 2021 - Présent",
      location: "Montréal, QC",
      bullets: [
        "Conception, déploiement et maintien des services d'infrastructure et de plateforme pour les environnements de production et internes.",
        "Exploitation de charges conteneurisées sur Kubernetes.",
        "Automatisation des tâches infrastructure et opérationnelles avec Terraform, Ansible, CI/CD et GitOps.",
        "Contribution à l'évolution de la plateforme sur la virtualisation, le matériel, l'hébergement applicatif, le stockage et la transition VMware vers Nutanix.",
        "Amélioration de la sécurité et de la visibilité via scan de vulnérabilités, monitoring, logging et hardening sur Linux et Windows.",
        "Résolution d'incidents complexes touchant systèmes, cloud, conteneurs, réseau et services de plateforme.",
      ],
    },
    {
      company: "OVH",
      role: "Administrateur systèmes / DevOps — opérations cloud privé",
      period: "Mars 2017 - Mars 2021",
      location: "Grand Montréal",
      bullets: [
        "Exploitation et support d'infrastructures de cloud privé à grande échelle en production.",
        "Gestion d'incidents, de demandes de service et de changements d'infrastructure sur des environnements clients internationaux.",
        "Amélioration de la stabilité et de la fiabilité opérationnelle des plateformes VMware.",
        "Travail à grande échelle avec vCenter, ESXi, NSX, vSAN, Log Insight et vROps.",
        "Support backup, reprise après sinistre, systèmes Linux / Windows et troubleshooting réseau en contexte cloud.",
        "Collaboration avec équipes internes et clients pour maintenir la continuité de service à grande échelle.",
      ],
    },
    {
      company: "Transdev",
      role: "Ingénieur intégration",
      period: "Avril 2016 - Mars 2017",
      location: "Région lyonnaise, France",
      bullets: [
        "Installation et configuration de solutions pour les environnements de production.",
        "Recommandations techniques et fonctionnelles, définition d'architecture et choix de solution.",
        "Production de documentation d'installation et support à la maintenance en production.",
        "Travail avec VMware 6.0, Windows Server 2008/2012, Debian 8, IIS, Microsoft SQL Server et XenApp.",
      ],
    },
    {
      company: "Orange",
      role: "Administrateur systèmes et réseaux",
      period: "Novembre 2014 - Avril 2016",
      location: "Région grenobloise, France",
      bullets: [
        "Support d'un parc d'environ 400 serveurs et 100 équipements réseau, majoritairement Linux/Unix.",
        "Gestion de clusters ESXi, serveurs Linux/Unix/Windows, scripting, stockage NetApp et environnements blade.",
        "Travail sur load balancers, firewalls, routeurs, switches et équipements d'accès distant / réseau.",
        "Mise en place et support du monitoring avec Centreon et de l'inventaire avec OCS.",
        "Analyse d'incidents, troubleshooting, documentation et coordination d'implémentations en datacenter.",
      ],
    },
    {
      company: "Keolis",
      role: "Administrateur systèmes et réseaux (alternance)",
      period: "Septembre 2013 - Septembre 2014",
      location: "Région de Caen, France",
      bullets: [
        "Administration d'environnements Windows Server / Hyper-V, XenApp, sauvegardes et sécurité poste de travail.",
        "Support utilisateurs, supervision via CACTI et OCS/GLPI, contribution à la migration Windows XP vers 7.",
        "Participation au diagnostic du SI et à l'évaluation de l'infrastructure réseau.",
      ],
    },
    {
      company: "IUT de Caen",
      role: "Stage",
      period: "Mai 2013 - Juillet 2013",
      location: "Région de Caen, France",
      bullets: [
        "Étude et mise en place d'une authentification forte avec 802.1X et RADIUS.",
        "Configuration de switching Cisco L3 et de VM Proxmox pour FreeRADIUS, LDAP et SQL.",
        "Travail sur le déploiement d'un hotspot avec Alcasar.",
      ],
    },
    {
      company: "Occasions Informatiques",
      role: "Stage",
      period: "Mai 2012 - Juillet 2012",
      location: "France",
      bullets: [
        "Mise en place d'une solution de vidéosurveillance par caméras IP.",
        "Configuration de switching HP, caméras IP, câblage RJ45 et composants de sauvegarde / stockage en DMZ.",
      ],
    },
  ],
  en: [
    {
      company: "Eidos-Montréal",
      role: "System Administrator / DevOps",
      period: "March 2021 - Present",
      location: "Montreal, QC",
      bullets: [
        "Build, deploy and maintain infrastructure and platform services supporting production and internal environments.",
        "Deliver and operate containerized workloads on Kubernetes.",
        "Automate infrastructure and operational tasks with Terraform, Ansible, CI/CD and GitOps.",
        "Contribute to platform evolution across virtualization, hardware, application hosting, storage services and VMware-to-Nutanix changes.",
        "Improve security and visibility with vulnerability scanning, monitoring, logging and service hardening across Linux and Windows environments.",
        "Troubleshoot complex infrastructure and application issues across systems, cloud, containers, networking and platform services.",
      ],
    },
    {
      company: "OVH",
      role: "System Administrator / DevOps — Private Cloud Operations",
      period: "March 2017 - March 2021",
      location: "Greater Montreal Metropolitan Area",
      bullets: [
        "Operated and supported large-scale private cloud infrastructure in production environments.",
        "Resolved incidents, handled service requests and implemented infrastructure changes across international customer environments.",
        "Improved service stability and operational reliability across VMware-based platforms.",
        "Worked with vCenter, ESXi, NSX, vSAN, Log Insight and vROps at large scale.",
        "Supported backup, disaster recovery, Linux / Windows systems and network troubleshooting in cloud infrastructure contexts.",
        "Collaborated across teams and customers to maintain platform continuity and deliver support at scale.",
      ],
    },
    {
      company: "Transdev",
      role: "Integration Engineer",
      period: "April 2016 - March 2017",
      location: "Lyon Area, France",
      bullets: [
        "Installed and configured solutions for production environments.",
        "Provided technical and functional recommendations, architecture definition and solution choices.",
        "Delivered installation documentation and supported production maintenance.",
        "Worked with VMware 6.0, Windows Server 2008/2012, Debian 8, IIS, Microsoft SQL Server and XenApp.",
      ],
    },
    {
      company: "Orange",
      role: "System and Network Administrator",
      period: "November 2014 - April 2016",
      location: "Grenoble Area, France",
      bullets: [
        "Supported an environment of roughly 400 servers and about 100 network devices, mostly Linux/Unix.",
        "Handled ESXi clusters, Linux/Unix/Windows servers, scripting, NetApp storage and blade environments.",
        "Worked on load balancers, firewalls, routers, switches and remote access/network equipment.",
        "Implemented and supported monitoring with Centreon and inventory with OCS.",
        "Delivered incident analysis, troubleshooting, documentation and datacenter implementation coordination.",
      ],
    },
    {
      company: "Keolis",
      role: "System and Network Administrator (work-study)",
      period: "September 2013 - September 2014",
      location: "Caen Area, France",
      bullets: [
        "Administered Windows Server / Hyper-V environments, XenApp, backups and endpoint security.",
        "Supported users, supervised systems with CACTI and OCS/GLPI, and contributed to Windows XP to 7 migration work.",
        "Participated in information system diagnostics and network infrastructure assessment.",
      ],
    },
    {
      company: "IUT de Caen",
      role: "Internship",
      period: "May 2013 - July 2013",
      location: "Caen Area, France",
      bullets: [
        "Studied and implemented strong authentication with 802.1X and RADIUS.",
        "Configured Cisco L3 switching and Proxmox-based VMs for FreeRADIUS, LDAP and SQL services.",
        "Worked on hotspot deployment with Alcasar.",
      ],
    },
    {
      company: "Occasions Informatiques",
      role: "Internship",
      period: "May 2012 - July 2012",
      location: "France",
      bullets: [
        "Implemented an IP camera video surveillance solution.",
        "Configured HP switching, IP cameras, RJ45 cabling and DMZ-connected backup/storage components.",
      ],
    },
  ],
  es: [
    {
      company: "Eidos-Montréal",
      role: "Administrador de sistemas / DevOps",
      period: "Marzo 2021 - Actualidad",
      location: "Montreal, QC",
      bullets: [
        "Diseño, despliegue y mantenimiento de servicios de infraestructura y plataforma para entornos de producción e internos.",
        "Operación de cargas contenedorizadas sobre Kubernetes.",
        "Automatización de tareas de infraestructura y operación con Terraform, Ansible, CI/CD y GitOps.",
        "Contribución a la evolución de la plataforma en virtualización, hardware, alojamiento de aplicaciones, almacenamiento y cambios de VMware a Nutanix.",
        "Mejora de seguridad y visibilidad mediante escaneo de vulnerabilidades, monitoreo, logging y hardening en Linux y Windows.",
        "Resolución de incidencias complejas en sistemas, cloud, contenedores, redes y servicios de plataforma.",
      ],
    },
    {
      company: "OVH",
      role: "Administrador de sistemas / DevOps — operaciones de cloud privado",
      period: "Marzo 2017 - Marzo 2021",
      location: "Gran área de Montreal",
      bullets: [
        "Operación y soporte de infraestructura de cloud privado a gran escala en producción.",
        "Resolución de incidentes, solicitudes de servicio y cambios de infraestructura en entornos internacionales de clientes.",
        "Mejora de la estabilidad del servicio y la confiabilidad operativa de plataformas basadas en VMware.",
        "Trabajo a gran escala con vCenter, ESXi, NSX, vSAN, Log Insight y vROps.",
        "Soporte de backups, recuperación ante desastres, sistemas Linux / Windows y troubleshooting de red en contextos cloud.",
        "Colaboración con equipos y clientes para mantener la continuidad del servicio a gran escala.",
      ],
    },
    {
      company: "Transdev",
      role: "Ingeniero de integración",
      period: "Abril 2016 - Marzo 2017",
      location: "Región de Lyon, Francia",
      bullets: [
        "Instalación y configuración de soluciones para entornos de producción.",
        "Recomendaciones técnicas y funcionales, definición de arquitectura y elección de soluciones.",
        "Entrega de documentación de instalación y soporte al mantenimiento en producción.",
        "Trabajo con VMware 6.0, Windows Server 2008/2012, Debian 8, IIS, Microsoft SQL Server y XenApp.",
      ],
    },
    {
      company: "Orange",
      role: "Administrador de sistemas y redes",
      period: "Noviembre 2014 - Abril 2016",
      location: "Región de Grenoble, Francia",
      bullets: [
        "Soporte de un entorno de aproximadamente 400 servidores y 100 equipos de red, mayormente Linux/Unix.",
        "Gestión de clústeres ESXi, servidores Linux/Unix/Windows, scripting, almacenamiento NetApp y entornos blade.",
        "Trabajo con balanceadores, firewalls, routers, switches y equipamiento de acceso remoto / red.",
        "Implementación y soporte de monitoreo con Centreon e inventario con OCS.",
        "Análisis de incidentes, troubleshooting, documentación y coordinación de implementaciones en datacenter.",
      ],
    },
    {
      company: "Keolis",
      role: "Administrador de sistemas y redes (alternancia)",
      period: "Septiembre 2013 - Septiembre 2014",
      location: "Región de Caen, Francia",
      bullets: [
        "Administración de entornos Windows Server / Hyper-V, XenApp, backups y seguridad de endpoints.",
        "Soporte a usuarios, supervisión con CACTI y OCS/GLPI, y contribución a la migración de Windows XP a 7.",
        "Participación en diagnósticos del sistema de información y evaluación de infraestructura de red.",
      ],
    },
    {
      company: "IUT de Caen",
      role: "Prácticas",
      period: "Mayo 2013 - Julio 2013",
      location: "Región de Caen, Francia",
      bullets: [
        "Estudio e implementación de autenticación fuerte con 802.1X y RADIUS.",
        "Configuración de switching Cisco L3 y VMs Proxmox para FreeRADIUS, LDAP y SQL.",
        "Trabajo en despliegue de hotspot con Alcasar.",
      ],
    },
    {
      company: "Occasions Informatiques",
      role: "Prácticas",
      period: "Mayo 2012 - Julio 2012",
      location: "Francia",
      bullets: [
        "Implementación de una solución de videovigilancia con cámaras IP.",
        "Configuración de switching HP, cámaras IP, cableado RJ45 y componentes de backup / almacenamiento en DMZ.",
      ],
    },
  ],
};

const projectsByLocale: Localized<ProjectItem[]> = {
  fr: [
    {
      id: 1,
      title: "Lab IA, automatisation et infrastructure self-hosted",
      desc: "Plateforme self-hosted de long terme utilisée pour expérimenter virtualisation, conteneurs, stockage, réseau, monitoring, sauvegarde, identité, domotique et outils IA locaux dans des scénarios concrets.",
      url: baseProfile.guiUrl,
    },
    {
      id: 2,
      title: "Domotique avancée et workflows assistés par l'IA",
      desc: "Travail pratique hors production mêlant domotique, self-hosting et workflows opérationnels assistés par l'IA pour prototyper des systèmes et automatisations utiles.",
      url: baseProfile.guiUrl,
    },
    {
      id: 3,
      title: "Utilitaires d'exploitation et expérimentations observabilité",
      desc: "Inclut notamment analyse de logs avec ELK, scripts de sauvegarde pour équipements réseau, stacks de monitoring et outils opérationnels construits pour répondre à des besoins infra concrets.",
      url: baseProfile.guiUrl,
    },
  ],
  en: [
    {
      id: 1,
      title: "Self-Hosted Infrastructure, Automation & AI Lab",
      desc: "Long-running self-hosted platform used to experiment with virtualization, containers, storage, networking, monitoring, backup, identity, home automation and local AI tools in practical scenarios.",
      url: baseProfile.guiUrl,
    },
    {
      id: 2,
      title: "Advanced Home Automation & AI-Assisted Workflows",
      desc: "Hands-on work outside of production environments combining home automation, self-hosting and AI-assisted operational workflows to prototype useful systems and automations.",
      url: baseProfile.guiUrl,
    },
    {
      id: 3,
      title: "Operations Utilities & Observability Experiments",
      desc: "Includes practical work such as log analysis with ELK, backup scripting for network equipment, monitoring setups and operational tooling built to solve concrete infra problems.",
      url: baseProfile.guiUrl,
    },
  ],
  es: [
    {
      id: 1,
      title: "Lab de IA, automatización e infraestructura self-hosted",
      desc: "Plataforma self-hosted de largo plazo utilizada para experimentar con virtualización, contenedores, almacenamiento, redes, monitoreo, backup, identidad, automatización del hogar y herramientas locales de IA en escenarios reales.",
      url: baseProfile.guiUrl,
    },
    {
      id: 2,
      title: "Automatización avanzada del hogar y flujos asistidos por IA",
      desc: "Trabajo práctico fuera de producción que combina automatización del hogar, self-hosting y flujos operativos asistidos por IA para prototipar sistemas y automatizaciones útiles.",
      url: baseProfile.guiUrl,
    },
    {
      id: 3,
      title: "Utilidades operativas y experimentos de observabilidad",
      desc: "Incluye trabajo práctico como análisis de logs con ELK, scripts de backup para equipos de red, configuraciones de monitoreo y herramientas operativas creadas para resolver problemas reales de infraestructura.",
      url: baseProfile.guiUrl,
    },
  ],
};

const skillGroupsByLocale: Localized<SkillGroup[]> = {
  fr: [
    {
      name: "Core",
      items: [
        "DevOps",
        "SRE",
        "Infrastructure Automation",
        "Platform Operations",
        "Linux",
      ],
    },
    {
      name: "Platform \u0026 Virtualization",
      items: ["Kubernetes", "VMware", "Nutanix", "Proxmox", "Docker"],
    },
    {
      name: "Automation \u0026 Delivery",
      items: ["Terraform", "Ansible", "CI/CD", "Scripting", "GitOps"],
    },
    {
      name: "Cloud \u0026 Networking",
      items: ["Azure", "GCP", "AWS", "Cloudflare", "Private Cloud"],
    },
    {
      name: "Observability",
      items: ["Monitoring", "Logging", "ELK", "Grafana", "Prometheus"],
    },
    {
      name: "Network \u0026 Security",
      items: [
        "Firewalls",
        "Switching",
        "Routing",
        "NSX",
        "Load Balancing",
        "Palo Alto Networks",
      ],
    },
    {
      name: "Storage \u0026 Backup",
      items: [
        "S3-Compatible Storage",
        "vSAN",
        "Nimble",
        "NetApp",
        "Veeam",
        "Zerto",
      ],
    },
    {
      name: "AI \u0026 Automation",
      items: [
        "AI Agents",
        "Local LLMs",
        "AI-Assisted Workflows",
        "Operational Automation",
      ],
    },
  ],
  en: [
    {
      name: "Core",
      items: [
        "DevOps",
        "SRE",
        "Infrastructure Automation",
        "Platform Operations",
        "Linux",
      ],
    },
    {
      name: "Platform \u0026 Virtualization",
      items: ["Kubernetes", "VMware", "Nutanix", "Proxmox", "Docker"],
    },
    {
      name: "Automation \u0026 Delivery",
      items: ["Terraform", "Ansible", "CI/CD", "Scripting", "GitOps"],
    },
    {
      name: "Cloud \u0026 Networking",
      items: ["Azure", "GCP", "AWS", "Cloudflare", "Private Cloud"],
    },
    {
      name: "Observability",
      items: ["Monitoring", "Logging", "ELK", "Grafana", "Prometheus"],
    },
    {
      name: "Network \u0026 Security",
      items: [
        "Firewalls",
        "Switching",
        "Routing",
        "NSX",
        "Load Balancing",
        "Palo Alto Networks",
      ],
    },
    {
      name: "Storage \u0026 Backup",
      items: [
        "S3-Compatible Storage",
        "vSAN",
        "Nimble",
        "NetApp",
        "Veeam",
        "Zerto",
      ],
    },
    {
      name: "AI \u0026 Automation",
      items: [
        "AI Agents",
        "Local LLMs",
        "AI-Assisted Workflows",
        "Operational Automation",
      ],
    },
  ],
  es: [
    {
      name: "Core",
      items: [
        "DevOps",
        "SRE",
        "Infrastructure Automation",
        "Platform Operations",
        "Linux",
      ],
    },
    {
      name: "Platform \u0026 Virtualization",
      items: ["Kubernetes", "VMware", "Nutanix", "Proxmox", "Docker"],
    },
    {
      name: "Automation \u0026 Delivery",
      items: ["Terraform", "Ansible", "CI/CD", "Scripting", "GitOps"],
    },
    {
      name: "Cloud \u0026 Networking",
      items: ["Azure", "GCP", "AWS", "Cloudflare", "Private Cloud"],
    },
    {
      name: "Observability",
      items: ["Monitoring", "Logging", "ELK", "Grafana", "Prometheus"],
    },
    {
      name: "Network \u0026 Security",
      items: [
        "Firewalls",
        "Switching",
        "Routing",
        "NSX",
        "Load Balancing",
        "Palo Alto Networks",
      ],
    },
    {
      name: "Storage \u0026 Backup",
      items: [
        "S3-Compatible Storage",
        "vSAN",
        "Nimble",
        "NetApp",
        "Veeam",
        "Zerto",
      ],
    },
    {
      name: "AI \u0026 Automation",
      items: [
        "AI Agents",
        "Local LLMs",
        "AI-Assisted Workflows",
        "Operational Automation",
      ],
    },
  ],
};

const educationItemsByLocale: Localized<EducationItem[]> = {
  fr: [
    {
      school: "IUT de Caen",
      program:
        "Licence professionnelle ASRSI — Audit et sécurité des réseaux, systèmes et SI",
      period: "2013 - 2014",
      details: [
        {
          title:
            "Diagnostic des risques et politiques de sécurité des réseaux et systèmes d'information",
          bullets: [
            "Identification, mesure et diagnostic des risques",
            "Mise en œuvre de politiques de sécurité",
          ],
        },
        {
          title: "Sécurité des systèmes informatiques",
          bullets: [
            "Sécurité des réseaux : SIEM, IPS/IDS, ACL, chiffrement des flux/données, zoning, ségrégation des flux, ARP spoofing, DNS poisoning, DDoS",
            "Sécurité des systèmes d'information : PRA/PCA, SLA, QoS, gestion des accès",
          ],
        },
      ],
    },
    {
      school: "Lycée Technologique Sainte-Ursule à Caen",
      program: "BTS SIO, spécialité SISR",
      period: "2011 - 2013",
    },
  ],
  en: [
    {
      school: "IUT de Caen",
      program:
        "Professional License ASRSI — Audit and Security of Networks, Systems and Information Systems",
      period: "2013 - 2014",
      details: [
        {
          title:
            "Diagnostic of risks and security policies for secure networks and information systems",
          bullets: [
            "Identification, measurement and diagnostic of risks",
            "Implementation of security policies",
          ],
        },
        {
          title: "Security of computer systems",
          bullets: [
            "Network security: SIEM, IPS/IDS, ACL, encryption of flows/data, zoning, segregation of flows, ARP spoofing, DNS poisoning, DDoS",
            "Information system security: DRP/BCP, SLA, QoS, access management",
          ],
        },
      ],
    },
    {
      school: "Lycée Technologique Sainte-Ursule à Caen",
      program:
        "BTS SIO, specialty Infrastructure Solutions Systems and Networks",
      period: "2011 - 2013",
    },
  ],
  es: [
    {
      school: "IUT de Caen",
      program:
        "Licencia profesional ASRSI — Auditoría y seguridad de redes, sistemas y sistemas de información",
      period: "2013 - 2014",
      details: [
        {
          title:
            "Diagnóstico de riesgos y políticas de seguridad para redes y sistemas de información",
          bullets: [
            "Identificación, medición y diagnóstico de riesgos",
            "Implementación de políticas de seguridad",
          ],
        },
        {
          title: "Seguridad de sistemas informáticos",
          bullets: [
            "Seguridad de redes: SIEM, IPS/IDS, ACL, cifrado de flujos/datos, zoning, segregación de flujos, ARP spoofing, DNS poisoning, DDoS",
            "Seguridad de sistemas de información: DRP/BCP, SLA, QoS, gestión de accesos",
          ],
        },
      ],
    },
    {
      school: "Lycée Technologique Sainte-Ursule à Caen",
      program: "BTS SIO, especialidad SISR",
      period: "2011 - 2013",
    },
  ],
};

const certificationItems: CertificationItem[] = [
  {
    title: "Office 365 Exchange Online: Administration and Configuration",
    issuer: "Microsoft",
    issued: "Issued Jan 2023",
    iconUrl: "/brands/office365.svg",
  },
  {
    title: "Microsoft Azure Administrator",
    issuer: "Microsoft",
    issued: "Issued Dec 2022",
    iconUrl: "/brands/azure.svg",
  },
  {
    title: "ITIL Foundation Level",
    issuer: "PeopleCert",
    issued: "Issued Nov 2019",
    iconUrl: "/brands/itil.png",
  },
  {
    title: "Zerto Certified Professional Enterprise Engineer",
    issuer: "Zerto",
    issued: "Issued Oct 2019",
    iconUrl: "/brands/zerto.png",
  },
  {
    title: "Zerto Certified Professional for Cloud Service",
    issuer: "Zerto",
    issued: "Issued Oct 2019",
    iconUrl: "/brands/zerto.png",
  },
  {
    title: "VMware Certified Professional Data Center Virtualization",
    issuer: "VMware",
    issued: "Issued Jul 2019",
    iconUrl: "/brands/vmware.svg",
  },
  {
    title: "VMware vSphere 6.5 Foundations",
    issuer: "VMware",
    issued: "Issued Jul 2019",
    iconUrl: "/brands/vmware.svg",
  },
];

const certificationItemsByLocale: Localized<CertificationItem[]> = {
  fr: certificationItems,
  en: certificationItems,
  es: certificationItems,
};

type LabInfrastructureItem = {
  name: string;
  spec: string;
};

type LabSection = {
  title: string;
  items: string[];
};

type LabProfile = {
  title: string;
  period: string;
  intro: string;
  infrastructure: LabInfrastructureItem[];
  categories: LabSection[];
};

const labProfileByLocale: Localized<LabProfile> = {
  fr: {
    title: "Self-Hosted Infrastructure, Automation & AI Lab",
    period: "2014 - Présent",
    intro:
      "Construit et enrichi en continu depuis 2014, ce lab personnel est centré sur l'infrastructure self-hosted, l'automatisation, les workflows assistés par l'IA et les intégrations smart home avancées. Au fil du temps, il est devenu un environnement réel utilisé pour expérimenter la virtualisation, les conteneurs, le stockage, le monitoring, les sauvegardes, l'identité, le réseau, les outils LLM locaux, les workflows à base d'agents et des intégrations sur mesure. Il comprend aussi de petites applications utilitaires et des pipelines d'automatisation pensés pour répondre à des besoins concrets, avec un fort accent sur la fiabilité, l'autonomie et la maintenabilité long terme.",
    infrastructure: [
      { name: "Proxmox Server", spec: "64GB RAM / Xeon 16 Cores" },
      { name: "Synology NAS", spec: "RAID5 16TB" },
      { name: "ESXi Server", spec: "32GB RAM / Xeon 8 Cores / 6TB" },
    ],
    categories: [
      { title: "Virtualization & Containers", items: ["Docker", "k3s"] },
      {
        title: "Automation & Workflows",
        items: ["n8n", "Node-RED", "Planka", "Git"],
      },
      {
        title: "Monitoring & Observability",
        items: ["Frigate", "Grafana", "InfluxDB", "Umami"],
      },
      {
        title: "Networking & Security",
        items: [
          "AdGuard",
          "Authentik",
          "Nginx Proxy Manager",
          "Unbound",
          "WireGuard",
          "pfSense",
          "phpIPAM",
          "Pentagi",
        ],
      },
      {
        title: "Smart Home & IoT",
        items: ["Home Assistant", "ESPHome", "MQTT", "Matter", "Zigbee2MQTT"],
      },
      {
        title: "AI & Local LLM",
        items: [
          "Hermes",
          "OpenClaw",
          "Mercury",
          "OmniRoute",
          "Ollama",
          "OpenWebUI",
          "AgentMemory",
        ],
      },
      { title: "Backup & Storage", items: ["Synology", "TrueNAS"] },
      { title: "Remote Access & Management", items: ["Guacamole"] },
      {
        title: "Documentation & Collaboration",
        items: ["Outline", "Mail Server"],
      },
    ],
  },
  en: {
    title: "Self-Hosted Infrastructure, Automation & AI Lab",
    period: "2014 – Present",
    intro:
      "Built and continuously evolved a personal lab since 2014, centered on self-hosted infrastructure, automation, AI-assisted workflows and advanced smart home integrations. Over time, it has grown into a real-world environment used to experiment with virtualization, containers, storage, monitoring, backup, identity, networking, local LLM tools, agent-based workflows and custom integrations. It also includes small utility applications and automation pipelines designed to solve practical needs, with a strong focus on reliability, autonomy and long-term maintainability.",
    infrastructure: [
      { name: "Proxmox Server", spec: "64GB RAM / Xeon 16 Cores" },
      { name: "Synology NAS", spec: "RAID5 16TB" },
      { name: "ESXi Server", spec: "32GB RAM / Xeon 8 Cores / 6TB" },
    ],
    categories: [
      { title: "Virtualization & Containers", items: ["Docker", "k3s"] },
      {
        title: "Automation & Workflows",
        items: ["n8n", "Node-RED", "Planka", "Git"],
      },
      {
        title: "Monitoring & Observability",
        items: ["Frigate", "Grafana", "InfluxDB", "Umami"],
      },
      {
        title: "Networking & Security",
        items: [
          "AdGuard",
          "Authentik",
          "Nginx Proxy Manager",
          "Unbound",
          "WireGuard",
          "pfSense",
          "phpIPAM",
          "Pentagi",
        ],
      },
      {
        title: "Smart Home & IoT",
        items: ["Home Assistant", "ESPHome", "MQTT", "Matter", "Zigbee2MQTT"],
      },
      {
        title: "AI & Local LLM",
        items: [
          "Hermes",
          "OpenClaw",
          "Mercury",
          "OmniRoute",
          "Ollama",
          "OpenWebUI",
          "AgentMemory",
        ],
      },
      { title: "Backup & Storage", items: ["Synology", "TrueNAS"] },
      { title: "Remote Access & Management", items: ["Guacamole"] },
      {
        title: "Documentation & Collaboration",
        items: ["Outline", "Mail Server"],
      },
    ],
  },
  es: {
    title: "Self-Hosted Infrastructure, Automation & AI Lab",
    period: "2014 – Presente",
    intro:
      "Construido y evolucionado de forma continua desde 2014, este lab personal está centrado en infraestructura self-hosted, automatización, flujos asistidos por IA e integraciones avanzadas de smart home. Con el tiempo, se ha convertido en un entorno real usado para experimentar con virtualización, contenedores, almacenamiento, monitoreo, backup, identidad, redes, herramientas LLM locales, flujos basados en agentes e integraciones personalizadas. También incluye pequeñas aplicaciones utilitarias y pipelines de automatización diseñados para resolver necesidades prácticas, con un fuerte foco en la fiabilidad, la autonomía y el mantenimiento a largo plazo.",
    infrastructure: [
      { name: "Proxmox Server", spec: "64GB RAM / Xeon 16 Cores" },
      { name: "Synology NAS", spec: "RAID5 16TB" },
      { name: "ESXi Server", spec: "32GB RAM / Xeon 8 Cores / 6TB" },
    ],
    categories: [
      { title: "Virtualization & Containers", items: ["Docker", "k3s"] },
      {
        title: "Automation & Workflows",
        items: ["n8n", "Node-RED", "Planka", "Git"],
      },
      {
        title: "Monitoring & Observability",
        items: ["Frigate", "Grafana", "InfluxDB", "Umami"],
      },
      {
        title: "Networking & Security",
        items: [
          "AdGuard",
          "Authentik",
          "Nginx Proxy Manager",
          "Unbound",
          "WireGuard",
          "pfSense",
          "phpIPAM",
          "Pentagi",
        ],
      },
      {
        title: "Smart Home & IoT",
        items: ["Home Assistant", "ESPHome", "MQTT", "Matter", "Zigbee2MQTT"],
      },
      {
        title: "AI & Local LLM",
        items: [
          "Hermes",
          "OpenClaw",
          "Mercury",
          "OmniRoute",
          "Ollama",
          "OpenWebUI",
          "AgentMemory",
        ],
      },
      { title: "Backup & Storage", items: ["Synology", "TrueNAS"] },
      { title: "Remote Access & Management", items: ["Guacamole"] },
      {
        title: "Documentation & Collaboration",
        items: ["Outline", "Mail Server"],
      },
    ],
  },
};

const aiHighlightsByLocale: Localized<string[]> = {
  fr: [
    "Utilise des agents IA et des outils LLM locaux pour la recherche infrastructure, la configuration, les revues et les tâches liées aux migrations.",
    "S'intéresse aux workflows à base d'agents qui améliorent les opérations sans s'éloigner du coeur infrastructure.",
    "Approche pragmatique : réduire le travail répétitif, accélérer l'exécution et aider la prise de décision dans les environnements opérationnels.",
  ],
  en: [
    "Uses AI agents and local LLM tools for infrastructure research, configuration work, reviews and migration-related tasks.",
    "Interested in agent-based workflows that improve operations without moving away from core infrastructure work.",
    "Focus is pragmatic: reduce repetitive work, improve speed and help decision-making in operational environments.",
  ],
  es: [
    "Utiliza agentes de IA y herramientas LLM locales para investigación de infraestructura, configuración, revisiones y tareas relacionadas con migraciones.",
    "Le interesan los flujos basados en agentes que mejoran las operaciones sin alejarse del trabajo central de infraestructura.",
    "El enfoque es pragmático: reducir trabajo repetitivo, mejorar la velocidad y ayudar en la toma de decisiones en entornos operativos.",
  ],
};

export const profile = {
  ...baseProfile,
  ...localizedProfileContent.en,
} as const;

export const getProfile = (locale: Locale) => ({
  ...baseProfile,
  ...localizedProfileContent[locale],
});

export const getAboutSections = (locale: Locale) =>
  aboutSectionsByLocale[locale];
export const getExperiences = (locale: Locale) => experiencesByLocale[locale];
export const getProjects = (locale: Locale) => projectsByLocale[locale];
export const getSkillGroups = (locale: Locale) => skillGroupsByLocale[locale];
export const getEducationItems = (locale: Locale) =>
  educationItemsByLocale[locale];
export const getCertificationItems = (locale: Locale) =>
  certificationItemsByLocale[locale];
export const getLabProfile = (locale: Locale) => labProfileByLocale[locale];
export const getAiHighlights = (locale: Locale) => aiHighlightsByLocale[locale];

export const getContactItems = (locale: Locale): ContactItem[] => {
  const currentProfile = getProfile(locale);
  const labels = {
    fr: {
      linkedin: "LinkedIn",
      github: "GitHub",
      terminal: "Portfolio terminal",
      cv: "Resume",
    },
    en: {
      linkedin: "LinkedIn",
      github: "GitHub",
      terminal: "Terminal portfolio",
      cv: "Resume",
    },
    es: {
      linkedin: "LinkedIn",
      github: "GitHub",
      terminal: "Portfolio terminal",
      cv: "Resume",
    },
  }[locale];

  return [
    {
      id: 1,
      label: labels.linkedin,
      value: currentProfile.linkedinUrl,
      iconUrl: "/brands/linkedin.svg",
      url: currentProfile.linkedinUrl,
    },
    {
      id: 2,
      label: labels.github,
      value: currentProfile.githubUrl,
      iconUrl: "/brands/github.svg",
      url: currentProfile.githubUrl,
    },
    {
      id: 3,
      label: labels.terminal,
      value: currentProfile.guiUrl,
      iconUrl: "/brands/terminal-prompt.svg",
      url: currentProfile.guiUrl,
    },
    {
      id: 4,
      label: labels.cv,
      value: currentProfile.cvUrl,
      iconUrl: "/brands/pdf.svg",
      url: currentProfile.cvUrl,
    },
  ];
};

export const getSocialLinks = (locale: Locale): SocialLink[] => {
  const labels = {
    fr: ["LinkedIn", "GitHub", "Portfolio terminal", "CV PDF"],
    en: ["LinkedIn", "GitHub", "Terminal Portfolio", "CV PDF"],
    es: ["LinkedIn", "GitHub", "Portfolio terminal", "CV PDF"],
  }[locale];

  return [
    {
      id: 1,
      title: labels[0],
      url: baseProfile.linkedinUrl,
      tab: 1,
      icon: "💼",
    },
    { id: 2, title: labels[1], url: baseProfile.githubUrl, tab: 3, icon: "💻" },
    { id: 3, title: labels[2], url: baseProfile.guiUrl, tab: 0, icon: "🖥️" },
    { id: 4, title: labels[3], url: baseProfile.cvUrl, tab: 5, icon: "📄" },
  ];
};

const formatBullets = (bullets: readonly string[]) =>
  bullets.map(bullet => `- ${bullet}`).join("\n");

export const getPortfolioKnowledgeBase = (locale: Locale) => {
  const currentProfile = getProfile(locale);
  const aboutSections = getAboutSections(locale);
  const experiences = getExperiences(locale);
  const projects = getProjects(locale);
  const skillGroups = getSkillGroups(locale);
  const educationItems = getEducationItems(locale);
  const certificationItems = getCertificationItems(locale);
  const lab = getLabProfile(locale);

  return `
NAME
${currentProfile.name}

TITLE
${currentProfile.title}

LOCATION
${currentProfile.location}

CONTACT
Email: ${currentProfile.email}
LinkedIn: ${currentProfile.linkedinUrl}
GitHub: ${currentProfile.githubUrl}

ABOUT
${aboutSections.join("\n")}

EXPERIENCE
${experiences
  .map(
    ({ company, role, period, location, bullets }) =>
      `${company}\n${role}\n${period}\n${location}\n${formatBullets(bullets)}`
  )
  .join("\n\n")}

PROJECTS
${projects
  .map(({ id, title, desc }) => `${id}. ${title}\n${desc}`)
  .join("\n\n")}

SKILLS
${skillGroups
  .map(({ name, items }) => `${name}: ${items.join(", ")}`)
  .join("\n")}

EDUCATION
${educationItems
  .map(
    ({ school, program, period, details }) =>
      `${school}\n${program}\n${period}${
        details
          ? `\n${details
              .map(
                ({ title, bullets }) => `${title}\n${formatBullets(bullets)}`
              )
              .join("\n")}`
          : ""
      }`
  )
  .join("\n\n")}

CERTIFICATIONS
${certificationItems
  .map(({ title, issuer, issued }) => `${title} — ${issuer} — ${issued}`)
  .join("\n")}

LAB
${lab.title}
${lab.period}
${lab.intro}
${lab.infrastructure.map(({ name, spec }) => `- ${name} — ${spec}`).join("\n")}
${lab.categories
  .map(
    ({ title, items }) =>
      `${title}\n${items.map(item => `- ${item}`).join("\n")}`
  )
  .join("\n\n")}

STATUS
${currentProfile.status}
`.trim();
};
