# Configuração do Supabase para Kanban Workout

## Passo 1: Criar conta no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Clique em "Start your project"
3. Faça login com GitHub ou crie uma conta
4. Clique em "New Project"

## Passo 2: Configurar o projeto

1. **Nome do projeto**: `kanban-workout` (ou qualquer nome)
2. **Database Password**: Crie uma senha forte
3. **Region**: Escolha a região mais próxima (ex: São Paulo)
4. Clique em "Create new project"

## Passo 3: Configurar as tabelas

1. No dashboard do Supabase, vá para **SQL Editor**
2. Clique em **New Query**
3. Cole o conteúdo do arquivo `supabase-schema.sql`
4. Clique em **Run** para executar

## Passo 4: Obter as credenciais

1. No dashboard, vá para **Settings** > **API**
2. Copie:
   - **Project URL** (ex: `https://xyz.supabase.co`)
   - **anon public** key (começa com `eyJ...`)

## Passo 5: Configurar variáveis de ambiente

1. Crie um arquivo `.env` na raiz do projeto:
```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

2. Substitua pelos valores copiados no passo anterior

## Passo 6: Testar a conexão

1. Execute o projeto:
```bash
npm run dev
```

2. Verifique se os dados estão carregando do banco

## Estrutura do Banco

### Tabela `exercises`
- `id`: ID único do exercício
- `name`: Nome do exercício
- `muscle`: Grupo muscular
- `reps`: Repetições
- `sets`: Número de séries
- `weight`: Peso
- `rest_time`: Tempo de descanso
- `image`: URL da imagem

### Tabela `workouts`
- `id`: ID único do treino
- `day`: Dia da semana
- `exercise_id`: Referência ao exercício
- `sets`: Séries para este dia
- `completed_sets`: Séries completadas
- `rest_time`: Tempo de descanso

## Deploy na Vercel

1. Configure as variáveis de ambiente na Vercel:
   - Vá para **Settings** > **Environment Variables**
   - Adicione `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`

2. Faça o deploy normalmente

## Funcionalidades

✅ **Exercícios**: CRUD completo
✅ **Treinos por dia**: Adicionar/remover exercícios
✅ **Progresso**: Marcar séries completadas
✅ **Timer de descanso**: Cronômetro automático
✅ **Sincronização**: Dados salvos no banco

## Troubleshooting

### Erro de conexão
- Verifique se as variáveis de ambiente estão corretas
- Confirme se o projeto Supabase está ativo

### Dados não carregam
- Verifique se as tabelas foram criadas corretamente
- Confirme se há dados inseridos

### Erro de CORS
- No Supabase, vá para **Settings** > **API**
- Adicione seu domínio em **Additional Allowed Origins** 