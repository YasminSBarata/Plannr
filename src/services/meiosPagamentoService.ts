import { supabase } from '../lib/supabase'
import type { TablesInsert, TablesUpdate } from '../types/database'

export async function listarMeiosPagamento(user_id: string) {
  const { data, error } = await supabase.from('meios_pagamento').select('*').eq('user_id', user_id)

  if (error) throw error
  return data
}
export async function criarMeioPagamento(meios: TablesInsert<'meios_pagamento'>) {
  const { data, error } = await supabase.from('meios_pagamento').insert(meios).select().single()

  if (error) throw error
  return data
}
export async function atualizarMeioPagamento(id: string, dados: TablesUpdate<'meios_pagamento'>) {
  const { data, error } = await supabase
    .from('meios_pagamento')
    .update(dados)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}
export async function deletarMeioPagamento(id: string) {
  const { data, error } = await supabase.from('meios_pagamento').delete().eq('id', id)

  if (error) throw error
  return data
}
