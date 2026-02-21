# Plannr — App de Finanças Pessoais

Aplicativo de planejamento financeiro focado em prever gastos futuros e mostrar a realidade financeira de forma visual e clara.

## Sobre o Projeto

O Plannr nasceu da necessidade de ter um controle financeiro que não apenas registra gastos passados, mas **prevê o futuro financeiro**. Diferente de apps tradicionais, aqui você cadastra seus gastos mensais (fixos, parcelados e variáveis) e consegue visualizar os próximos meses, sabendo exatamente se vai faltar ou sobrar dinheiro.

### Diferenciais

- **Visão de futuro**: veja os próximos meses de uma vez _(em desenvolvimento)_
- **Gestão inteligente de parcelas**: cria automaticamente as parcelas futuras
- **Gastos recorrentes**: adicione uma vez, replica todo mês
- **Dashboard visual**: cores indicam se o mês será tranquilo ou apertado _(em desenvolvimento)_
- **Reservas planejadas**: separe dinheiro por categoria (Uber, lazer, etc)
- **Alertas em tempo real**: saiba quando está gastando mais que o planejado _(em desenvolvimento)_

## Stack Tecnológica

| Camada              | Tecnologia                              |
| ------------------- | --------------------------------------- |
| Frontend            | React 19 + Vite 7 + TypeScript          |
| Roteamento          | React Router DOM 7                      |
| Backend / BaaS      | Supabase (PostgreSQL + Auth + Realtime) |
| Dados (client-side) | TanStack React Query 5                  |
| Estado global       | Zustand 5                               |
| Estilização         | Tailwind CSS 4                          |
| Gráficos            | Recharts _(em desenvolvimento)_         |
| Ícones              | Lucide React                            |
| Mobile              | Capacitor _(em desenvolvimento)_        |

## Começando

### Pré-requisitos

- Node.js 20+
- pnpm 9+
- Conta no [Supabase](https://supabase.com)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/YasminSBarata/Plannr.git

# Instale as dependências
pnpm install

# Configure as variáveis de ambiente
cp .env.example .env
# Adicione suas credenciais do Supabase no .env

# Rode em modo desenvolvimento
pnpm dev
```

### Variáveis de Ambiente

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-anon-key
```

### Build para Mobile _(em desenvolvimento)_

```bash
# Build da aplicação
pnpm build

# Sincronize com as plataformas mobile
npx cap sync

# Abra no Android Studio
npx cap open android
```

## Arquitetura

```
/src
  /auth
    AuthContext.tsx         # Estado de autenticação (Supabase)
    ProtectedRoute.tsx      # Guard para rotas autenticadas
  /components
    /ui
      /atoms
        Button.tsx          # Componente de botão com variantes
        header.tsx          # Cabeçalho da aplicação
      /molecules
        cardForm.tsx        # Card de formulário (login/cadastro)
  /lib
    supabase.ts             # Cliente Supabase com validação de env
  /pages
    Login.tsx               # Tela de login
    Register.tsx            # Tela de cadastro
    # Dashboard, Gastos, Categorias, Cartões, Planejamento, Timeline
    # → ainda em desenvolvimento
  /services                 # Camada de acesso ao banco de dados
    categoriasService.ts    # CRUD de categorias
    gastosService.ts        # CRUD de gastos + listagem com relacionamentos
    meiosPagamentoService.ts # CRUD de meios de pagamento
    pagamentosMesService.ts # CRUD de pagamentos mensais + relacionamentos
    parcelasService.ts      # CRUD de parcelas
    rendasService.ts        # CRUD de rendas
    reservasService.ts      # CRUD de reservas + lógica de valor vigente
  /styles
    index.css               # Tema global (Tailwind)
  /types
    database.ts             # Tipos TypeScript gerados pelo Supabase CLI
  App.tsx                   # Componente raiz com rotas
  main.tsx                  # Entry point com providers
```

## Estrutura do Banco de Dados

### Tabelas Implementadas

**categorias**

- `id`, `user_id`, `nome`, `tipo`, `cor`, `icone`, `created_at`
- Tipos: `fixo`, `variavel`, `reserva`

**gastos**

- `id`, `user_id`, `descricao`, `valor`, `data_inicio`, `data_fim`
- `tipo` (unico, parcelado, recorrente, temporario), `eh_variavel`
- `categoria_id` (FK), `meio_pagamento_id` (FK), `created_at`

**meios_pagamento**

- `id`, `user_id`, `nome`, `tipo`, `limite`, `created_at`
- Tipos: `credito`, `debito`, `pix`, `dinheiro`, `boleto`

**rendas**

- `id`, `user_id`, `descricao`, `valor`, `data_inicio`, `data_fim`, `created_at`
- `data_fim` nullable para rendas temporárias

**reservas**

- `id`, `user_id`, `categoria_id` (FK), `mes_ano`, `valor_mensal`, `created_at`
- Valor vigente: busca a mais recente até o mês consultado

**pagamentos_mes**

- `id`, `user_id`, `descricao`, `valor`, `mes_ano`, `status`, `pago_em`
- `gasto_id` (FK), `parcela_id` (FK), `meio_pagamento_id` (FK), `created_at`
- Status: `pendente`, `pago`

**parcelas**

- `id`, `user_id`, `gasto_id` (FK), `numero`, `valor`, `total`, `mes_ano`, `status`, `pago_em`, `created_at`
- Status: `pendente`, `pago`, `atrasado`

### Relacionamentos

```
auth.users
  ├── rendas
  ├── meios_pagamento
  ├── categorias
  ├── gastos ──────────── parcelas
  │     ├── FK categoria      └── FK gasto
  │     └── FK meio_pagamento
  ├── pagamentos_mes
  │     ├── FK gasto (opcional)
  │     ├── FK parcela (opcional)
  │     └── FK meio_pagamento
  └── reservas
        └── FK categoria
```

## Funcionalidades

### MVP (v1.0) — Em andamento

- [x] Autenticação (login / cadastro / sessão persistente)
- [x] Rotas protegidas (redirect para login se não autenticado)
- [x] Cliente Supabase com validação de variáveis de ambiente
- [x] Tipos TypeScript gerados do banco de dados
- [x] Camada de serviços CRUD completa:
  - [x] `rendasService` — listar, criar, atualizar, deletar
  - [x] `categoriasService` — listar, criar, atualizar, deletar
  - [x] `meiosPagamentoService` — listar, criar, atualizar, deletar
  - [x] `gastosService` — CRUD + listagem com relacionamentos expandidos
  - [x] `parcelasService` — CRUD + listagem com relacionamentos
  - [x] `pagamentosMesService` — CRUD + listagem com relacionamentos
  - [x] `reservasService` — CRUD + lógica de valor vigente por mês
- [x] Design system (cores, botões, tipografia)
- [ ] Lógica de negócio (cálculos de saldo, renda total, etc) _(em desenvolvimento)_
- [ ] Hooks React Query _(em desenvolvimento)_
- [ ] Cadastro de renda mensal — UI _(em desenvolvimento)_
- [ ] Gestão de meios de pagamento — UI _(em desenvolvimento)_
- [ ] Categorias pré-definidas — UI _(em desenvolvimento)_
- [ ] CRUD de gastos — UI _(em desenvolvimento)_
- [ ] Marcar gastos como pago _(em desenvolvimento)_
- [ ] Dashboard com saldo do mês _(em desenvolvimento)_
- [ ] Filtro por cartão _(em desenvolvimento)_
- [ ] Navegação entre meses _(em desenvolvimento)_

### v1.1

- [ ] Gastos parcelados — UI
- [ ] Gastos recorrentes — UI
- [ ] Categorias personalizadas — UI
- [ ] Sistema de alertas
- [ ] Timeline dos próximos meses
- [ ] Gráfico de gastos por categoria

### v2.0

- [ ] Planejamento de reservas — UI
- [ ] Notificações push
- [ ] Gráficos avançados
- [ ] Export / import de dados
- [ ] Múltiplas carteiras
- [ ] Metas por categoria

### v3.0

- [ ] Anexar comprovantes (fotos)
- [ ] Integração Open Finance
- [ ] Widget para tela inicial
- [ ] Modo escuro
- [ ] Backup automático
- [ ] Análise de padrões com IA

## Design System

### Paleta de Cores

| Papel           | Cor          | Hex       |
| --------------- | ------------ | --------- |
| Primária        | Indigo       | `#6366F1` |
| Primária escura | Indigo dark  | `#4F46E5` |
| Primária clara  | Indigo light | `#818CF8` |
| Sucesso         | Verde        | `#10B981` |
| Alerta          | Amarelo      | `#F59E0B` |
| Erro            | Vermelho     | `#EF4444` |
| Neutro escuro   | Cinza        | `#404040` |
| Neutro claro    | Cinza        | `#E5E5E5` |

### Convenções de UI

- Bordas finas (`border-[#E5E5E5]`)
- Sem gradientes (cores sólidas)
- Cards com sombra sutil
- Tipografia: Inter ou System Font
- Ícones: Lucide React (não usar emojis)

## Lógica de Negócio

### Cálculo de Saldo _(em desenvolvimento)_

```
Saldo do Mês = Renda Total Ativa - Soma dos Gastos Fixos do Mês
```

### Renda Total

- Soma das rendas onde `data_fim` é null OU `data_fim` >= mês atual
- Rendas expiradas não entram no cálculo

### Reservas — Valor Vigente

- Cada reserva vale a partir do `mes_ano` definido
- Ao consultar um mês, busca a reserva mais recente até aquele mês
- Permite alterar valor sem perder histórico

### Status de Gastos

| Status   | Descrição                               |
| -------- | --------------------------------------- |
| Pendente | Não foi marcado como pago               |
| Pago     | Marcado como pago pelo usuário          |
| Atrasado | Vencimento passou e ainda está pendente |

### Alertas _(em desenvolvimento)_

- **Amarelo**: gastou > 80% da renda
- **Vermelho**: gastou > 100% da renda (vai faltar)
- **Verde**: está dentro do planejado

### Gastos Parcelados

1. Cria o gasto principal com dados da compra
2. Cria N parcelas, uma por mês, via `parcelasService`
3. Cada parcela referencia o `gasto_id` original
4. Parcelas futuras aparecem nos meses correspondentes via `pagamentos_mes`

### Gastos Recorrentes

1. Usuário marca gasto como recorrente (`tipo = 'recorrente'`)
2. Sistema copia automaticamente para os próximos meses
3. Cada cópia é independente (pode editar sem afetar as demais)

## Testes

> Em desenvolvimento. Nenhuma suite de testes foi configurada ainda.

## Convenções de Código

- ESLint + Prettier (configurações incluídas)
- Componentes em PascalCase
- Funções e variáveis em camelCase
- Services: funções puras que acessam o banco
- Hooks: wrappers React Query que usam os services
- Commits em português, descritivos
- TypeScript strict mode habilitado

## Problemas Conhecidos

- [ ] Página de "Esqueci minha senha" ainda não implementada
- [ ] Build mobile (Capacitor) ainda não configurado
- [ ] Sincronização offline não implementada
- [ ] Notificações push dependem de configuração adicional

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Autores

- **Yasmin Dos Santos Barata** — Desenvolvimento inicial — [@YasminSBarata](https://github.com/YasminSBarata)

---

**Versão atual**: 0.2.0-alpha  
**Última atualização**: Fevereiro 2026
