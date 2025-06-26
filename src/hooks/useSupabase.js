import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

export const useSupabase = () => {
  const [exercises, setExercises] = useState([])
  const [workoutPlan, setWorkoutPlan] = useState({})
  const [loading, setLoading] = useState(true)

  // Carregar exercícios
  const loadExercises = async () => {
    try {
      const { data, error } = await supabase
        .from('exercises')
        .select('*')
        .order('id')

      if (error) throw error
      setExercises(data || [])
    } catch (error) {
      console.error('Erro ao carregar exercícios:', error)
    }
  }

  // Carregar plano de treinos
  const loadWorkoutPlan = async () => {
    try {
      const { data, error } = await supabase
        .from('workouts')
        .select('*')
        .order('day')

      if (error) throw error
      
      // Agrupar por dia
      const grouped = {}
      data?.forEach(workout => {
        if (!grouped[workout.day]) {
          grouped[workout.day] = []
        }
        grouped[workout.day].push({
          exerciseId: workout.exercise_id,
          sets: workout.sets,
          completedSets: workout.completed_sets,
          restTime: workout.rest_time
        })
      })
      
      setWorkoutPlan(grouped)
    } catch (error) {
      console.error('Erro ao carregar plano de treinos:', error)
    }
  }

  // Adicionar exercício
  const addExercise = async (exercise) => {
    try {
      const { data, error } = await supabase
        .from('exercises')
        .insert([{
          name: exercise.name,
          muscle: exercise.muscle,
          reps: exercise.reps,
          sets: exercise.sets,
          weight: exercise.weight,
          rest_time: exercise.restTime,
          image: exercise.image
        }])
        .select()

      if (error) throw error
      
      setExercises(prev => [...prev, data[0]])
      return data[0]
    } catch (error) {
      console.error('Erro ao adicionar exercício:', error)
      throw error
    }
  }

  // Editar exercício
  const editExercise = async (exercise) => {
    try {
      const { data, error } = await supabase
        .from('exercises')
        .update({
          name: exercise.name,
          muscle: exercise.muscle,
          reps: exercise.reps,
          sets: exercise.sets,
          weight: exercise.weight,
          rest_time: exercise.restTime,
          image: exercise.image
        })
        .eq('id', exercise.id)
        .select()

      if (error) throw error
      
      setExercises(prev => prev.map(ex => ex.id === exercise.id ? data[0] : ex))
      return data[0]
    } catch (error) {
      console.error('Erro ao editar exercício:', error)
      throw error
    }
  }

  // Deletar exercício
  const deleteExercise = async (id) => {
    try {
      const { error } = await supabase
        .from('exercises')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      setExercises(prev => prev.filter(ex => ex.id !== id))
      
      // Também deletar do plano de treinos
      await supabase
        .from('workouts')
        .delete()
        .eq('exercise_id', id)
      
      // Recarregar plano de treinos
      await loadWorkoutPlan()
    } catch (error) {
      console.error('Erro ao deletar exercício:', error)
      throw error
    }
  }

  // Adicionar exercício ao treino do dia
  const addExerciseToWorkout = async (day, exerciseId, sets, restTime) => {
    try {
      const { data, error } = await supabase
        .from('workouts')
        .insert([{
          day,
          exercise_id: exerciseId,
          sets,
          completed_sets: 0,
          rest_time: restTime
        }])
        .select()

      if (error) throw error
      
      // Atualizar estado local
      setWorkoutPlan(prev => ({
        ...prev,
        [day]: [...(prev[day] || []), {
          exerciseId,
          sets,
          completedSets: 0,
          restTime
        }]
      }))
      
      return data[0]
    } catch (error) {
      console.error('Erro ao adicionar exercício ao treino:', error)
      throw error
    }
  }

  // Atualizar progresso do exercício
  const updateExerciseProgress = async (day, exerciseId, completedSets) => {
    try {
      const { error } = await supabase
        .from('workouts')
        .update({ completed_sets: completedSets })
        .eq('day', day)
        .eq('exercise_id', exerciseId)

      if (error) throw error
      
      // Atualizar estado local
      setWorkoutPlan(prev => ({
        ...prev,
        [day]: prev[day]?.map(item => 
          item.exerciseId === exerciseId 
            ? { ...item, completedSets }
            : item
        ) || []
      }))
    } catch (error) {
      console.error('Erro ao atualizar progresso:', error)
      throw error
    }
  }

  // Carregar dados iniciais
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      await Promise.all([loadExercises(), loadWorkoutPlan()])
      setLoading(false)
    }
    
    loadData()
  }, [])

  return {
    exercises,
    workoutPlan,
    loading,
    addExercise,
    editExercise,
    deleteExercise,
    addExerciseToWorkout,
    updateExerciseProgress,
    loadExercises,
    loadWorkoutPlan
  }
} 