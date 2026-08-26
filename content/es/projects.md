# Proyectos & Lab

Una selección de proyectos personales, experimentos y prototipos centrados en infraestructura, automatización, self-hosting e inteligencia artificial aplicada a las operaciones.

## 🧠 Lab de IA, agentes & automatización

Un entorno self-hosted dedicado a experimentar con modelos de IA locales, agentes, memoria a largo plazo y workflows automatizados.

El objetivo es ir más allá de los simples chatbots conectando la IA con las herramientas y los datos de la infraestructura, permitiéndole buscar información, analizar el estado de los sistemas y ejecutar workflows controlados.

**Ejemplos:**

* LLM locales acelerados por GPU con Ollama
* Enrutamiento multi-modelo y multi-proveedor
* Agentes de IA con herramientas y acceso a la infraestructura
* Memoria a largo plazo y recuperación contextual
* Workflows automatizados y tareas programadas
* Integración de IA con los servicios del homelab

**Tecnologías:** Ollama · OpenWebUI · Hermes · Hindsight · OmniRoute · n8n · MCP · NVIDIA/CUDA

---

## 🏗️ Homelab & infraestructura self-hosted

Una plataforma de infraestructura personal utilizada como entorno a largo plazo para experimentación y operaciones.

Permite adquirir experiencia práctica con desafíos similares a los de entornos reales: virtualización, alta disponibilidad, contenedores, redes, almacenamiento, copias de seguridad, gestión de identidades, monitorización y despliegue de aplicaciones.

**Ejemplos:**

* Clúster Proxmox multinodo
* Virtualización y contenerización
* Replicación y alta disponibilidad
* Copias de seguridad automatizadas
* Red privada entre diferentes ubicaciones
* Aplicaciones self-hosted y servicios internos
* Monitorización y observabilidad
* Gestión centralizada de identidades

**Tecnologías:** Proxmox · Docker · Kubernetes · ZFS · Tailscale · Grafana · Authentik · Gitea · Ansible

---

## 🏠 Domótica avanzada

Un ecosistema domótico self-hosted construido alrededor de Home Assistant, con un enfoque orientado a la automatización en lugar del simple control de dispositivos.

Las automatizaciones combinan detección de presencia, estados de dispositivos, horarios, sensores e información contextual para tomar decisiones automáticamente.

**Ejemplos:**

* Detección de presencia mediante múltiples sensores
* ESP32, Bluetooth y mmWave
* Automatizaciones contextuales
* Monitorización de dispositivos e infraestructura
* Integración con servicios self-hosted
* Experimentos de control mediante lenguaje natural utilizando IA local

**Tecnologías:** Home Assistant · ESPHome · ESP32 · Zigbee · MQTT · Bluetooth · mmWave

---

## 🤖 Operaciones de infraestructura asistidas por IA

Una capa conversacional experimental para interactuar con la infraestructura sin sustituir las herramientas existentes de administración y observabilidad.

La IA actúa como una capa de orquestación capaz de seleccionar y utilizar diferentes herramientas y fuentes de datos según la solicitud.

**Casos de uso explorados:**

* Consultar el estado de sistemas Linux
* Buscar y correlacionar logs
* Identificar errores y anomalías
* Consultar el inventario informático
* Comprobar el estado de servicios y dispositivos
* Ejecutar diagnósticos automatizados
* Resumir resultados procedentes de múltiples herramientas

El objetivo es transformar una solicitud como *« ¿Por qué está fallando este servicio? »* en una secuencia controlada de diagnóstico, recopilación de datos y análisis.

**Tecnologías:** LLM · Agentes de IA · MCP · API · Linux · Monitorización · Automatización

---

## 📊 Observabilidad & herramientas de operaciones

Desarrollo y experimentación con herramientas diseñadas para resolver necesidades prácticas relacionadas con la infraestructura y las operaciones.

**Proyectos y experimentos:**

* Centralización y análisis de logs con Grafana
* Dashboards de monitorización
* Recopilación de métricas del sistema
* Scripts de backup de configuraciones de dispositivos de red
* Comprobaciones automatizadas del estado de los servicios
* Alertas y workflows basados en el estado de la infraestructura
* Scripts y utilidades de administración Linux

**Tecnologías:** Grafana · Prometheus · Loki · InfluxDB · Telegraf · Python · Bash

---

## ⚙️ Automatización de workflows & tareas

Automatización de tareas recurrentes que, de otro modo, requerirían intervención manual o verificaciones repetidas.

**Ejemplos:**

* Recopilación y filtrado automatizado de información
* Investigación y monitorización programadas
* Correlación de múltiples fuentes de datos
* Notificaciones únicamente cuando se detectan resultados relevantes
* Tareas programadas ejecutadas mediante scripts o agentes de IA
* Workflows que combinan APIs, IA y servicios internos

**Tecnologías:** n8n · Python · APIs · cron · Agentes de IA

---

## 🌐 Portfolio interactivo con IA

Este portfolio es en sí mismo un proyecto técnico.

Combina una interfaz de estilo terminal con un asistente de IA capaz de utilizar el contenido del portfolio como contexto para responder dinámicamente a las preguntas de los visitantes.

El contenido está separado de la aplicación y puede cargarse desde múltiples fuentes, permitiendo actualizar la información del portfolio sin tener que reconstruir toda la aplicación.

**Tecnologías:** React · TypeScript · Docker · Nginx · Markdown · APIs LLM · OpenRouter

---

# Prototipos orientados a entornos empresariales

Algunos proyectos personales también sirven como plataformas de experimentación para casos de uso aplicables a entornos profesionales de infraestructura.

## Asistente de IA para operaciones de infraestructura

Un prototipo de asistente diseñado para consultar diferentes herramientas de infraestructura y operaciones mediante solicitudes en lenguaje natural.

**Ejemplos de escenarios:**

> « Encuentra los flujos de red que han sido bloqueados durante las últimas horas. »

El agente puede buscar en los logs, filtrar eventos relevantes, correlacionar información y producir un resumen útil.

> « ¿Qué dispositivos están experimentando problemas actualmente? »

El agente puede combinar información procedente de los sistemas de monitorización y del inventario informático.

> « Analiza los errores recientes en este servidor Linux. »

El agente puede recuperar información relevante del sistema, analizar los logs y proponer los siguientes pasos de diagnóstico.

El objetivo no es sustituir las herramientas de operaciones existentes, sino proporcionar una capa de orquestación que permita consultarlas, correlacionar sus datos y utilizarlas de forma más rápida y eficiente.
