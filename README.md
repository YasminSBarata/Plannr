# 💰 App de Finanças Pessoais

Aplicativo mobile de planejamento financeiro focado em prever gastos futuros e mostrar a realidade financeira de forma visual e clara.

## 📱 Sobre o Projeto

Este app nasceu da necessidade de ter um controle financeiro que não apenas registra gastos passados, mas **prevê o futuro financeiro**. Diferente de apps tradicionais, aqui você cadastra seus gastos mensais (fixos, parcelados e variáveis) e consegue visualizar os próximos 6 meses, sabendo exatamente se vai faltar ou sobrar dinheiro.

### ✨ Diferenciais

- 🔮 **Visão de futuro**: veja os próximos 6 meses de uma vez
- 💳 **Gestão inteligente de parcelas**: cria automaticamente as parcelas futuras
- 🔁 **Gastos recorrentes**: adicione uma vez, replica todo mês
- 📊 **Dashboard visual**: cores indicam se o mês será tranquilo ou apertado
- 🎯 **Reservas planejadas**: separe dinheiro por categoria (Uber, lazer, etc)
- ⚠️ **Alertas em tempo real**: saiba quando está gastando mais que o planejado

## 🛠️ Stack Tecnológica

- **Frontend**: React 18 + Vite
- **Mobile**: Capacitor 5
- **Backend**: Supabase (PostgreSQL + Auth + Realtime)
- **Estilização**: Tailwind CSS
- **Estado**: Zustand
- **Gráficos**: Recharts
- **Ícones**: Lucide React

## 🚀 Começando

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Android Studio (para build Android)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/app-financas.git
cd app-financas

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Adicione suas credenciais do Supabase no .env

# Rode em modo desenvolvimento
npm run dev
```

### Build para Mobile

```bash
# Build da aplicação
npm run build

# Sincronize com as plataformas mobile
npx cap sync

# Abra no Android Studio
npx cap open android

```

## 📐 Arquitetura

```
/src
  /components          # Componentes reutilizáveis
    /ui               # Componentes de interface base
    /forms            # Formulários e inputs
    /cards            # Cards de exibição de dados
  /pages              # Páginas/telas do app
    /Dashboard        # Visão geral do mês
    /Gastos           # Listagem e CRUD de gastos
    /Categorias       # Gerenciamento de categorias
    /Cartoes          # Gerenciamento de meios de pagamento
    /Planejamento     # Reservas e metas
    /Timeline         # Visão dos próximos 6 meses
  /services           # Lógica de negócio
    /supabase         # Client e queries do Supabase
    /calculations     # Cálculos financeiros
  /store              # Estado global (Zustand)
  /utils              # Funções auxiliares
  /hooks              # Custom React hooks
```

## 🗃️ Estrutura do Banco de Dados

### Tabelas Principais

**usuarios**
- Autenticação via Supabase Auth

**rendas**
- renda_fixa: decimal
- renda_extra: decimal (opcional)
- descricao_extra: texto
- mes: data

**meios_pagamento**
- nome: texto (ex: "Nubank", "Dinheiro")
- tipo: texto ("credito", "debito", "pix")
- limite: decimal (opcional)

**categorias**
- nome: texto
- icone: texto (emoji)
- cor: hex
- tipo: enum ("fixa", "variavel", "reserva")

**gastos**
- descricao: texto
- valor: decimal
- categoria_id: fk
- meio_pagamento_id: fk
- mes: data
- data_vencimento: data
- status: enum ("pendente", "pago", "atrasado")
- tipo: enum ("unico", "parcelado", "recorrente")
- parcela_atual: int (se parcelado)
- total_parcelas: int (se parcelado)
- gasto_pai_id: fk (referência ao gasto original)

**reservas**
- categoria_id: fk
- valor_mensal: decimal
- mes: data

## 🎯 Funcionalidades

### MVP (v1.0) 

- [ ] Autenticação (login/cadastro)
- [ ] Cadastro de renda mensal (fixa + extra)
- [ ] Gestão de meios de pagamento
- [ ] Categorias pré-definidas
- [ ] CRUD de gastos únicos
- [ ] Marcar gastos como pago
- [ ] Dashboard com saldo do mês
- [ ] Filtro por cartão
- [ ] Navegação entre meses

### v1.1  

- [ ] Gastos parcelados
- [ ] Gastos recorrentes
- [ ] Categorias personalizadas
- [ ] Sistema de alertas
- [ ] Timeline de 6 meses futuros
- [ ] Gráfico de gastos por categoria

### v2.0 

- [ ] Planejamento de reservas
- [ ] Notificações push
- [ ] Gráficos avançados
- [ ] Export/import de dados
- [ ] Múltiplas carteiras
- [ ] Metas por categoria

### v3.0 

- [ ] Anexar comprovantes (fotos)
- [ ] Integração Open Finance
- [ ] Widget para tela inicial
- [ ] Modo escuro
- [ ] Backup automático
- [ ] Análise de padrões com IA

## 🎨 Design System

### Paleta de Cores (Indigo Minimalista)

**Primárias**
- Indigo Principal: `#6366F1`
- Indigo Escuro: `#4F46E5`
- Indigo Claro: `#818CF8`

**Neutrals**
- Preto: `#171717`
- Cinza Escuro: `#404040`
- Cinza Médio: `#A3A3A3`
- Cinza Claro: `#E5E5E5`
- Branco: `#FFFFFF`

**Status**
- Sucesso (verde): `#10B981`
- Alerta (amarelo): `#F59E0B`
- Erro (vermelho): `#EF4444`

### Componentes

- Bordas finas (`border-[#E5E5E5]`)
- Sem gradientes (cores sólidas)
- Cards com sombra sutil
- Tipografia: Inter ouSystem Font

## 📊 Lógica de Negócio

### Cálculo de Saldo

```
Saldo do Mês = (Renda Fixa + Renda Extra) - (Soma de Gastos)
```

### Status de Gastos

- **Pendente**: não foi marcado como pago
- **Pago**: marcado como pago pelo usuário
- **Atrasado**: data de vencimento passou e ainda está pendente

### Alertas

- ⚠️ **Amarelo**: gastou > 80% da renda
- 🔴 **Vermelho**: gastou > 100% da renda (vai faltar)
- ✅ **Verde**: está dentro do planejado

### Gastos Parcelados

Ao criar um gasto parcelado (ex: 12x de R$ 100):
1. Cria o gasto principal como "pago" (compra já foi feita)
2. Cria 12 gastos filhos (um para cada mês)
3. Cada filho referencia o `gasto_pai_id`
4. Parcelas futuras aparecem nos meses correspondentes

### Gastos Recorrentes

Funciona como template:
1. Usuário marca gasto como recorrente
2. Sistema copia automaticamente para os próximos meses
3. Cada cópia é independente (pode editar sem afetar outras)

## 🧪 Testes

```bash
# Rodar testes unitários
npm run test

```

## 📱 Build e Deploy

### Android

```bash
npm run build
npx cap sync android
npx cap open android
# Gere o APK/AAB pelo Android Studio
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📝 Convenções de Código

- Use ESLint e Prettier (configurações já incluídas)
- Componentes em PascalCase
- Funções e variáveis em camelCase
- Commits em português, descritivos
- Adicione JSDoc em funções complexas

## 🐛 Problemas Conhecidos

- [ ] Sincronização offline ainda não implementada
- [ ] Notificações push dependem de configuração Firebase
- [ ] Build iOS requer certificado Apple Developer

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- **Yasmin Dos Santos Barata** - *Desenvolvimento inicial* - [@YasminSBarata](https://github.com/YasminSBarata)


**Versão atual**: 1.0.0-beta  
**Última atualização**: Janeiro 2026
