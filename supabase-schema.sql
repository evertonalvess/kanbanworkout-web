-- Criar tabela de exercícios
CREATE TABLE exercises (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  muscle TEXT NOT NULL,
  reps TEXT,
  sets INTEGER DEFAULT 3,
  weight TEXT,
  rest_time INTEGER DEFAULT 60,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de treinos por dia
CREATE TABLE workouts (
  id BIGSERIAL PRIMARY KEY,
  day TEXT NOT NULL,
  exercise_id BIGINT REFERENCES exercises(id) ON DELETE CASCADE,
  sets INTEGER DEFAULT 3,
  completed_sets INTEGER DEFAULT 0,
  rest_time INTEGER DEFAULT 60,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX idx_exercises_muscle ON exercises(muscle);
CREATE INDEX idx_workouts_day ON workouts(day);
CREATE INDEX idx_workouts_exercise_id ON workouts(exercise_id);

-- Função para atualizar o campo updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar updated_at
CREATE TRIGGER update_exercises_updated_at BEFORE UPDATE ON exercises
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workouts_updated_at BEFORE UPDATE ON workouts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Inserir dados de exemplo (opcional)
INSERT INTO exercises (name, muscle, reps, sets, weight, rest_time, image) VALUES
('Agachamento livre', 'pernas', '8-10', 4, '20 kg', 60, 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=300&h=200&fit=crop&crop=center'),
('Leg press', 'pernas', '10-12', 4, '50 kg cada lado', 60, 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300&h=200&fit=crop&crop=center'),
('Cadeira extensora', 'pernas', '12', 4, '68 kg', 60, '/Imagens/cadeira_flexora.png'),
('Supino reto', 'peito', '8', 4, '≥ 22 kg', 60, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center'),
('Barra fixa', 'costas', 'máx.', 4, '20 kg lastro', 60, 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&h=200&fit=crop&crop=center'),
('Stiff', 'pernas', '10', 4, '≥ 40 kg', 60, '/Imagens/Stiff.png'),
('Mesa flexora', 'pernas', '12', 4, '≥ 35 kg', 60, '/Imagens/mesa_flexora.png'),
('Levantamento terra', 'pernas', '8', 3, '≥ 35 kg', 60, '/Imagens/Levantamento terra.png'),
('Abdominal paralela meia-bola', 'abdomen', '15', 4, 'Peso corporal', 60, '/Imagens/Abdominal_paralela_meia_bola.png');

-- Inserir treinos de exemplo
INSERT INTO workouts (day, exercise_id, sets, completed_sets, rest_time) VALUES
('Domingo', 1, 4, 0, 60),
('Domingo', 2, 4, 0, 60),
('Domingo', 3, 4, 0, 60),
('Segunda', 4, 4, 0, 60),
('Terça', 5, 4, 0, 60),
('Quinta', 6, 4, 0, 60),
('Quinta', 7, 4, 0, 60),
('Quinta', 8, 3, 0, 60); 