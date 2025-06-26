import React, { useState, useEffect, useRef } from 'react';
import { Plus, Info, Check, Play, Pause, SkipForward, Clock, Trash } from 'lucide-react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

// Tokens do Sistema de Design
const theme = {
  colors: {
    brand: {
      primary: '#127AFF',
      success: '#34C759'
    },
    background: {
      primary: '#0E1116',
      cardGlass: 'rgba(255,255,255,0.06)'
    }
  },
  radius: {
    card: 16,
    button: 24
  }
};

// Modelos de Dados
const exerciciosExemplo = [
  // Domingo – Pernas (foco quadríceps)
  { id: 1, name: 'Agachamento livre', muscle: 'pernas', reps: '4 × 8-10', weight: '20 kg', image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=300&h=200&fit=crop&crop=center' },
  { id: 2, name: 'Leg press', muscle: 'pernas', reps: '4 × 10-12', weight: '50 kg cada lado', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300&h=200&fit=crop&crop=center' },
  { id: 3, name: 'Cadeira extensora', muscle: 'pernas', reps: '4 × 12', weight: '68 kg', image: '/Imagens/cadeira_flexora.png' },
  { id: 4, name: 'Afundo c/ halteres', muscle: 'pernas', reps: '3 × 10 por perna', weight: 'Peso corporal', image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=300&h=200&fit=crop&crop=center' },
  { id: 5, name: 'Panturrilha em pé', muscle: 'pernas', reps: '4 × 15', weight: 'Peso corporal', image: '/Imagens/Panturrilha_sentada.png' },
  
  // Segunda – Peito + tríceps
  { id: 6, name: 'Supino reto', muscle: 'peito', reps: '4 × 8', weight: '≥ 22 kg', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center' },
  { id: 7, name: 'Supino inclinado', muscle: 'peito', reps: '4 × 10', weight: '17 kg (livre) ou 27 kg (máquina)', image: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=300&h=200&fit=crop&crop=center' },
  { id: 8, name: 'Crossover', muscle: 'peito', reps: '3 × 12', weight: 'Substitui crucifixo 65', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center' },
  { id: 9, name: 'Tríceps pulley', muscle: 'bracos', reps: '4 × 12', weight: '25 kg ou nível 10', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center' },
  { id: 10, name: 'Mergulho', muscle: 'bracos', reps: '3 × 10', weight: 'Peso corporal', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center' },
  { id: 11, name: 'Abdominal meia-bola', muscle: 'abdomen', reps: '4 × 15', weight: 'Peso corporal', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center' },
  
  // Terça – Costas + bíceps
  { id: 12, name: 'Barra fixa', muscle: 'costas', reps: '4 × máx.', weight: '20 kg lastro', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&h=200&fit=crop&crop=center' },
  { id: 13, name: 'Remada curvada', muscle: 'costas', reps: '4 × 10', weight: '35 kg', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&h=200&fit=crop&crop=center' },
  { id: 14, name: 'Pulley frente', muscle: 'costas', reps: '4 × 12', weight: '42 kg', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&h=200&fit=crop&crop=center' },
  { id: 15, name: 'Rosca direta', muscle: 'bracos', reps: '4 × 10', weight: '14 kg', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center' },
  { id: 16, name: 'Rosca alternada', muscle: 'bracos', reps: '3 × 12', weight: '12 kg', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center' },
  { id: 17, name: 'Abdominal paralela meia-bola', muscle: 'abdomen', reps: '4 × 15', weight: 'Peso corporal', image: '/Imagens/Abdominal_paralela_meia_bola.png' },
  
  // Quinta – Pernas (foco posterior)
  { id: 18, name: 'Stiff', muscle: 'pernas', reps: '4 × 10', weight: '≥ 40 kg (barra 20 kg + 30 kg anilhas)', image: '/Imagens/Stiff.png' },
  { id: 19, name: 'Mesa flexora', muscle: 'pernas', reps: '4 × 12', weight: '≥ 35 kg', image: '/Imagens/mesa_flexora.png' },
  { id: 20, name: 'Levantamento terra', muscle: 'pernas', reps: '3 × 8', weight: '≥ 35 kg', image: '/Imagens/Levantamento terra.png' },
  { id: 21, name: 'Panturrilha sentada', muscle: 'pernas', reps: '4 × 15', weight: 'Peso corporal', image: '/Imagens/Panturrilha_sentada.png' },
  { id: 22, name: 'Passada', muscle: 'pernas', reps: '3 × 10 por perna', weight: '8 kg', image: '/Imagens/passada.png' },
  { id: 23, name: 'Abdominal paralela meia-bola', muscle: 'abdomen', reps: '4 × 15', weight: 'Peso corporal', image: '/Imagens/Abdominal_paralela_meia_bola.png' },
  
  // Sexta – Peito + ombro
  { id: 24, name: 'Supino declinado', muscle: 'peito', reps: '4 × 10 (24)', weight: '35 kg', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center' },
  { id: 25, name: 'Crucifixo reto', muscle: 'peito', reps: '3 × 12', weight: '57 kg', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center' },
  { id: 26, name: 'Elevação lateral', muscle: 'ombros', reps: '4 × 12', weight: '8 kg', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center' },
  { id: 27, name: 'Desenvolvimento c/ halteres', muscle: 'ombros', reps: '3 × 10', weight: '18 kg', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center' },
  { id: 28, name: 'Encolhimento', muscle: 'ombros', reps: '3 × 15', weight: '22 kg (halter)', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center' },
  
  // Sábado – Braços (bíceps + tríceps)
  { id: 29, name: 'Rosca direta barra reta (polia)', muscle: 'bracos', reps: '4 × 10', weight: '28 kg', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center' },
  { id: 30, name: 'Rosca martelo (polia)', muscle: 'bracos', reps: '3 × 12', weight: '21 kg', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center' },
  { id: 31, name: 'Rosca unilateral atrás do corpo (polia)', muscle: 'bracos', reps: '3 × 12', weight: '12 kg', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center' },
  { id: 32, name: 'Tríceps francês', muscle: 'bracos', reps: '3 × 12', weight: 'Peso corporal', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center' },
  { id: 33, name: 'Tríceps banco', muscle: 'bracos', reps: '3 × 10', weight: 'Peso corporal', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center' },
  { id: 34, name: 'Abdominal paralela meia-bola', muscle: 'abdomen', reps: '4 × 15', weight: 'Peso corporal', image: '/Imagens/Abdominal_paralela_meia_bola.png' }
];

const gruposMusculares = {
  'pernas': 'Pernas',
  'peito': 'Peito',
  'costas': 'Costas',
  'ombros': 'Ombros',
  'bracos': 'Braços',
  'abdomen': 'Abdômen',
  'cardio': 'Cardio',
  'funcional': 'Funcional'
};

// Componentes
const IconButton = ({ children, onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors ${className}`}
  >
    {children}
  </button>
);

const PillButton = ({ children, onClick, variant = 'primary', className = '' }) => {
  const baseClass = "px-4 py-2 rounded-full text-sm font-medium transition-colors";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-white/10 text-white hover:bg-white/20",
    success: "bg-green-500 text-white hover:bg-green-600"
  };
  
  return (
    <button
      onClick={onClick}
      className={`${baseClass} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const ProgressRing = ({ progress, size = 120, strokeWidth = 8 }) => {
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={theme.colors.brand.primary}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
    </div>
  );
};

const WorkoutCardView = ({ exercise, sets, completedSets, restTime, onSetComplete, onStartExercise, onImageClick }) => {
  const progress = sets > 0 ? (completedSets / sets) * 100 : 0;
  const isCompleted = completedSets === sets && sets > 0;

  return (
    <div className="bg-white/6 backdrop-blur-sm rounded-2xl p-4 mb-3 border border-white/10">
      <div className="flex gap-4 mb-3">
        {/* Imagem do exercício */}
        {exercise.image && (
          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer" onClick={onImageClick}>
            <img 
              src={exercise.image} 
              alt={exercise.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                if (e.target) e.target.style.display = 'none';
              }}
            />
          </div>
        )}
        
        <div className="flex justify-between items-start flex-1">
          <div className="flex-1">
            <h3 className="text-white font-semibold text-lg">{exercise.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-blue-400 font-medium align-middle" style={{lineHeight: '1.5'}}>
                {gruposMusculares[exercise.muscle] || exercise.muscle}
              </span>
            </div>
            <p className="text-gray-400 text-sm">{exercise.reps} reps - {exercise.weight}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">{completedSets}/{sets}</span>
            {isCompleted && <Check className="w-5 h-5 text-green-500" />}
          </div>
        </div>
      </div>
      
      {/* Barra de Progresso */}
      <div className="w-full bg-white/10 rounded-full h-2 mb-3">
        <div 
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between items-center">
        {sets === 0 ? (
          <PillButton onClick={() => onStartExercise(exercise)} variant="secondary">
            <Plus className="w-4 h-4 mr-1" />
            Iniciar Exercício
          </PillButton>
        ) : (
          <div className="flex gap-2">
            {[...Array(sets)].map((_, index) => (
              <button
                key={index}
                onClick={() => onSetComplete(exercise.id, index, restTime)}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-medium transition-colors ${
                  index < completedSets
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'border-white/30 text-white/60 hover:border-blue-500'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
        
        {/* {!isCompleted && sets > 0 && (
          <PillButton onClick={() => onStartExercise(exercise)} variant="primary">
            Continuar
          </PillButton>
        )} */}
      </div>
    </div>
  );
};

const RestTimer = ({ duration, onComplete, onAddTime, onSkip }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(true);
  const progress = ((duration - timeLeft) / duration) * 100;

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      onComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, onComplete]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Parâmetros do círculo refinados
  const size = 140;
  const strokeWidthBg = 7;
  const strokeWidth = 9;
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-2">
      <div className="bg-[#181C23] rounded-2xl p-5 w-full max-w-xs mx-auto border border-white/10 text-center shadow-2xl relative flex flex-col items-center">
        <span className="text-[11px] text-white/50 tracking-widest mb-1">CRONÔMETRO DE DESCANSO</span>
        <div className="relative flex items-center justify-center mb-4" style={{ width: size, height: size }}>
          <svg width={size} height={size}>
            <circle
              cx={center}
              cy={center}
              r={radius}
              stroke="#23272F"
              strokeWidth={strokeWidthBg}
              fill="none"
            />
            <circle
              cx={center}
              cy={center}
              r={radius}
              stroke="#127AFF"
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{
                transition: 'stroke-dashoffset 0.5s linear',
                transform: 'rotate(-90deg)',
                transformOrigin: '50% 50%'
              }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[2.8rem] font-mono text-white select-none font-light" style={{ letterSpacing: '-3px', fontVariantNumeric: 'tabular-nums' }}>
            {formatTime(timeLeft)}
          </span>
        </div>
        <div className="flex gap-2 justify-center w-full mt-1">
          <button
            onClick={() => setTimeLeft((prev) => prev + 15)}
            className="flex-1 bg-[#23272F] hover:bg-blue-500/20 text-blue-400 py-2 rounded-full font-medium transition-colors text-sm"
          >
            +15 seg
          </button>
          <button
            onClick={onSkip}
            className="flex-1 bg-blue-500 text-white py-2 rounded-full font-medium hover:bg-blue-600 transition-colors text-sm"
          >
            Pular
          </button>
        </div>
      </div>
    </div>
  );
};

const AppLayout = ({ children }) => (
  <div style={{ backgroundColor: theme.colors.background.primary }} className="min-h-screen flex flex-col text-white">
    {children}
  </div>
);

const dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

const KanbanWorkoutApp = ({
  exercises,
  setExercises,
  workoutPlan,
  setWorkoutPlan,
  selectedDay,
  setSelectedDay,
  handleAddExercise,
  handleEditExercise,
  handleDeleteExercise
}) => {
  const navigate = useNavigate();
  const [restTimer, setRestTimer] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  // Sincronizar slide com selectedDay
  const initialSlide = dias.indexOf(selectedDay);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: initialSlide,
    slideChanged(s) {
      setSelectedDay(dias[s.track.details.rel]);
    },
    rubberband: true,
    mode: 'snap',
    slides: { perView: 1, spacing: 16 },
    animation: { duration: 600, easing: t => t }
  });

  useEffect(() => {
    if (instanceRef.current) {
      const idx = dias.indexOf(selectedDay);
      if (instanceRef.current.track.details.rel !== idx) {
        instanceRef.current.moveToIdx(idx);
      }
    }
  }, [selectedDay]);

  const todaysWorkout = workoutPlan[selectedDay] || [];

  const handleSetComplete = (exerciseId, _setIndex, restTime) => {
    setWorkoutPlan(prev => ({
      ...prev,
      [selectedDay]: prev[selectedDay].map(item => {
        if (item.exerciseId === exerciseId) {
          // Se já completou todas as séries, não faz nada
          if (item.completedSets >= item.sets) return item;
          // Preenche a próxima série não feita
          return { ...item, completedSets: item.completedSets + 1, restTime };
        }
        return item;
      })
    }));
    setRestTimer({
      duration: restTime,
      onComplete: () => setRestTimer(null),
      onAddTime: () => setRestTimer(prev => ({ ...prev, duration: prev.duration + 15 })),
      onSkip: () => setRestTimer(null)
    });
  };

  const handleStartExercise = (exercise) => {
    const existingWorkout = todaysWorkout.find(w => w.exerciseId === exercise.id);
    if (!existingWorkout) {
      setWorkoutPlan(prev => ({
        ...prev,
        [selectedDay]: [...(prev[selectedDay] || []), { exerciseId: exercise.id, sets: 3, completedSets: 0, restTime: 60 }]
      }));
    }
  };

  const getExerciseById = (id) => exercises.find(ex => ex.id === id);

  // Função utilitária para extrair grupos musculares únicos do dia
  function getMuscleGroupsForDay(workout, getExerciseById) {
    const ids = workout.map(item => item.exerciseId);
    const muscles = ids.map(id => {
      const ex = getExerciseById(id);
      return ex ? (gruposMusculares[ex.muscle] || ex.muscle) : null;
    }).filter(Boolean);
    // Remover duplicados
    return [...new Set(muscles)];
  }

  return (
    <AppLayout>
      {/* Cabeçalho e seletor de dias fixos */}
      <div className="sticky top-0 z-20" style={{ backgroundColor: theme.colors.background.primary }}>
        <div className="px-6 pt-8 pb-2">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">Treinos</h1>
              {/* Pills dos grupos musculares */}
              {(() => {
                const groups = getMuscleGroupsForDay(todaysWorkout, getExerciseById);
                return groups.length > 0 ? groups.map((muscle) => (
                  <span key={muscle} className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/60 text-blue-300 border border-blue-500/30 ml-1 align-middle" style={{lineHeight: '1.5', minWidth: 36, textAlign: 'center'}}>
                    {muscle}
                  </span>
                )) : (
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/60 text-blue-300 border border-blue-500/30 ml-1 align-middle" style={{lineHeight: '1.5', minWidth: 36, textAlign: 'center'}}>—</span>
                );
              })()}
            </div>
            <IconButton onClick={() => navigate('/biblioteca')}>
              <Plus className="w-5 h-5 text-white" />
            </IconButton>
          </div>
          {/* Seletor de Dia */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {dias.map(day => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                  selectedDay === day
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-gray-400 hover:text-white'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Carrossel de Treinos */}
      <div ref={sliderRef} className="keen-slider flex-1 overflow-y-auto px-0 pt-2 pb-8">
        {dias.map((day, idx) => {
          const todaysWorkout = workoutPlan[day] || [];
          return (
            <div key={day} className="keen-slider__slide px-6">
              <div className="space-y-4">
                {todaysWorkout.map((workoutItem, index) => {
                  const exercise = exercises.find(ex => ex.id === workoutItem.exerciseId);
                  if (!exercise) return null;
                  return (
                    <WorkoutCardView
                      key={`${exercise.id}-${index}`}
                      exercise={exercise}
                      sets={workoutItem.sets}
                      completedSets={workoutItem.completedSets}
                      restTime={workoutItem.restTime}
                      onSetComplete={handleSetComplete}
                      onStartExercise={handleStartExercise}
                      onImageClick={() => setModalImage(exercise.image)}
                    />
                  );
                })}
                {todaysWorkout.length === 0 && (
                  <div className="text-center py-12">
                    <Clock className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">Nenhum exercício planejado para {day}</p>
                    <p className="text-gray-500 text-sm mt-2">Toque no botão + para adicionar exercícios</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* Modal de Imagem */}
      {modalImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={() => setModalImage(null)}>
          <div className="relative" onClick={e => e.stopPropagation()}>
            <img src={modalImage} alt="Exercício" className="max-w-[90vw] max-h-[80vh] rounded-2xl shadow-2xl" />
            <button onClick={() => setModalImage(null)} className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-2">
              <Plus className="w-6 h-6 transform rotate-45" />
            </button>
          </div>
        </div>
      )}
      {/* Modal do Cronômetro de Descanso */}
      {restTimer && (
        <RestTimer
          duration={restTimer.duration}
          onComplete={restTimer.onComplete}
          onAddTime={restTimer.onAddTime}
          onSkip={restTimer.onSkip}
        />
      )}
    </AppLayout>
  );
};

const BibliotecaScreen = (props) => {
  const navigate = useNavigate();
  const [newExercise, setNewExercise] = useState({ 
    name: '', 
    muscle: 'pernas', 
    reps: '', 
    sets: '', 
    weight: '', 
    restTime: '60',
    image: '' 
  });
  const [imageInputType, setImageInputType] = useState('url');
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const fileInputRef = useRef(null);
  const formRef = useRef(null);

  // Filtrar exercícios do dia
  const idsDoDia = (props.workoutPlan[props.selectedDay] || []).map(item => item.exerciseId);
  const exerciciosDoDia = props.exercises.filter(ex => idsDoDia.includes(ex.id));

  // Função para fazer parsing dos dados existentes
  const parseExerciseData = (exercise) => {
    let sets = '';
    let reps = '';
    
    // Se já tem os campos separados, usa eles
    if (exercise.sets && exercise.reps) {
      sets = exercise.sets;
      reps = exercise.reps;
    } else if (exercise.reps) {
      // Faz parsing do formato "4 × 10" ou "4 × 8-10"
      const repsMatch = exercise.reps.match(/^(\d+)\s*×\s*(.+)$/);
      if (repsMatch) {
        sets = repsMatch[1]; // "4"
        reps = repsMatch[2]; // "10" ou "8-10"
      } else {
        // Se não tem o formato esperado, mantém como está
        reps = exercise.reps;
        sets = '3'; // valor padrão
      }
    }
    
    return {
      sets: sets || '',
      reps: reps || '',
      weight: exercise.weight || '',
      restTime: exercise.restTime || '60'
    };
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewExercise(prev => ({ ...prev, image: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (newExercise.name.trim()) {
      let newId = editingId ? editingId : Date.now();
      if (editingId) {
        props.onEditExercise({ ...newExercise, id: editingId });
      } else {
        props.onAddExercise({ ...newExercise, id: newId });
      }
      // Atualiza o plano do dia
      props.setWorkoutPlan(prev => {
        const atual = prev[props.selectedDay] || [];
        const sets = parseInt(newExercise.sets) || 3;
        const restTime = parseInt(newExercise.restTime) || 60;
        if (!editingId) {
          return { ...prev, [props.selectedDay]: [...atual, { exerciseId: newId, sets, completedSets: 0, restTime }] };
        } else {
          return { ...prev, [props.selectedDay]: atual.map(item => item.exerciseId === editingId ? { ...item, exerciseId: editingId, sets, restTime } : item) };
        }
      });
      setNewExercise({ 
        name: '', 
        muscle: 'pernas', 
        reps: '', 
        sets: '', 
        weight: '', 
        restTime: '60',
        image: '' 
      });
      setEditingId(null);
      setShowForm(false);
    }
  };

  const handleEditClick = (exercise) => {
    const parsedData = parseExerciseData(exercise);
    setNewExercise({
      name: exercise.name,
      muscle: exercise.muscle,
      reps: parsedData.reps,
      sets: parsedData.sets,
      weight: parsedData.weight,
      restTime: parsedData.restTime,
      image: exercise.image || ''
    });
    setEditingId(exercise.id);
    setImageInputType(exercise.image ? 'url' : 'url');
    setShowForm(true);
    setTimeout(() => {
      if (formRef.current) {
        // Calcular altura do cabeçalho fixo
        const header = document.querySelector('.sticky.top-0');
        const headerHeight = header ? header.offsetHeight : 0;
        const formTop = formRef.current.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: formTop - headerHeight - 8, // 8px de margem extra
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const handleDelete = (id) => {
    props.onDeleteExercise(id);
    props.setWorkoutPlan(prev => {
      const novo = { ...prev };
      novo[props.selectedDay] = (novo[props.selectedDay] || []).filter(item => item.exerciseId !== id);
      return novo;
    });
    if (editingId === id) {
      setNewExercise({ 
        name: '', 
        muscle: 'pernas', 
        reps: '', 
        sets: '', 
        weight: '', 
        restTime: '60',
        image: '' 
      });
      setEditingId(null);
      setShowForm(false);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNewExercise({ 
      name: '', 
      muscle: 'pernas', 
      reps: '', 
      sets: '', 
      weight: '', 
      restTime: '60',
      image: '' 
    });
    setShowForm(false);
  };

  return (
    <AppLayout>
      {/* Cabeçalho e seletor de dias fixos */}
      <div className="sticky top-0 z-20" style={{ backgroundColor: theme.colors.background.primary }}>
        <div className="px-6 pt-8 pb-2">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">Exercícios</h1>
              {/* Pills dos grupos musculares */}
              {(() => {
                let groups = [];
                if (showForm && newExercise.muscle) {
                  groups = [gruposMusculares[newExercise.muscle] || newExercise.muscle];
                } else if (exerciciosDoDia.length > 0) {
                  groups = [...new Set(exerciciosDoDia.map(ex => gruposMusculares[ex.muscle] || ex.muscle))];
                }
                return groups.length > 0 ? groups.map((muscle) => (
                  <span key={muscle} className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/60 text-blue-300 border border-blue-500/30 ml-1 align-middle" style={{lineHeight: '1.5', minWidth: 36, textAlign: 'center'}}>
                    {muscle}
                  </span>
                )) : (
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/60 text-blue-300 border border-blue-500/30 ml-1 align-middle" style={{lineHeight: '1.5', minWidth: 36, textAlign: 'center'}}>—</span>
                );
              })()}
            </div>
            <div className="flex gap-2">
              {!showForm && (
                <IconButton onClick={() => setShowForm(true)}>
                  <Plus className="w-5 h-5 text-white" />
                </IconButton>
              )}
              <IconButton onClick={() => navigate('/') }>
                <Plus className="w-5 h-5 transform rotate-45" />
              </IconButton>
            </div>
          </div>
          {/* Seletor de Dia */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {dias.map(day => (
              <button
                key={day}
                onClick={() => props.setSelectedDay(day)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                  props.selectedDay === day
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-gray-400 hover:text-white'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Formulário e lista de exercícios rolável */}
      <div className="flex-1 overflow-y-auto px-6 pt-2 pb-8">
        {/* Formulário de Adição/Edição */}
        {showForm && (
          <div ref={formRef} className="bg-white/5 rounded-2xl p-6 mb-6 border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">
                {editingId ? 'Editar Exercício' : 'Adicionar Exercício'}
              </h2>
              <button
                onClick={cancelEdit}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Plus className="w-5 h-5 transform rotate-45" />
              </button>
            </div>

            <div className="space-y-2">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Exercício</label>
                <input
                  type="text"
                  placeholder="Nome do exercício (ex: Stiff)"
                  value={newExercise.name}
                  onChange={(e) => setNewExercise(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Grupo muscular</label>
                <select
                  value={newExercise.muscle}
                  onChange={(e) => setNewExercise(prev => ({ ...prev, muscle: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 pr-8 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 appearance-none"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg fill=\'none\' stroke=\'%23999\' stroke-width=\'2\' viewBox=\'0 0 24 24\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.25em 1.25em' }}
                >
                  <option value="pernas">Pernas</option>
                  <option value="peito">Peito</option>
                  <option value="costas">Costas</option>
                  <option value="ombros">Ombros</option>
                  <option value="bracos">Braços</option>
                  <option value="abdomen">Abdômen</option>
                  <option value="cardio">Cardio</option>
                  <option value="funcional">Funcional</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Séries</label>
                  <input
                    type="text"
                    placeholder="Séries (ex: 3)"
                    value={newExercise.sets}
                    onChange={(e) => setNewExercise(prev => ({ ...prev, sets: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Repetições</label>
                  <input
                    type="text"
                    placeholder="Repetições (ex: 8-10)"
                    value={newExercise.reps}
                    onChange={(e) => setNewExercise(prev => ({ ...prev, reps: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Peso</label>
                  <input
                    type="text"
                    placeholder="Peso (ex: 20kg)"
                    value={newExercise.weight}
                    onChange={(e) => setNewExercise(prev => ({ ...prev, weight: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Descanso (seg)</label>
                  <input
                    type="text"
                    placeholder="Tempo de descanso em segundos (ex: 60)"
                    value={newExercise.restTime}
                    onChange={(e) => setNewExercise(prev => ({ ...prev, restTime: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              {/* Abas para imagem */}
              <div className="flex gap-2 mt-3 border-b border-white/10">
                <button
                  onClick={() => setImageInputType('url')}
                  className={`flex-1 px-3 py-2 text-sm font-medium transition-colors border-b-2 ${
                    imageInputType === 'url'
                      ? 'border-blue-500 text-blue-400 bg-white/5'
                      : 'border-transparent text-gray-400 bg-transparent'
                  }`}
                  style={{ borderRadius: '8px 8px 0 0' }}
                >
                  Link da Imagem
                </button>
                <button
                  onClick={() => setImageInputType('file')}
                  className={`flex-1 px-3 py-2 text-sm font-medium transition-colors border-b-2 ${
                    imageInputType === 'file'
                      ? 'border-blue-500 text-blue-400 bg-white/5'
                      : 'border-transparent text-gray-400 bg-transparent'
                  }`}
                  style={{ borderRadius: '8px 8px 0 0' }}
                >
                  Upload de Arquivo
                </button>
              </div>
              {imageInputType === 'url' ? (
                <input
                  type="url"
                  placeholder="URL da imagem (opcional)"
                  value={newExercise.image}
                  onChange={(e) => setNewExercise(prev => ({ ...prev, image: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 mt-2"
                />
              ) : (
                <div className="space-y-2 mt-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white hover:bg-white/20 transition-colors focus:outline-none focus:border-blue-500"
                  >
                    Escolher Imagem
                  </button>
                </div>
              )}
              {newExercise.image && (
                <div className="w-full h-32 rounded-lg overflow-hidden bg-white/5 mt-3">
                  <img 
                    src={newExercise.image} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      if (e.target) e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
              <PillButton onClick={handleSubmit} variant="primary" className="w-full mt-4">
                {editingId ? 'Salvar Alterações' : 'Adicionar Exercício'}
              </PillButton>
            </div>
          </div>
        )}
        {/* Lista de Exercícios */}
        <div className="space-y-4">
          {exerciciosDoDia.map(exercise => {
            const workoutItem = (props.workoutPlan[props.selectedDay] || []).find(item => item.exerciseId === exercise.id);
            const sets = workoutItem ? workoutItem.sets : 3;
            const parsedData = parseExerciseData(exercise);
            return (
              <div
                key={exercise.id}
                className={`bg-white/5 rounded-lg p-4 text-white flex gap-3 items-center cursor-pointer hover:bg-white/10 transition-colors group border border-white/10 ${editingId === exercise.id ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => handleEditClick(exercise)}
              >
                {exercise.image && (
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={exercise.image} 
                      alt={exercise.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        if (e.target) e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-lg truncate">{exercise.name}</div>
                  <div className="text-sm text-gray-400 truncate">
                    {sets} × {parsedData.reps || '8-10'} reps - {parsedData.weight || '0 kg'}
                  </div>
                  <div className="text-xs text-blue-400 mt-1 capitalize">{exercise.muscle}</div>
                </div>
                <button
                  className="ml-2 bg-white/10 hover:bg-white/20 text-gray-400 transition-opacity px-2 py-1 rounded-full focus:outline-none"
                  onClick={e => { e.stopPropagation(); handleDelete(exercise.id); }}
                  title="Deletar exercício"
                >
                  <Trash className="w-5 h-5" />
                </button>
              </div>
            );
          })}
          {exerciciosDoDia.length === 0 && (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Nenhum exercício para {props.selectedDay}</p>
              <p className="text-gray-500 text-sm mt-2">Toque no botão + para adicionar exercícios</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default function App() {
  // Estados e handlers principais centralizados aqui
  const getCurrentDay = () => {
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    return days[new Date().getDay()];
  };
  const [selectedDay, setSelectedDay] = useState(getCurrentDay());
  const [exercises, setExercises] = useState(exerciciosExemplo);
  const [workoutPlan, setWorkoutPlan] = useState({
    'Domingo': [
      { exerciseId: 1, sets: 4, completedSets: 0, restTime: 60 },
      { exerciseId: 2, sets: 4, completedSets: 0, restTime: 60 },
      { exerciseId: 3, sets: 4, completedSets: 0, restTime: 60 },
      { exerciseId: 4, sets: 3, completedSets: 0, restTime: 60 },
      { exerciseId: 5, sets: 4, completedSets: 0, restTime: 60 }
    ],
    'Segunda': [
      { exerciseId: 6, sets: 4, completedSets: 0, restTime: 60 },
      { exerciseId: 7, sets: 4, completedSets: 0, restTime: 60 },
      { exerciseId: 8, sets: 3, completedSets: 0, restTime: 60 },
      { exerciseId: 9, sets: 4, completedSets: 0, restTime: 60 },
      { exerciseId: 10, sets: 3, completedSets: 0, restTime: 60 },
      { exerciseId: 11, sets: 4, completedSets: 0, restTime: 60 }
    ],
    'Terça': [
      { exerciseId: 12, sets: 4, completedSets: 0, restTime: 60 },
      { exerciseId: 13, sets: 4, completedSets: 0, restTime: 60 },
      { exerciseId: 14, sets: 4, completedSets: 0, restTime: 60 },
      { exerciseId: 15, sets: 4, completedSets: 0, restTime: 60 },
      { exerciseId: 16, sets: 3, completedSets: 0, restTime: 60 },
      { exerciseId: 17, sets: 4, completedSets: 0, restTime: 60 }
    ],
    'Quarta': [],
    'Quinta': [
      { exerciseId: 18, sets: 4, completedSets: 0, restTime: 60 },
      { exerciseId: 19, sets: 4, completedSets: 0, restTime: 60 },
      { exerciseId: 20, sets: 3, completedSets: 0, restTime: 60 },
      { exerciseId: 21, sets: 4, completedSets: 0, restTime: 60 },
      { exerciseId: 22, sets: 3, completedSets: 0, restTime: 60 },
      { exerciseId: 23, sets: 4, completedSets: 0, restTime: 60 }
    ],
    'Sexta': [
      { exerciseId: 24, sets: 4, completedSets: 0, restTime: 60 },
      { exerciseId: 25, sets: 3, completedSets: 0, restTime: 60 },
      { exerciseId: 26, sets: 4, completedSets: 0, restTime: 60 },
      { exerciseId: 27, sets: 3, completedSets: 0, restTime: 60 },
      { exerciseId: 28, sets: 3, completedSets: 0, restTime: 60 }
    ],
    'Sábado': [
      { exerciseId: 29, sets: 4, completedSets: 0, restTime: 60 },
      { exerciseId: 30, sets: 3, completedSets: 0, restTime: 60 },
      { exerciseId: 31, sets: 3, completedSets: 0, restTime: 60 },
      { exerciseId: 32, sets: 3, completedSets: 0, restTime: 60 },
      { exerciseId: 33, sets: 3, completedSets: 0, restTime: 60 },
      { exerciseId: 34, sets: 4, completedSets: 0, restTime: 60 }
    ]
  });

  const handleAddExercise = (newExercise) => {
    setExercises(prev => [...prev, newExercise]);
  };
  const handleEditExercise = (edited) => {
    setExercises(prev => prev.map(ex => ex.id === edited.id ? edited : ex));
  };
  const handleDeleteExercise = (id) => {
    setExercises(prev => prev.filter(ex => ex.id !== id));
    setWorkoutPlan(prev => {
      const novo = {};
      for (const dia in prev) {
        novo[dia] = prev[dia].filter(item => item.exerciseId !== id);
      }
      return novo;
    });
  };

  return (
    <Routes>
      <Route path="/" element={
        <KanbanWorkoutApp
          exercises={exercises}
          setExercises={setExercises}
          workoutPlan={workoutPlan}
          setWorkoutPlan={setWorkoutPlan}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          handleAddExercise={handleAddExercise}
          handleEditExercise={handleEditExercise}
          handleDeleteExercise={handleDeleteExercise}
        />
      } />
      <Route path="/biblioteca" element={
        <BibliotecaScreen
          exercises={exercises}
          onAddExercise={handleAddExercise}
          onEditExercise={handleEditExercise}
          onDeleteExercise={handleDeleteExercise}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          workoutPlan={workoutPlan}
          setWorkoutPlan={setWorkoutPlan}
        />
      } />
    </Routes>
  );
}