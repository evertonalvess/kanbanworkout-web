import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tkzkxklqubbgzjyhvgzv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRremt4a2xxdWJiZ3pqeWh2Z3p2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5Nzk0NjgsImV4cCI6MjA2NjU1NTQ2OH0.0ON1HQ8vCgoaoG8_TLwGJ6iq_9AXGW09IxT1B53WxAg'

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkExercises() {
  try {
    console.log('🔍 Verificando exercícios no banco...')
    
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .order('name')
    
    if (error) {
      console.error('❌ Erro ao buscar exercícios:', error)
      return
    }
    
    console.log(`✅ Encontrados ${data.length} exercícios:`)
    console.log('')
    
    data.forEach(exercise => {
      console.log(`📝 ${exercise.name}`)
      console.log(`   🏋️ ${exercise.muscle} | ${exercise.reps} | ${exercise.weight}`)
      console.log(`   🖼️ ${exercise.image}`)
      console.log('')
    })
    
  } catch (error) {
    console.error('❌ Erro geral:', error)
  }
}

checkExercises() 