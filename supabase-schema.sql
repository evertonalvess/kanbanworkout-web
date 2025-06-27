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
('Agachamento livre', 'pernas', '8-10', 4, '20 kg', 60, '/Imagens/icon_kanbanworkout.png'),
('Leg press', 'pernas', '10-12', 4, '50 kg cada lado', 60, '/Imagens/icon_kanbanworkout.png'),
('Cadeira extensora', 'pernas', '12', 4, '68 kg', 60, '/Imagens/icon_kanbanworkout.png'),
('Afundo c/ halteres', 'pernas', '10 por perna', 3, '', 60, '/Imagens/icon_kanbanworkout.png'),
('Panturrilha em pé', 'pernas', '15', 4, '', 60, '/Imagens/icon_kanbanworkout.png'),
('Supino reto', 'peito', '8', 4, '≥ 22 kg', 60, '/Imagens/icon_kanbanworkout.png'),
('Supino inclinado', 'peito', '10', 4, '17 kg (livre) ou 27 kg (máquina)', 60, '/Imagens/icon_kanbanworkout.png'),
('Crossover', 'peito', '12', 3, 'Substitui crucifixo 65', 60, '/Imagens/icon_kanbanworkout.png'),
('Tríceps pulley', 'bracos', '12', 4, '25 kg ou nível 10', 60, '/Imagens/icon_kanbanworkout.png'),
('Mergulho', 'bracos', '10', 3, '', 60, '/Imagens/icon_kanbanworkout.png'),
('Abdominal meia-bola', 'abdomen', '15', 4, '', 60, '/Imagens/abdominal meia-bola.png'),
('Barra fixa', 'costas', 'máx.', 4, '20 kg lastro', 60, '/Imagens/icon_kanbanworkout.png'),
('Remada curvada', 'costas', '10', 4, '35 kg', 60, '/Imagens/icon_kanbanworkout.png'),
('Pulley frente', 'costas', '12', 4, '42 kg', 60, '/Imagens/icon_kanbanworkout.png'),
('Rosca direta', 'bracos', '10', 4, '14 kg', 60, '/Imagens/icon_kanbanworkout.png'),
('Rosca alternada', 'bracos', '12', 3, '12 kg', 60, '/Imagens/icon_kanbanworkout.png'),
('Abdominal paralela meia-bola', 'abdomen', '15', 4, '', 60, '/Imagens/abdominal paralela meia-bola.png'),
('Stiff', 'pernas', '10', 4, '≥ 40 kg', 60, '/Imagens/stiff.png'),
('Mesa flexora', 'pernas', '12', 4, '≥ 35 kg', 60, '/Imagens/mesa flexora.png'),
('Levantamento terra', 'pernas', '8', 3, '≥ 35 kg', 60, '/Imagens/levantamento terra.png'),
('Panturrilha sentada', 'pernas', '15', 4, '', 60, '/Imagens/panturrilha sentada.png'),
('Passada', 'pernas', '10 por perna', 3, '8 kg', 60, '/Imagens/passada.png'),
('Supino declinado', 'peito', '10 (24)', 4, '35 kg', 60, '/Imagens/icon_kanbanworkout.png'),
('Crucifixo reto', 'peito', '12', 3, '57 kg', 60, '/Imagens/icon_kanbanworkout.png'),
('Elevação lateral', 'ombros', '12', 4, '8 kg', 60, '/Imagens/icon_kanbanworkout.png'),
('Desenvolvimento c/ halteres', 'ombros', '10', 3, '18 kg', 60, '/Imagens/icon_kanbanworkout.png'),
('Encolhimento', 'ombros', '15', 3, '22 kg (halter)', 60, '/Imagens/icon_kanbanworkout.png'),
('Rosca direta barra reta (polia)', 'bracos', '10', 4, '28 kg', 60, '/Imagens/icon_kanbanworkout.png'),
('Rosca martelo (polia)', 'bracos', '12', 3, '21 kg', 60, '/Imagens/icon_kanbanworkout.png'),
('Rosca unilateral atrás do corpo (polia)', 'bracos', '12', 3, '12 kg', 60, '/Imagens/icon_kanbanworkout.png'),
('Tríceps francês', 'bracos', '12', 3, '', 60, '/Imagens/icon_kanbanworkout.png'),
('Tríceps banco', 'bracos', '10', 3, '', 60, '/Imagens/icon_kanbanworkout.png');

-- Inserir treinos completos
INSERT INTO workouts (day, exercise_id, sets, completed_sets, rest_time) VALUES
('Domingo', 1, 4, 0, 60),
('Domingo', 2, 4, 0, 60),
('Domingo', 3, 4, 0, 60),
('Domingo', 4, 3, 0, 60),
('Domingo', 5, 4, 0, 60),
('Segunda', 6, 4, 0, 60),
('Segunda', 7, 4, 0, 60),
('Segunda', 8, 3, 0, 60),
('Segunda', 9, 4, 0, 60),
('Segunda', 10, 3, 0, 60),
('Segunda', 11, 4, 0, 60),
('Terça', 12, 4, 0, 60),
('Terça', 13, 4, 0, 60),
('Terça', 14, 4, 0, 60),
('Terça', 15, 4, 0, 60),
('Terça', 16, 3, 0, 60),
('Terça', 17, 4, 0, 60),
('Quinta', 18, 4, 0, 60),
('Quinta', 19, 4, 0, 60),
('Quinta', 20, 3, 0, 60),
('Quinta', 21, 4, 0, 60),
('Quinta', 22, 3, 0, 60),
('Quinta', 17, 4, 0, 60),
('Sexta', 23, 4, 0, 60),
('Sexta', 24, 3, 0, 60),
('Sexta', 25, 4, 0, 60),
('Sexta', 26, 3, 0, 60),
('Sexta', 27, 3, 0, 60),
('Sábado', 28, 4, 0, 60),
('Sábado', 29, 3, 0, 60),
('Sábado', 30, 3, 0, 60),
('Sábado', 31, 3, 0, 60),
('Sábado', 32, 3, 0, 60),
('Sábado', 17, 4, 0, 60); 