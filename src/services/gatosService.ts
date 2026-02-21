import { supabase } from '../lib/supabase'
import type { TablesInsert, TablesUpdate } from '../types/database'

export async function listarGastos(user_id: string) {
  const { data, error } = await supabase.from('gastos').select('*').eq('user_id', user_id)

  if (error) throw error
  return data
}
export async function criarGasto(gasto: TablesInsert<'gastos'>) {
  const { data, error } = await supabase.from('gastos').insert(gasto).select().single()

  if (error) throw error
  return data
}
export async function atualizarGasto(id: string, dados: TablesUpdate<'gastos'>) {
  const { data, error } = await supabase.from('gastos').update(dados).eq('id', id).select().single()

  if (error) throw error
  return data
}
export async function deletarGasto(id: string) {
  const { data, error } = await supabase.from('gastos').delete().eq('id', id)

  if (error) throw error
  return data
}

export async function listarGastosCompletos(user_id: string) {
  const { data, error } = await supabase
    .from('gastos') // seleciona a tabela gastos
    .select('*, categorias(*), meios_pagamento(*)') // traz todas as colunas de gastos, segue a FK categoria_id e traz todos os campos da categoria, segue a FK meio_pagamento_id e traz todos os campos do meio de pagamento
    .eq('user_id', user_id) //filtra só os gastos desse usuário

  if (error) throw error
  return data
}
