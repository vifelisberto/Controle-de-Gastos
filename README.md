# App Controle de Gastos

O aplicativo tem o objetivo de ajudar as pessoas a controlar suas despesas do dia-a-dia, como por exemplo: estudo, saúde, alimentação, viagens e etc, de forma que tenha visibilidade dos gastos de forma fácil e intuitiva.

A plataforma é útil para os interessados em gerenciar de forma mais eficiente os gastos e assim, economizar.

[Vídeo de demonstração das funcionalidades](https://youtu.be/GPTZ5fUHseI)

## Organização da equipe

O GitHub projects está sendo utilizado para mapear e separar tarefas entre os membros da equipe.

Estamos iniciando a utilização do fluxo de trabalho [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) mas ainda sem as branchs principais de desenvolvimento, mas cada integrante trabalha nas branchs features separadas e após o término da tarefa abre um pull request, onde é necessário ao menos um membro da equipe revisar e aprovar o merge para a branch principal.

## Setup

### Ferramentas necessárias:

#### IDE

Visual Studio Code ou IDE de sua preferência.

#### Git

para instalar o git, acesse: https://git-scm.com/downloads

#### Node.js

Para instalar o node, acesse: https://nodejs.org

#### npm package manager

O npm é instalado junto do Node.js.

#### Angular CLI

Para instalar, basta executar o seguinte comando em um terminal:

```
npm install -g @angular/cli
```

### Ionic

Para instalar, basta executar o seguinte comando em um terminal:

```
npm install -g @ionic/cli
```

### Passos para executar o projeto:

- Clonar o repositório:

  - https://github.com/vifelisberto/Controle-de-Gastos.git

- Instalar as dependências

Execute o comando:

```
npm i
```

- Executar a aplicação

```
ionic serve
```

- Opcionalmente é possível executar o comando `ionic serve --lab` que é necessário também instalar o ionic lab que exibe o projeto em tamanhos especificos de smartphone.

### Husky

Adicionamos o Husky no processo de desenvolvimento. Sempre que um membro commita uma alteração é automaticamente executado o tslint para formatar o código.

### LICENÇA

GNU GPLv3
