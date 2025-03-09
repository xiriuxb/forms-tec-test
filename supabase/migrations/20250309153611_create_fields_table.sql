CREATE TABLE fields (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    form_id UUID REFERENCES forms(id) ON DELETE CASCADE,
    field_text TEXT NOT NULL,
    qfield_type_id UUID REFERENCES field_types(id) ON DELETE CASCADE,
    is_required BOOLEAN DEFAULT FALSE,
    options TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);