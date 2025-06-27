import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tkzkxklqubbgzjyhvgzv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRremt4a2xxdWJiZ3pqeWh2Z3p2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5Nzk0NjgsImV4cCI6MjA2NjU1NTQ2OH0.0ON1HQ8vCgoaoG8_TLwGJ6iq_9AXGW09IxT1B53WxAg'

const supabase = createClient(supabaseUrl, supabaseKey)

async function updateLegPressImage() {
  try {
    console.log('🔄 Atualizando imagem do leg press...')
    
    // URL real de leg press fornecida pelo usuário
    const legPressImageUrl = 'https://images.unsplash.com/photo-bWxf0-B_Hao?w=300&h=200&fit=crop&crop=center'
    
    // Atualizar exercício de leg press
    const { data, error } = await supabase
      .from('exercises')
      .update({ 
        image: legPressImageUrl 
      })
      .eq('name', 'Leg press')
      .select()
    
    if (error) {
      console.error('❌ Erro ao atualizar leg press:', error)
      return
    }
    
    console.log('✅ Imagem do leg press atualizada com sucesso!')
    console.log('📸 Nova URL:', legPressImageUrl)
    
  } catch (error) {
    console.error('❌ Erro geral:', error)
  }
}

updateLegPressImage() 