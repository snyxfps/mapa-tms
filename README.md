Mapa de Integrações TMS

Este repositório contém uma interface web **simples, limpa e funcional** para visualização das integrações disponíveis entre diferentes sistemas TMS.

O objetivo do projeto é fornecer uma **matriz clara e pesquisável** indicando quais TMS possuem suporte a:

- **SMP**
- **Multicadastro**
- **RCV**

A interface foi pensada para uso interno, priorizando **legibilidade, rapidez de consulta e baixo ruído visual**.

---

✨ Funcionalidades

- 📋 Listagem completa de TMS
- 🔍 Busca instantânea por nome
- ↕️ Ordenação por coluna (TMS, SMP, Multicadastro, RCV)
- 🌗 Modo claro / escuro (com persistência)
- 📤 Exportação da visualização para CSV
- 📱 Layout responsivo

---

🧱 Estrutura do Projeto

```text
.
├── index.html   # Estrutura da página
├── styles.css   # Estilos (design clean / minimal)
└── app.js       # Lógica (dados, busca, ordenação, tema, export)
