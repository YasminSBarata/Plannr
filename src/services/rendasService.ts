import { supabase } from '../lib/supabase'
import type { TablesInsert } from '../types/database'
import type { TablesUpdate } from '../types/database'

//essa sintaxe: const {data, error} é destructuring, o supa vai retornar um objeto tipo: {data:..., error: ...} que da pra extrair props em variaveis separadas
// await: espera a chamada terminar antes de continuar
//supabase: client, ponte com o banco
//.from('seleciona a tabela que vai usar')
//.operação(objeto com os dados a serem usados nessa operação) ex: .insert(renda), diz a operação: "quero inserir". O renda é o objeto com os dados
//.select(): pede pra retornar o registro cirado, sem isso data==null
//.single() diz que espera **um** registro só, não um array.

export async function listarRendas(userId: string) {
  //userId: parametro identificador de usuario
  const { data, error } = await supabase.from('rendas').select('*').eq('user_id', userId) // busca todos as colunas dessa tabela rendas
  // o supabase retorna um objeto com dados(dados encontrados) e erros( caso de algum erro encontrado)
  //trazendo so as rendas do usuario e nao de todo mundo, usando o eq : WHERE user_id == 'xx
  if (error) throw error
  return data
}

export async function criarRenda(renda: TablesInsert<'rendas'>) {
  //recenbendo o objeto renda com o tipo TablesInsert<'rendas'> que ja vem com os parametros obrigatorios e opcionais para o insert na tabela rendas
  const { data, error } = await supabase.from('rendas').insert(renda).select().single()

  if (error) throw error
  return data
}

export async function atualizarRenda(id: string, dados: TablesUpdate<'rendas'>) {
  //id: qual renda atualizar; dados: o que atualizar, pode ser qlquer um pois todos sao opcionais
  const { data, error } = await supabase.from('rendas').update(dados).eq('id', id).select().single()

  if (error) throw error
  return data
}

export async function deletarRenda(id: string) {
  const { data, error } = await supabase.from('rendas').delete().eq('id', id)
  //o .delete() não recebe parâmetro. Ele só diz "quero deletar".
  // O quê deletar você define com os filtros depois (.eq(), .gt(), etc).
  // ex:
  // 1. Deletar uma renda específica pelo id
  //.delete().eq('id', 'abc-123')
  // 2. Deletar todas as rendas de um usuário
  //.delete().eq('user_id', 'user-456')
  // 3. Deletar rendas que já expiraram
  //.delete().lt('data_fim', '2025-01-01')

  if (error) throw error
  return data
}
