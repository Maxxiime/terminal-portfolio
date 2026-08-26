# Projects & Lab

A selection of personal projects, experiments, and prototypes focused on infrastructure, automation, self-hosting, and AI applied to operations.

## 🧠 AI Lab, Agents & Automation

A self-hosted environment dedicated to experimenting with local AI models, agents, long-term memory, and automated workflows.

The goal is to go beyond simple chatbots by connecting AI to infrastructure tools and data, allowing it to retrieve information, analyze system states, and execute controlled workflows.

**Examples:**

* Local GPU-accelerated LLMs with Ollama
* Multi-model and multi-provider routing
* AI agents with tools and infrastructure access
* Long-term memory and contextual retrieval
* Automated workflows and scheduled tasks
* AI integration with homelab services

**Technologies:** Ollama · OpenWebUI · Hermes · Hindsight · OmniRoute · n8n · MCP · NVIDIA/CUDA

---

## 🏗️ Homelab & Self-Hosted Infrastructure

A personal infrastructure platform used as a long-term environment for experimentation and operations.

It provides hands-on experience with challenges similar to real-world environments: virtualization, high availability, containers, networking, storage, backups, identity management, monitoring, and application deployment.

**Examples:**

* Multi-node Proxmox cluster
* Virtualization and containerization
* Replication and high availability
* Automated backups
* Private inter-site networking
* Self-hosted applications and internal services
* Monitoring and observability
* Centralized identity management

**Technologies:** Proxmox · Docker · Kubernetes · ZFS · Tailscale · Grafana · Authentik · Gitea · Ansible

---

## 🏠 Advanced Home Automation

A self-hosted home automation ecosystem built around Home Assistant, with a focus on automation rather than simply controlling devices.

Automations combine presence detection, device states, schedules, sensors, and contextual information to make decisions automatically.

**Examples:**

* Multi-sensor presence detection
* ESP32, Bluetooth, and mmWave
* Context-aware automations
* Device and infrastructure monitoring
* Integration with self-hosted services
* Experiments with natural-language control using local AI

**Technologies:** Home Assistant · ESPHome · ESP32 · Zigbee · MQTT · Bluetooth · mmWave

---

## 🤖 AI-Assisted Infrastructure Operations

An experimental conversational layer for interacting with infrastructure without replacing existing administration and observability tools.

AI acts as an orchestration layer capable of selecting and using different tools and data sources depending on the request.

**Explored use cases:**

* Querying the state of Linux systems
* Searching and correlating logs
* Identifying errors and anomalies
* Querying IT inventory
* Checking the health of services and devices
* Triggering automated diagnostics
* Summarizing results from multiple tools

The goal is to transform a request such as *“Why is this service failing?”* into a controlled sequence of diagnostics, data collection, and analysis.

**Technologies:** LLM · AI Agents · MCP · API · Linux · Monitoring · Automation

---

## 📊 Observability & Operations Tooling

Development and experimentation with tools designed to solve practical infrastructure and operational needs.

**Projects and experiments:**

* Centralized log collection and analysis with Grafana
* Monitoring dashboards
* System metrics collection
* Network device configuration backup scripts
* Automated service health checks
* Infrastructure state-based alerts and workflows
* Linux administration scripts and utilities

**Technologies:** Grafana · Prometheus · Loki · InfluxDB · Telegraf · Python · Bash

---

## ⚙️ Workflow & Task Automation

Automation of recurring tasks that would otherwise require manual intervention or repeated verification.

**Examples:**

* Automated information collection and filtering
* Scheduled research and monitoring
* Correlation of multiple data sources
* Notifications only when relevant results are detected
* Scheduled tasks driven by scripts or AI agents
* Workflows combining APIs, AI, and internal services

**Technologies:** n8n · Python · APIs · cron · AI Agents

---

## 🌐 Interactive AI Portfolio

This portfolio is itself a technical project.

It combines a terminal-style interface with an AI assistant capable of using the portfolio content as contextual knowledge to dynamically answer visitor questions.

Content is separated from the application and can be loaded from multiple sources, allowing portfolio information to evolve without rebuilding the entire application.

**Technologies:** React · TypeScript · Docker · Nginx · Markdown · LLM APIs · OpenRouter

---

# Enterprise-Oriented Prototypes

Some personal projects also serve as experimentation platforms for use cases applicable to professional infrastructure environments.

## AI Assistant for Infrastructure Operations

A prototype assistant designed to query different infrastructure and operational tools through natural-language requests.

**Example scenarios:**

> “Find network flows that have been blocked during the last few hours.”

The agent can search logs, filter relevant events, correlate information, and produce an actionable summary.

> “Which devices are currently experiencing issues?”

The agent can combine information from monitoring systems and IT inventory.

> “Analyze recent errors on this Linux server.”

The agent can retrieve relevant system information, analyze logs, and suggest the next diagnostic steps.

The goal is not to replace existing operational tools, but to provide an orchestration layer that makes them faster and easier to query, correlate, and use.
