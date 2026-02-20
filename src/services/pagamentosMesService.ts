import { supabase } from '../lib/supabase'
import type { TablesInsert, TablesUpdate } from '../types/database'

export async function listarPagamentosMes(user_id: string) {
  const { data, error } = await supabase.from('pagamentos_mes').select('*').eq('user_id', user_id)

  if (error) throw error
  return data
}
export async function criarPagamentoMes(pagamento: TablesInsert<'pagamentos_mes'>) {
  const { data, error } = await supabase.from('pagamentos_mes').insert(pagamento).select().single()

  if (error) throw error
  return data
}
export async function atualizarPagamentoMes(id: string, dados: TablesUpdate<'pagamentos_mes'>) {
  const { data, error } = await supabase
    .from('pagamentos_mes')
    .update(dados)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}
export async function deletarPagamentoMes(id: string) {
  const { data, error } = await supabase.from('pagamentos_mes').delete().eq('id', id)

  if (error) throw error
  return data
}

export async function listarPagamentosMesCompletos(user_id: string) {
  const { data, error } = await supabase
    .from('pagamentos_mes')
    .select('*, gastos(*), parcelas(*), meios_pagamento(*)')
    .eq('user_id', user_id)

  if (error) throw error
  return data
}
