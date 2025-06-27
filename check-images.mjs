import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const supabaseUrl = 'https://tkzkxklqubbgzjyhvgzv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRremt4a2xxdWJiZ3pqeWh2Z3p2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5Nzk0NjgsImV4cCI6MjA2NjU1NTQ2OH0.0ON1HQ8vCgoaoG8_TLwGJ6iq_9AXGW09IxT1B53WxAg'
const supabase = createClient(supabaseUrl, supabaseKey)

const IMAGES_DIR = './public/Imagens'

async function checkImages() {
  try {
    console.log('🔍 Verificando imagens no banco vs arquivos locais...')
    console.log('')
    
    // Listar arquivos locais
    const files = fs.readdirSync(IMAGES_DIR)
    console.log('📁 Arquivos disponíveis em ./public/Imagens/:')
    files.forEach(file => console.log(`   - ${file}`))
    console.log('')
    
    // Buscar exercícios no banco
    const { data: exercises, error } = await supabase
      .from('exercises')
      .select('name, image')
      .order('name')
    
    if (error) {
      console.error('❌ Erro ao buscar exercícios:', error)
      return
    }
    
    console.log('🗄️ Imagens salvas no banco:')
    exercises.forEach(exercise => {
      console.log(`   ${exercise.name}: ${exercise.image}`)
    })
    console.log('')
    
    // Verificar correspondências
    console.log('🔍 Verificando correspondências:')
    exercises.forEach(exercise => {
      const expectedFile = `${exercise.name.toLowerCase()}.png`
      const hasLocalFile = files.some(f => f.toLowerCase() === expectedFile)
      const status = hasLocalFile ? '✅' : '❌'
      console.log(`${status} ${exercise.name}: ${hasLocalFile ? 'Encontrado' : 'Não encontrado'} (${expectedFile})`)
    })
    
  } catch (error) {
    console.error('❌ Erro geral:', error)
  }
}

checkImages() 