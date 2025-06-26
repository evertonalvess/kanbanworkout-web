import React, { useState, useEffect, useRef } from 'react';
import { Plus, Info, Check, Play, Pause, SkipForward, Clock } from 'lucide-react';

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
  // Segunda-feira - Peito e Tríceps
  { id: 1, name: 'Supino Reto', muscle: 'peito', reps: '8-12', weight: '60 kg', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center' },
  { id: 2, name: 'Supino Inclinado com Halteres', muscle: 'peito', reps: '10-12', weight: '30 kg', image: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=300&h=200&fit=crop&crop=center' },
  { id: 3, name: 'Flexão de Braço na Paralela', muscle: 'bracos', reps: '8-10', weight: 'Peso corporal', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center' },
  { id: 4, name: 'Extensão de Tríceps na Polia', muscle: 'bracos', reps: '12-15', weight: '25 kg', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center' },
  
  // Terça-feira - Costas e Bíceps
  { id: 5, name: 'Puxada na Polia Alta', muscle: 'costas', reps: '10-12', weight: '55 kg', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&h=200&fit=crop&crop=center' },
  { id: 6, name: 'Remada Curvada com Barra', muscle: 'costas', reps: '8-10', weight: '50 kg', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&h=200&fit=crop&crop=center' },
  { id: 7, name: 'Rosca Direta com Barra', muscle: 'bracos', reps: '10-12', weight: '35 kg', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center' },
  { id: 8, name: 'Rosca Martelo', muscle: 'bracos', reps: '12-15', weight: '15 kg', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center' },
  
  // Quarta-feira - Pernas
  { id: 9, name: 'Agachamento com Barra', muscle: 'pernas', reps: '8-10', weight: '80 kg', image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=300&h=200&fit=crop&crop=center' },
  { id: 10, name: 'Levantamento Terra Romeno', muscle: 'pernas', reps: '10-12', weight: '70 kg', image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=200&fit=crop&crop=center' },
  { id: 11, name: 'Flexão de Pernas Sentado', muscle: 'pernas', reps: '12-15', weight: '35 kg', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300&h=200&fit=crop&crop=center' },
  { id: 12, name: 'Extensão de Pernas', muscle: 'pernas', reps: '15-20', weight: '40 kg', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300&h=200&fit=crop&crop=center' },
  
  // Quinta-feira - Ombros e Trapézio
  { id: 13, name: 'Desenvolvimento Militar', muscle: 'ombros', reps: '8-10', weight: '45 kg', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center' },
  { id: 14, name: 'Elevação Lateral com Halteres', muscle: 'ombros', reps: '12-15', weight: '12 kg', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center' },
  { id: 15, name: 'Elevação Frontal', muscle: 'ombros', reps: '10-12', weight: '15 kg', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center' },
  { id: 16, name: 'Encolhimento de Ombros', muscle: 'ombros', reps: '12-15', weight: '25 kg', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center' },
  
  // Sexta-feira - Abdômen e Core
  { id: 17, name: 'Abdominal Crunch', muscle: 'abdomen', reps: '20-25', weight: 'Peso corporal', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center' },
  { id: 18, name: 'Prancha', muscle: 'abdomen', reps: '60 segundos', weight: 'Peso corporal', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center' },
  { id: 19, name: 'Russian Twist', muscle: 'abdomen', reps: '20 cada lado', weight: '5 kg', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center' },
  { id: 20, name: 'Elevação de Pernas', muscle: 'abdomen', reps: '15-20', weight: 'Peso corporal', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center' },
  
  // Sábado - Cardio e Funcional
  { id: 21, name: 'Corrida na Esteira', muscle: 'cardio', reps: '30 minutos', weight: 'Peso corporal', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center' },
  { id: 22, name: 'Burpees', muscle: 'funcional', reps: '10-15', weight: 'Peso corporal', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center' },
  { id: 23, name: 'Mountain Climbers', muscle: 'funcional', reps: '30 segundos', weight: 'Peso corporal', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center' },
  { id: 24, name: 'Jumping Jacks', muscle: 'funcional', reps: '50', weight: 'Peso corporal', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center' }
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

const WorkoutCardView = ({ exercise, sets, completedSets, onSetComplete, onStartExercise }) => {
  const progress = sets > 0 ? (completedSets / sets) * 100 : 0;
  const isCompleted = completedSets === sets && sets > 0;

  return (
    <div className="bg-white/6 backdrop-blur-sm rounded-2xl p-4 mb-3 border border-white/10">
      <div className="flex gap-4 mb-3">
        {/* Imagem do exercício */}
        {exercise.image && (
          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
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
                onClick={() => onSetComplete(exercise.id, index)}
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
        
        {!isCompleted && sets > 0 && (
          <PillButton onClick={() => onStartExercise(exercise)} variant="primary">
            Continuar
          </PillButton>
        )}
      </div>
    </div>
  );
};

const RestTimer = ({ duration, onComplete, onAddTime, onSkip }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft, onComplete]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-2xl p-8 text-center border border-white/10">
        <h3 className="text-white text-xl font-semibold mb-4">Tempo de Descanso</h3>
        
        <div className="flex justify-center mb-6">
          <ProgressRing progress={((duration - timeLeft) / duration) * 100} />
        </div>
        
        <div className="text-4xl font-bold text-white mb-6">
          {formatTime(timeLeft)}
        </div>
        
        <div className="flex gap-3 justify-center">
          <IconButton onClick={onAddTime}>
            <Plus className="w-5 h-5" />
          </IconButton>
          <IconButton onClick={() => setIsRunning(!isRunning)}>
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </IconButton>
          <IconButton onClick={onSkip}>
            <SkipForward className="w-5 h-5" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

const ExerciseLibrary = ({ exercises, onAddExercise, onClose }) => {
  const [newExercise, setNewExercise] = useState({ name: '', muscle: 'pernas', reps: '8-10', weight: '0 kg', image: '' });
  const [imageInputType, setImageInputType] = useState('url'); // 'url' ou 'file'
  const fileInputRef = useRef(null);

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
      onAddExercise({
        ...newExercise,
        id: Date.now()
      });
      setNewExercise({ name: '', muscle: 'pernas', reps: '8-10', weight: '0 kg', image: '' });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md mx-auto border border-white/10 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-xl font-semibold">Biblioteca de Exercícios</h2>
          <IconButton onClick={onClose}>
            <Plus className="w-5 h-5 transform rotate-45" />
          </IconButton>
        </div>

        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Nome do exercício"
            value={newExercise.name}
            onChange={(e) => setNewExercise(prev => ({ ...prev, name: e.target.value }))}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />
          
          <select
            value={newExercise.muscle}
            onChange={(e) => setNewExercise(prev => ({ ...prev, muscle: e.target.value }))}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
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

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Repetições"
              value={newExercise.reps}
              onChange={(e) => setNewExercise(prev => ({ ...prev, reps: e.target.value }))}
              className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Peso"
              value={newExercise.weight}
              onChange={(e) => setNewExercise(prev => ({ ...prev, weight: e.target.value }))}
              className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Seletor de tipo de imagem */}
          <div className="flex gap-2">
            <button
              onClick={() => setImageInputType('url')}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                imageInputType === 'url' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 text-gray-400'
              }`}
            >
              Link da Imagem
            </button>
            <button
              onClick={() => setImageInputType('file')}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                imageInputType === 'file' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 text-gray-400'
              }`}
            >
              Upload de Arquivo
            </button>
          </div>

          {/* Campo de imagem */}
          {imageInputType === 'url' ? (
            <input
              type="url"
              placeholder="URL da imagem (opcional)"
              value={newExercise.image}
              onChange={(e) => setNewExercise(prev => ({ ...prev, image: e.target.value }))}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          ) : (
            <div className="space-y-2">
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

          {/* Preview da imagem */}
          {newExercise.image && (
            <div className="w-full h-32 rounded-lg overflow-hidden bg-white/5">
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

          <PillButton onClick={handleSubmit} variant="primary" className="w-full">
            Adicionar Exercício
          </PillButton>
        </div>

        <div className="space-y-2 max-h-60 overflow-y-auto">
          {exercises.map(exercise => (
            <div key={exercise.id} className="bg-white/5 rounded-lg p-3 text-white flex gap-3">
              {exercise.image && (
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
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
                <div className="font-medium truncate">{exercise.name}</div>
                <div className="text-sm text-gray-400 truncate">{exercise.reps} reps - {exercise.weight}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Componente Principal do App
const KanbanWorkoutApp = () => {
  const getCurrentDay = () => {
    const days = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    return days[new Date().getDay()];
  };

  const [selectedDay, setSelectedDay] = useState(getCurrentDay());
  const [exercises, setExercises] = useState(exerciciosExemplo);
  const [workoutPlan, setWorkoutPlan] = useState({
    'Segunda-feira': [
      { exerciseId: 1, sets: 4, completedSets: 0 },
      { exerciseId: 2, sets: 3, completedSets: 0 },
      { exerciseId: 3, sets: 3, completedSets: 0 },
      { exerciseId: 4, sets: 3, completedSets: 0 }
    ],
    'Terça-feira': [
      { exerciseId: 5, sets: 4, completedSets: 0 },
      { exerciseId: 6, sets: 3, completedSets: 0 },
      { exerciseId: 7, sets: 3, completedSets: 0 },
      { exerciseId: 8, sets: 3, completedSets: 0 }
    ],
    'Quarta-feira': [
      { exerciseId: 9, sets: 4, completedSets: 0 },
      { exerciseId: 10, sets: 4, completedSets: 0 },
      { exerciseId: 11, sets: 3, completedSets: 0 },
      { exerciseId: 12, sets: 3, completedSets: 0 }
    ],
    'Quinta-feira': [
      { exerciseId: 13, sets: 4, completedSets: 0 },
      { exerciseId: 14, sets: 3, completedSets: 0 },
      { exerciseId: 15, sets: 3, completedSets: 0 },
      { exerciseId: 16, sets: 3, completedSets: 0 }
    ],
    'Sexta-feira': [
      { exerciseId: 17, sets: 3, completedSets: 0 },
      { exerciseId: 18, sets: 3, completedSets: 0 },
      { exerciseId: 19, sets: 3, completedSets: 0 },
      { exerciseId: 20, sets: 3, completedSets: 0 }
    ],
    'Sábado': [
      { exerciseId: 21, sets: 1, completedSets: 0 },
      { exerciseId: 22, sets: 3, completedSets: 0 },
      { exerciseId: 23, sets: 3, completedSets: 0 },
      { exerciseId: 24, sets: 3, completedSets: 0 }
    ],
    'Domingo': []
  });
  
  const [showLibrary, setShowLibrary] = useState(false);
  const [restTimer, setRestTimer] = useState(null);

  const todaysWorkout = workoutPlan[selectedDay] || [];

  const handleSetComplete = (exerciseId, setIndex) => {
    setWorkoutPlan(prev => ({
      ...prev,
      [selectedDay]: prev[selectedDay].map(item => 
        item.exerciseId === exerciseId 
          ? { ...item, completedSets: Math.max(setIndex + 1, item.completedSets) }
          : item
      )
    }));

    // Iniciar cronômetro de descanso após completar uma série
    setRestTimer({
      duration: 60, // 1 minuto
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
        [selectedDay]: [...(prev[selectedDay] || []), { exerciseId: exercise.id, sets: 3, completedSets: 0 }]
      }));
    }
  };

  const handleAddExercise = (newExercise) => {
    setExercises(prev => [...prev, newExercise]);
  };

  const getExerciseById = (id) => exercises.find(ex => ex.id === id);

  return (
    <div style={{ backgroundColor: theme.colors.background.primary }} className="min-h-screen text-white">
      {/* Cabeçalho */}
      <div className="px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Treinos</h1>
          <IconButton onClick={() => setShowLibrary(true)}>
            <Plus className="w-5 h-5 text-white" />
          </IconButton>
        </div>

        {/* Seletor de Dia */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {Object.keys(workoutPlan).map(day => (
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

      {/* Lista de Treinos */}
      <div className="px-6">
        <div className="space-y-4">
          {todaysWorkout.map((workoutItem, index) => {
            const exercise = getExerciseById(workoutItem.exerciseId);
            if (!exercise) return null;
            
            return (
              <WorkoutCardView
                key={`${exercise.id}-${index}`}
                exercise={exercise}
                sets={workoutItem.sets}
                completedSets={workoutItem.completedSets}
                onSetComplete={handleSetComplete}
                onStartExercise={handleStartExercise}
              />
            );
          })}
          
          {todaysWorkout.length === 0 && (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Nenhum exercício planejado para {selectedDay}</p>
              <p className="text-gray-500 text-sm mt-2">Toque no botão + para adicionar exercícios</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal da Biblioteca de Exercícios */}
      {showLibrary && (
        <ExerciseLibrary
          exercises={exercises}
          onAddExercise={handleAddExercise}
          onClose={() => setShowLibrary(false)}
        />
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
    </div>
  );
};

export default KanbanWorkoutApp;