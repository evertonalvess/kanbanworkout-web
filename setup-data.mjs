import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tkzkxklqubbgzjyhvgzv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRremt4a2xxdWJiZ3pqeWh2Z3p2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5Nzk0NjgsImV4cCI6MjA2NjU1NTQ2OH0.0ON1HQ8vCgoaoG8_TLwGJ6iq_9AXGW09IxT1B53WxAg'

const supabase = createClient(supabaseUrl, supabaseKey)

// Dados de exemplo
const exercises = [
  { name: 'Agachamento livre', muscle: 'pernas', reps: '8-10', sets: 4, weight: '20 kg', rest_time: 60, image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=300&h=200&fit=crop&crop=center' },
  { name: 'Leg press', muscle: 'pernas', reps: '10-12', sets: 4, weight: '50 kg cada lado', rest_time: 60, image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300&h=200&fit=crop&crop=center' },
  { name: 'Cadeira extensora', muscle: 'pernas', reps: '12', sets: 4, weight: '68 kg', rest_time: 60, image: '/Imagens/cadeira_flexora.png' },
  { name: 'Supino reto', muscle: 'peito', reps: '8', sets: 4, weight: '≥ 22 kg', rest_time: 60, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center' },
  { name: 'Barra fixa', muscle: 'costas', reps: 'máx.', sets: 4, weight: '20 kg lastro', rest_time: 60, image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&h=200&fit=crop&crop=center' },
  { name: 'Stiff', muscle: 'pernas', reps: '10', sets: 4, weight: '≥ 40 kg', rest_time: 60, image: '/Imagens/Stiff.png' },
  { name: 'Mesa flexora', muscle: 'pernas', reps: '12', sets: 4, weight: '≥ 35 kg', rest_time: 60, image: '/Imagens/mesa_flexora.png' },
  { name: 'Levantamento terra', muscle: 'pernas', reps: '8', sets: 3, weight: '≥ 35 kg', rest_time: 60, image: '/Imagens/Levantamento terra.png' },
  { name: 'Abdominal paralela meia-bola', muscle: 'abdomen', reps: '15', sets: 4, weight: 'Peso corporal', rest_time: 60, image: '/Imagens/Abdominal_paralela_meia_bola.png' }
]

async function setupData() {
  try {
    console.log('🔄 Inserindo dados de exemplo...')
    
    // Inserir exercícios
    const { data: exercisesData, error: exercisesError } = await supabase
      .from('exercises')
      .insert(exercises)
      .select()
    
    if (exercisesError) {
      console.error('❌ Erro ao inserir exercícios:', exercisesError)
      return
    }
    
    console.log(`✅ ${exercisesData.length} exercícios inseridos!`)
    
    // Inserir treinos de exemplo
    const workouts = [
      { day: 'Domingo', exercise_id: exercisesData[0].id, sets: 4, completed_sets: 0, rest_time: 60 },
      { day: 'Domingo', exercise_id: exercisesData[1].id, sets: 4, completed_sets: 0, rest_time: 60 },
      { day: 'Domingo', exercise_id: exercisesData[2].id, sets: 4, completed_sets: 0, rest_time: 60 },
      { day: 'Segunda', exercise_id: exercisesData[3].id, sets: 4, completed_sets: 0, rest_time: 60 },
      { day: 'Terça', exercise_id: exercisesData[4].id, sets: 4, completed_sets: 0, rest_time: 60 },
      { day: 'Quinta', exercise_id: exercisesData[5].id, sets: 4, completed_sets: 0, rest_time: 60 },
      { day: 'Quinta', exercise_id: exercisesData[6].id, sets: 4, completed_sets: 0, rest_time: 60 },
      { day: 'Quinta', exercise_id: exercisesData[7].id, sets: 3, completed_sets: 0, rest_time: 60 }
    ]
    
    const { data: workoutsData, error: workoutsError } = await supabase
      .from('workouts')
      .insert(workouts)
      .select()
    
    if (workoutsError) {
      console.error('❌ Erro ao inserir treinos:', workoutsError)
      return
    }
    
    console.log(`✅ ${workoutsData.length} treinos inseridos!`)
    console.log('🎉 Configuração concluída com sucesso!')
    console.log('🌐 Acesse: http://localhost:5173')
    
  } catch (error) {
    console.error('❌ Erro geral:', error)
  }
}

setupData() 