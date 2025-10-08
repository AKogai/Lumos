CREATE TABLE memorials (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255),
    born_date DATE NOT NULL,
    death_date DATE NOT NULL,
    biography TEXT,
    obituary TEXT,
    profile_image_url VARCHAR(500),
    place_of_birth VARCHAR(255),
    place_of_death VARCHAR(255),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);
