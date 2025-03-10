CREATE TABLE fields (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    form_id UUID REFERENCES forms(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    description TEXT,
    field_type_id UUID REFERENCES field_types(id) ON DELETE CASCADE,
    is_required BOOLEAN DEFAULT FALSE,
    options TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);