CREATE TABLE field_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO field_types (name, description)
VALUES 
    ('short_text', 'Pregunta de texto corto'),
    ('multiple_choice', 'Selección de una o más respuestas de una lista'),
    ('checkbox', 'Selección de una única respuesta entre varias');