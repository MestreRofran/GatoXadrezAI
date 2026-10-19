# Catálogo de peças externas — GatoXadrezAI 1.19

O jogo lê `pecas/catalogo.json`. Quatro conjuntos externos já estão disponíveis:

- **Servos Humanos**: 12 arquivos GLB em `servos-humanos/`, sem necessidade de modificar os arquivos.
- **Peças Esculpidas**: seis arquivos GLB em `pecas-esculpidas/`.
- **Gatinho Impresso em 3D (Calicat)**: `calicat.glb`, preparado no laboratório a partir de `calicatchess.3mf`.
- **Gatinhos Reino 2D**: `gatinhos-reino-2d.png`, atlas de 6 colunas × 2 linhas; brancas na primeira linha, pretas na segunda; sequência rei, rainha, bispo, cavalo, torre e peão.

## Acrescentar um novo conjunto

### Jeito recomendado — catálogo

1. Envie para esta pasta um GLB contendo um gato/modelo completo, ou um PNG com as **12 peças organizadas em atlas 6×2** na ordem indicada.
2. Adicione uma entrada a `catalogo.json`. Exemplo GLB:

```json
{"id":"gato-azul", "name":"Gato Azul 3D", "type":"glb", "path":"gato-azul.glb"}
```

Ou, para um PNG 6×2:

```json
{"id":"gatinhos-novos", "name":"Gatinhos Novos 2D", "type":"sprite2d", "path":"gatinhos-novos.png"}
```

O jogo reconhecerá a coleção ao atualizar a página sem alterar o HTML.

### Detecção automática no GitHub Pages público

No endereço padrão `usuario.github.io/repositorio/`, o jogo consulta a API pública Contents do GitHub. Arquivos `.glb` e `.png` adicionados **diretamente** a esta pasta passam a aparecer como conjuntos automaticamente. Para personalizar o nome, as propriedades e o caminho, use o catálogo ou um descritor `.json` dedicado contendo `id`, `name`, `type` e `path`.

**Limitação importante:** um GLB novo precisa ter a geometria do conjunto que se deseja mostrar; na integração genérica um único GLB será reaproveitado para todas as seis classes, identificadas por símbolos no chão. Para modelos GLB distintos de cada classe, é necessário criar um adaptador específico ou usar um conjunto preparado/convertido. Um PNG deve ser exatamente um atlas de 6 colunas por 2 linhas. Não há como identificar automaticamente uma coleção de arquivos arbitrários ou a semântica das peças somente pelo nome.

### Funcionamento offline

Os conjuntos externos são carregados somente após seleção. Quando publicados com o PWA e carregados uma vez, ficam no cache do service worker para uso offline (sujeito ao armazenamento do navegador). Abrir `index.html` diretamente via `file://` não garante carregamento dos conjuntos externos; prefira GitHub Pages ou um servidor local.

### Nomes obrigatórios dos conjuntos legados

`servos-humanos/` deve conter `human-w-{p,r,n,b,q,k}.glb` e `human-b-{p,r,n,b,q,k}.glb`; `pecas-esculpidas/` deve conter `mesh-imperial-{p,r,n,b,q,k}.glb`.
