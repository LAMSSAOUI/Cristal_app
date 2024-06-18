CREATE DATABASE lesieur;
use lesieur;
CREATE TABLE users (
    id INT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE demande (
    id INT PRIMARY KEY,
    user_id INT NOT NULL,
    demande VARCHAR(255)  NOT NULL,
    prenom_benificier VARCHAR(255) NOT NULL,
    fonction_benificier VARCHAR(255) NOT NULL,
    type_profil VARCHAR(255) NOT NULL,
    direction_affectation VARCHAR(255) NOT NULL,
    date_activation VARCHAR(255) NOT NULL,
    societe VARCHAR(255) NOT NULL,
    nom_benificier VARCHAR(255) NOT NULL,
    adresse_email VARCHAR(255) NOT NULL,
    date_desactivation VARCHAR(255) NOT NULL,
    application_demandee VARCHAR(255) NOT NULL,
    domaine VARCHAR(255) NOT NULL,
    role_fonctionnel VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users (username, password, role, created_at) VALUES ('admin', 'admin_password_hash',  'admin', CURRENT_TIMESTAMP);

INSERT INTO users (username, password, role, created_at) VALUES ('user1', 'user1_password_hash', 'user', CURRENT_TIMESTAMP);

INSERT INTO users (username, password, role, created_at) VALUES ('user2', 'user2_password_hash',  'user', CURRENT_TIMESTAMP);
