## SOBRE

Este projeto foi desenvolvido como parte do processo seletivo realizado pela empresa [SignoWeb](https://site.signoweb.com.br/).

<details>
<img src="https://i.imgur.com/gdYNZgE.png" width="800">

<img src="https://i.imgur.com/aSHb92d.png" width="800">

<img src="https://i.imgur.com/LqS6qBs.png" width="800">
</details>
  
## SISTEMA DE VOTAÇÃO

Criar um back (crud completo de criação/edição/exclusão) com gerenciamento de enquete e opções.

- A enquete deve ter um título e uma data programada para início e para término.
- O cadastro de opções de respostas da enquete devem ser dinâmicas, é obrigatório mínimo 3 opções.

**Visualização da enquete**

- Listar todas as enquetes cadastradas no banco com o título e data de início e término, apresentar todas as enquetes, não iniciadas/em andamento/finalizadas.
- Criar tela de apresentar a enquete com opções de resposta, com a data de início e término. Essa tela deve obedecer:
  - Ao lado de cada opção, apresentar os números de votação total do lado de cada opção.
  - Se a enquete não estiver ativa entre data/hora início e data/hora fim, as opções e o botão de votar deve estar desabilitado.
  - Os números de resultados devem ser apresentados sempre que houver novo voto (realtime)
