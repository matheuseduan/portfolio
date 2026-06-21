# <a href="#" title="Dev Matheus Eduan"> <img src="https://img.shields.io/badge/dev-matheus_eduan-blue?style=for-the-badge&logo=devbox" alt="Dev Matheus Eduan"/></a> <a href="https://matheuseduan.github.io/portfolio/" title="Portfólio"> <img src="https://img.shields.io/badge/clique_para_ver_o_projeto-portifólio-black?style=for-the-badge&logo=refinedgithub&logoColor=white&link=https://matheuseduan.github.io/portfolio/" alt="Portfólio"/></a>

Portfólio pessoal desenvolvido em HTML, CSS e JavaScript puro, com suporte a **tema escuro** (padrão) e **tema claro**, ambos inspirados no GitHub.

## ✨ Seções

- **Terminal** — terminal interativo + cartão de perfil estilo GitHub
- **Sobre** — apresentação e foco profissional
- **Stack** — gráfico de distribuição das linguagens + cards de tecnologia
- **Ferramentas** — VS Code, Git e GitHub
- **Sistemas Operacionais** — Windows e Linux
- **Contato** — links para GitHub e LinkedIn

## 🌗 Temas

O portfólio possui alternância entre tema escuro e claro, acessível pelo botão 🌙 / ☀️ na barra de navegação.

- **Tema escuro** (padrão) — paleta GitHub Dark (`#0d1117`)
- **Tema claro** — paleta GitHub Light (`#ffffff`)
- A preferência é salva no `localStorage` e persiste entre visitas
- Detecta automaticamente a preferência do sistema (`prefers-color-scheme`) como fallback
- Ícones adaptados por `filter` CSS para manter legibilidade em ambos os temas

## 🖥️ Terminal interativo

O terminal aceita comandos reais digitados pelo usuário:

| Comando | Descrição |
|---|---|
| `whoami` | exibe o nome do usuário |
| `cat sobre.txt` | informações sobre o desenvolvedor |
| `ls stack/` | lista as tecnologias da stack |
| `git status` | status do repositório |
| `git log` | últimos commits |
| `cat contato.txt` | informações de contato |
| `uname -a` | informações do sistema |
| `pwd` | diretório atual |
| `date` | data e hora atual |
| `help` | lista todos os comandos |
| `clear` | limpa o terminal |
| `restart` | reinicia a animação inicial |

## 🗂️ Estrutura

```
portfolio-main/
├── index.html
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── script.js
    └── img/
        ├── python.svg
        ├── javascript.svg
        ├── html5.svg
        ├── css.svg
        ├── git.svg
        ├── github.svg
        ├── github-avatar.png
        ├── linkedin.png
        ├── vscode.png
        ├── windows.png
        └── linux.png
```

## 🛠️ Tecnologias

- HTML5 semântico
- CSS3 com variáveis customizadas e suporte a múltiplos temas via `[data-theme]`
- JavaScript vanilla — sem frameworks ou dependências externas
- Fontes: [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) e [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts

## ♿ Acessibilidade

- Navegação por teclado com `focus-visible`
- `aria-label` e `aria-live` no terminal
- Suporte a `prefers-reduced-motion`
- Suporte a `prefers-color-scheme` para tema automático
- Atributos `rel="noopener noreferrer"` em links externos

---

Feito por [Matheus Eduan](https://github.com/matheuseduan)
