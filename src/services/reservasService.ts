import { supabase } from '../lib/supabase'
import type { TablesInsert, TablesUpdate } from '../types/database'

export async function listarReservas(user_id: string) {
  const { data, error } = await supabase.from('reservas').select('*').eq('user_id', user_id)

  if (error) throw error
  return data
}

export async function criarReserva(reserva: TablesInsert<'reservas'>) {
  const { data, error } = await supabase.from('reservas').insert(reserva).select().single()

  if (error) throw error
  return data
}

export async function atualizarReserva(id: string, dados: TablesUpdate<'reservas'>) {
  const { data, error } = await supabase
    .from('reservas')
    .update(dados)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deletarReserva(id: string) {
  const { data, error } = await supabase.from('reservas').delete().eq('id', id)

  if (error) throw error
  return data
}

// Função especial: busca reservas vigentes no mês

export async function listarReservasDoMes(user_id: string, mes_ano: string) {
  const { data, error } = await supabase
    .from('reservas')
    .select('*, categorias(*)')
    .eq('user_id', user_id)
    .lte('mes_ano', mes_ano) // tras reservas do mes vigente ou antes
    .order('mes_ano', { ascending: false }) //oredena do mais recente pro mais antigo

  if (error) throw error

  //  Filtra pra pegar só a o valor da reserva mais recente de cada categoria

  //     O problema:
  // O data que volta do Supabase pode ter várias reservas da mesma categoria:
  // typescriptdata = [
  //   { categoria_id: "dizimo", valor_mensal: 100, mes_ano: "2025-03-01" },
  //   { categoria_id: "dizimo", valor_mensal: 80, mes_ano: "2025-01-01" },
  //   { categoria_id: "emergencia", valor_mensal: 100, mes_ano: "2025-02-01" },
  // ]
  // agora, só quero pegar uma reserva de cada categoria--> vai rodando o array data e adicionando no map com as condicoes abaixo:
  // o map só tem as primeiras de cada categoria — que são as mais recentes, porque o array já veio ordenado(no order ali em cima)

  const reservasPorCategoria = new Map() //map() : estrutura de dados que guarda pares chave->valor, com metodos inclusos
  // ex:
  // | Chave (categoria_id) | Valor (reserva)              |
  // |----------------------|------------------------------|
  // | "dizimo"             | { valor: 100, mes: "mar" }   |
  // | "emergencia"         | { valor: 100, mes: "fev" }   |

  for (const reserva of data) {
    // percorre cada reserva do array(ali em cima)
    if (!reservasPorCategoria.has(reserva.categoria_id))
      //has verifica se existe
      // o ! inverte: retorna true se não está no Map. verifica se a categoria ainda nao existe no map(estrutura criada a partir do data que retorna)
      reservasPorCategoria.set(reserva.categoria_id, reserva)
    // se não existe, adiciona no map:
    // .set(chave, valor)-->adiciona um par no Map.
    // Chave: reserva.categoria_id (ex: "dizimo")
    // Valor: reserva (o objeto inteiro)
  }

  return Array.from(reservasPorCategoria.values())
  // .values: pega só os valores do Map, sem as chaves.
  //Array.from(): O .values() retorna um Iterator, não um array de verdade. Pra transformar em array (que é mais fácil de usar no React), usamos Array.from().
  // Resultado final:
  // Um array simples com uma reserva de cada categoria — a mais recente de cada.
  // typescript[
  //   { categoria_id: "dizimo", valor_mensal: 100, mes_ano: "2025-03-01" },
  //   { categoria_id: "emergencia", valor_mensal: 50, mes_ano: "2025-02-01" }
  // ]
}
