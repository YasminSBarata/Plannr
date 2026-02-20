import { supabase } from '../lib/supabase'
import type { TablesInsert } from '../types/database'
import type { TablesUpdate } from '../types/database'

export async function listarCategorias(user_id: string) {
  const { data, error } = await supabase.from('categorias').select('*').eq('user_id', user_id)

  if (error) throw error
  return data
}

export async function criarCategoria(categoria: TablesInsert<'categorias'>) {
  const { data, error } = await supabase.from('categorias').insert(categoria).select().single()

  if (error) throw error
  return data
}

export async function atualizarCategoria(id: string, dados: TablesUpdate<'categorias'>) {
  const { data, error } = await supabase
    .from('categorias')
    .update(dados)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deletarCategoria(id: string) {
  const { data, error } = await supabase.from('categorias').delete().eq('id', id)

  if (error) throw error
  return data
}
