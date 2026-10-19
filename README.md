# GatoXadrezAI 1.19

Jogo de xadrez com gatos e múltiplos visuais, desenvolvido por Rofran Pires — 2026.

## Como publicar no GitHub

1. Extraia **todos** os arquivos deste ZIP na raiz do repositório do jogo, mantendo as pastas e nomes.
2. Ative GitHub Pages em **Settings → Pages** e escolha a branch que contém `index.html`.
3. Abra o site (por exemplo, `https://usuario.github.io/GatoXadrezAI/`).
4. Nas Configurações → Aparência, escolha um estilo padrão, **Peças Extras** ou **PeçaVsPeça**.

**Não envie somente o HTML** caso queira utilizar Peças Extras. O diretório `pecas/` é obrigatório.

## Visuais incorporados em `index.html`

1. Gatos Cartunescos 3D (motor geométrico)
2. Gato Poligonal 3D (J-Toastie, GLB original)
3. Gato MineBox 3D (Quaternius, GLB original)
4. Peças de Gatos 3D (malhas felinas)
5. Peças Tradicionais 3D (A Beautiful Game)
6. Peças de Gatos 2D (sprites PNG)
7. Peças Tradicionais 2D (Unicode)

## Visuais externos

- Servos Humanos (12 GLB)
- Peças Esculpidas (6 GLB)
- Gatinho Impresso em 3D (Calicat, GLB preparado a partir de 3MF)
- Gatinhos Reino 2D (PNG 6×2)

**Peças Extras:** um único conjunto externo para os dois exércitos (branco/preto). **PeçaVsPeça:** escolha dois conjuntos diferentes, incluindo internos e externos.

Para acrescentar arquivos consulte [`pecas/README.md`](pecas/README.md).

### Sobre a descoberta automática

A publicação estática no GitHub Pages não fornece uma listagem de pastas via `fetch`. Por isso, o jogo usa `pecas/catalogo.json` para a descoberta garantida e, ao reconhecer um site GitHub Pages público padrão, consulta a API Contents do GitHub para identificar arquivos novos. A API pode ter limite de requisições e não opera offline. Alterar o catálogo é o método mais confiável.

### Segurança, offline e direitos

O jogo mantém as regras de xadrez no próprio HTML. Modelos externos são baixados de caminhos relativos. A execução offline de conjuntos externos requer carregamento anterior e armazenamento do navegador. Verifique créditos/licenças de terceiros antes de publicar os modelos GLB e arquivos PNG em repositório público.
