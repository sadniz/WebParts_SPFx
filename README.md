# ITLean SharePoint

## Summary

Repositório com objetivo de estudo em conjunto.

---
## SPFx com React
- Webparts

---

## Webparts
- Galeria (0.1)
- Banner (WIP)

---
## Como começar

1. Clonar o repositório

  ><code> git</code> clone https://github.com/Miguelvfz/WebParts_SPFx.git
  >
  ><code> git</code> checkout -b <sua-branch-aqui>

2. Realizando commit na própria branch
  ><code> git</code> add . [Adiciona todas as mudanças ao commit]
  >
  ><code> git</code> commit -a -m '[Insira seu comentário aqui]'
  >
  ><code> git</code> push

3. Realizando o Merge da sua Branch para a Master
  ><code> git</code> checkout master
  >
  ><code> git</code> merge <sua-branch-aqui>
  >
  ><code> git</code> push

4. Lembre-se de voltar para sua branch!
  ><code> git</code> checkout <sua-branch-aqui>
  >
  ><code> git</code> rebase master
  >
  ><code> git</code> push

5. Outros comandos úteis
  ><code> git</code> status [Verifica o status da branch atual]


---
## Como executar

1. Tenha certeza de que está na pasta da solução
2. No terminal, execute:
> **<code>npm</code> install**
>
> **<code>gulp</code> serve**

---

## Solution

| Solution          | Authors          |
| ----------------- | ---------------- |
| ITLean_SharePoint | Miguel Fernandez |

---

## Version history

| Version | Date               | Comments                       |
| ------- | ------------------ | ------------------------------ |
| 1.0     | September 26, 2021 | Initial release                |
| 1.1     | September 26, 2021 | Miguel Branch/Readme updated   |

---
## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.13-green.svg)

---
## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

---
## Prerequisites

> Node
> react
> Typescript

---
## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
---