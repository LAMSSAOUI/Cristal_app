CREATE DATABASE lesieur;
use lesieur;
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE demande (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    demande VARCHAR(255)  NOT NULL ,
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

INSERT INTO users (id , username, password, role, created_at) VALUES (2 , 'admin', 'admin_password_hash',  'admin', CURRENT_TIMESTAMP);

INSERT INTO users (username, password, role, created_at) VALUES ('user1', 'user1_password_hash', 'user', CURRENT_TIMESTAMP);

INSERT INTO users (username, password, role, created_at) VALUES ('user2', 'user2_password_hash',  'user', CURRENT_TIMESTAMP);

CREATE TABLE SAP (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    demande VARCHAR(255),
    date_activation VARCHAR(255),
    prenom_beneficiaire VARCHAR(255),
    direction_affectation VARCHAR(255),
    nom_beneficiaire VARCHAR(255),
    adresse_email VARCHAR(255),
    date_desactivation VARCHAR(255)
);
CREATE TABLE SAGE (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    demande VARCHAR(255),
    date_activation VARCHAR(255),
    prenom_beneficiaire VARCHAR(255),
    direction_affectation VARCHAR(255),
    nom_beneficiaire VARCHAR(255),
    adresse_email VARCHAR(255),
    date_desactivation VARCHAR(255)
);
ALTER TABLE demande ADD COLUMN isValide BOOLEAN DEFAULT FALSE;
