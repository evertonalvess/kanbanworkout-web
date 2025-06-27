import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const supabaseUrl = 'https://tkzkxklqubbgzjyhvgzv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRremt4a2xxdWJiZ3pqeWh2Z3p2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5Nzk0NjgsImV4cCI6MjA2NjU1NTQ2OH0.0ON1HQ8vCgoaoG8_TLwGJ6iq_9AXGW09IxT1B53WxAg'
const supabase = createClient(supabaseUrl, supabaseKey)

const ICON = '/Imagens/icon_kanbanworkout.png'
const IMAGES_DIR = './public/Imagens'

// Lista dos treinos conforme Treinos 2025-05.md
const workouts = [
  // Domingo
  { name: 'Agachamento livre', day: 'Domingo', muscle: 'pernas', reps: '8-10', sets: 4, weight: '20kg', rest_time: 60 },
  { name: 'Leg press', day: 'Domingo', muscle: 'pernas', reps: '10-12', sets: 4, weight: '50kg cada lado', rest_time: 60 },
  { name: 'Cadeira extensora', day: 'Domingo', muscle: 'pernas', reps: '12', sets: 4, weight: '68kg', rest_time: 60 },
  { name: 'Afundo c/ halteres', day: 'Domingo', muscle: 'pernas', reps: '10 por perna', sets: 3, weight: '', rest_time: 60 },
  { name: 'Panturrilha em pé', day: 'Domingo', muscle: 'pernas', reps: '15', sets: 4, weight: '', rest_time: 60 },
  // Segunda
  { name: 'Supino reto', day: 'Segunda', muscle: 'peito', reps: '8', sets: 4, weight: '22kg', rest_time: 60 },
  { name: 'Supino inclinado', day: 'Segunda', muscle: 'peito', reps: '10', sets: 4, weight: '17kg (livre) ou 27kg (máquina)', rest_time: 60 },
  { name: 'Crossover', day: 'Segunda', muscle: 'peito', reps: '12', sets: 3, weight: 'Substitui crucifixo 65', rest_time: 60 },
  { name: 'Tríceps pulley', day: 'Segunda', muscle: 'bracos', reps: '12', sets: 4, weight: '25kg ou nível 10', rest_time: 60 },
  { name: 'Mergulho', day: 'Segunda', muscle: 'bracos', reps: '10', sets: 3, weight: '', rest_time: 60 },
  { name: 'Abdominal meia-bola', day: 'Segunda', muscle: 'abdomen', reps: '15', sets: 4, weight: '', rest_time: 60 },
  // Terça
  { name: 'Barra fixa', day: 'Terça', muscle: 'costas', reps: 'máx.', sets: 4, weight: '20kg lastro', rest_time: 60 },
  { name: 'Remada curvada', day: 'Terça', muscle: 'costas', reps: '10', sets: 4, weight: '35kg', rest_time: 60 },
  { name: 'Pulley frente', day: 'Terça', muscle: 'costas', reps: '12', sets: 4, weight: '42kg', rest_time: 60 },
  { name: 'Rosca direta', day: 'Terça', muscle: 'bracos', reps: '10', sets: 4, weight: '14kg', rest_time: 60 },
  { name: 'Rosca alternada', day: 'Terça', muscle: 'bracos', reps: '12', sets: 3, weight: '12kg', rest_time: 60 },
  { name: 'Abdominal paralela meia-bola', day: 'Terça', muscle: 'abdomen', reps: '15', sets: 4, weight: '', rest_time: 60 },
  // Quinta
  { name: 'Stiff', day: 'Quinta', muscle: 'pernas', reps: '10', sets: 4, weight: '40kg', rest_time: 60 },
  { name: 'Mesa flexora', day: 'Quinta', muscle: 'pernas', reps: '12', sets: 4, weight: '35kg', rest_time: 60 },
  { name: 'Levantamento terra', day: 'Quinta', muscle: 'pernas', reps: '8', sets: 3, weight: '35kg', rest_time: 60 },
  { name: 'Panturrilha sentada', day: 'Quinta', muscle: 'pernas', reps: '15', sets: 4, weight: '', rest_time: 60 },
  { name: 'Passada', day: 'Quinta', muscle: 'pernas', reps: '10 por perna', sets: 3, weight: '8kg', rest_time: 60 },
  { name: 'Abdominal paralela meia-bola', day: 'Quinta', muscle: 'abdomen', reps: '15', sets: 4, weight: '', rest_time: 60 },
  // Sexta
  { name: 'Supino declinado', day: 'Sexta', muscle: 'peito', reps: '10', sets: 4, weight: '35kg', rest_time: 60 },
  { name: 'Crucifixo reto', day: 'Sexta', muscle: 'peito', reps: '12', sets: 3, weight: '57kg', rest_time: 60 },
  { name: 'Elevação lateral', day: 'Sexta', muscle: 'ombros', reps: '12', sets: 4, weight: '8kg', rest_time: 60 },
  { name: 'Desenvolvimento com halteres', day: 'Sexta', muscle: 'ombros', reps: '10', sets: 3, weight: '18kg', rest_time: 60 },
  { name: 'Encolhimento', day: 'Sexta', muscle: 'ombros', reps: '15', sets: 3, weight: '22kg (halter)', rest_time: 60 },
  // Sábado
  { name: 'Rosca direta barra reta (polia)', day: 'Sábado', muscle: 'bracos', reps: '10', sets: 4, weight: '28kg', rest_time: 60 },
  { name: 'Rosca martelo (polia)', day: 'Sábado', muscle: 'bracos', reps: '12', sets: 3, weight: '21kg', rest_time: 60 },
  { name: 'Rosca unilateral atrás do corpo (polia)', day: 'Sábado', muscle: 'bracos', reps: '12', sets: 3, weight: '12kg', rest_time: 60 },
  { name: 'Tríceps francês', day: 'Sábado', muscle: 'bracos', reps: '12', sets: 3, weight: '', rest_time: 60 },
  { name: 'Tríceps banco', day: 'Sábado', muscle: 'bracos', reps: '10', sets: 3, weight: '', rest_time: 60 },
  { name: 'Abdominal paralela meia-bola', day: 'Sábado', muscle: 'abdomen', reps: '15', sets: 4, weight: '', rest_time: 60 },
]

function findImage(exerciseName) {
  const files = fs.readdirSync(IMAGES_DIR)
  
  // Normalizar o nome do exercício (remover acentos, converter para minúsculo)
  const normalizeName = (name) => {
    return name.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .replace(/[^a-z0-9\s]/g, '') // Remove caracteres especiais exceto espaços
      .trim()
  }
  
  const normalizedExerciseName = normalizeName(exerciseName)
  
  // Primeiro, tentar correspondência exata (case-insensitive)
  let found = files.find(f => {
    const fileName = f.replace('.png', '').toLowerCase()
    return fileName === exerciseName.toLowerCase()
  })
  
  // Se não encontrar, tentar com normalização (sem acentos)
  if (!found) {
    found = files.find(f => {
      const normalizedFileName = normalizeName(f.replace('.png', ''))
      return normalizedFileName === normalizedExerciseName
    })
  }
  
  return found ? `/Imagens/${found}` : ICON
}

const exercises = []
for (const w of workouts) {
  if (!exercises.find(e => e.name === w.name)) {
    const img = findImage(w.name)
    exercises.push({
      name: w.name,
      muscle: w.muscle,
      image: img,
      reps: w.reps,
      sets: w.sets,
      weight: w.weight,
      rest_time: w.rest_time
    })
    console.log(`Exercício: ${w.name} | Imagem: ${img} | Reps: ${w.reps} | Sets: ${w.sets} | Peso: ${w.weight}`)
  }
}

async function updateDB() {
  // Limpar tabelas
  await supabase.from('workouts').delete().neq('id', 0)
  await supabase.from('exercises').delete().neq('id', 0)

  // Inserir exercícios
  const { data: exData, error: exError } = await supabase.from('exercises').insert(exercises).select()
  if (exError) {
    console.error('Erro ao inserir exercícios:', exError)
    return
  }

  // Inserir treinos
  const workoutsToInsert = []
  for (const w of workouts) {
    const ex = exData.find(e => e.name === w.name)
    if (ex) {
      workoutsToInsert.push({
        day: w.day,
        exercise_id: ex.id,
        sets: w.sets,
        completed_sets: 0,
        rest_time: w.rest_time
      })
    }
  }
  const { error: wError } = await supabase.from('workouts').insert(workoutsToInsert)
  if (wError) {
    console.error('Erro ao inserir treinos:', wError)
    return
  }
  console.log('✅ Banco atualizado com sucesso!')
}

updateDB() 