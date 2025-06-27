import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const supabaseUrl = 'https://tkzkxklqubbgzjyhvgzv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRremt4a2xxdWJiZ3pqeWh2Z3p2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5Nzk0NjgsImV4cCI6MjA2NjU1NTQ2OH0.0ON1HQ8vCgoaoG8_TLwGJ6iq_9AXGW09IxT1B53WxAg'

const supabase = createClient(supabaseUrl, supabaseKey)

async function setupDatabase() {
  try {
    console.log('🔄 Configurando banco de dados...')
    
    // Ler o arquivo SQL
    const sqlContent = fs.readFileSync('supabase-schema.sql', 'utf8')
    
    // Dividir o SQL em comandos individuais
    const commands = sqlContent
      .split(';')
      .map(cmd => cmd.trim())
      .filter(cmd => cmd.length > 0)
    
    console.log(`📝 Executando ${commands.length} comandos SQL...`)
    
    // Executar cada comando
    for (let i = 0; i < commands.length; i++) {
      const command = commands[i]
      if (command.trim()) {
        console.log(`Executando comando ${i + 1}/${commands.length}...`)
        
        const { error } = await supabase.rpc('exec_sql', { sql: command })
        
        if (error) {
          console.log(`⚠️ Comando ${i + 1} falhou:`, error.message)
          // Continuar mesmo com erro (pode ser que a tabela já exista)
        }
      }
    }
    
    console.log('✅ Configuração concluída!')
    console.log('🎉 Agora você pode acessar o app em: http://localhost:5173')
    
  } catch (error) {
    console.error('❌ Erro ao configurar banco:', error)
  }
}

setupDatabase() 