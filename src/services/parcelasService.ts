import { supabase } from '../lib/supabase'
import type { TablesInsert, TablesUpdate } from '../types/database'

export async function listarParcelas(user_id: string) {
  const { data, error } = await supabase.from('parcelas').select('*').eq('user_id', user_id)

  if (error) throw error
  return data
}
export async function criarParcela(parcela: TablesInsert<'parcelas'>) {
  const { data, error } = await supabase.from('parcelas').insert(parcela).select().single()

  if (error) throw error
  return data
}
export async function atualizarParcela(id: string, dados: TablesUpdate<'parcelas'>) {
  const { data, error } = await supabase
    .from('parcelas')
    .update(dados)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}
export async function deletarParcela(id: string) {
  const { data, error } = await supabase.from('parcelas').delete().eq('id', id)

  if (error) throw error
  return data
}

export async function listarParcelasCompletas(user_id: string) {
  const { data, error } = await supabase
    .from('parcelas')
    .select('*, gastos(*)') // relaciona parcela com a descrição do gasto
    .eq('user_id', user_id)

  if (error) throw error
  return data
}
