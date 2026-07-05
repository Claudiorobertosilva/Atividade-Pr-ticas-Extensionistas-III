```sql
-- =====================================
-- BANCO DE DADOS
-- Sistema de Gestão de Consultas
-- =====================================

CREATE DATABASE IF NOT EXISTS sistema_consultas;

USE sistema_consultas;

-- ==========================
-- TABELA DE USUÁRIOS
-- ==========================

CREATE TABLE usuarios(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL,
    perfil VARCHAR(30) NOT NULL
);

-- ==========================
-- TABELA DE ESPECIALIDADES
-- ==========================

CREATE TABLE especialidades(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

-- ==========================
-- TABELA DE MÉDICOS
-- ==========================

CREATE TABLE medicos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    crm VARCHAR(20) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    email VARCHAR(100),
    id_especialidade INT,

    FOREIGN KEY(id_especialidade)
    REFERENCES especialidades(id)
);

-- ==========================
-- TABELA DE PACIENTES
-- ==========================

CREATE TABLE pacientes(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    email VARCHAR(100),
    data_nascimento DATE
);

-- ==========================
-- TABELA DE CONSULTAS
-- ==========================

CREATE TABLE consultas(
    id INT AUTO_INCREMENT PRIMARY KEY,
    data DATE NOT NULL,
    hora TIME NOT NULL,
    status VARCHAR(30) DEFAULT 'Agendada',

    id_paciente INT NOT NULL,
    id_medico INT NOT NULL,

    FOREIGN KEY(id_paciente)
    REFERENCES pacientes(id),

    FOREIGN KEY(id_medico)
    REFERENCES medicos(id)
);

-- ==========================
-- DADOS INICIAIS
-- ==========================

INSERT INTO usuarios(nome,email,senha,perfil)
VALUES
('Administrador','admin@saude.com','123456','Administrador');

INSERT INTO especialidades(nome)
VALUES
('Clínico Geral'),
('Cardiologia'),
('Pediatria'),
('Dermatologia'),
('Ortopedia');

INSERT INTO medicos(nome,crm,telefone,email,id_especialidade)
VALUES
('Dr. João Silva','CRM12345','(49)99999-1111','joao@saude.com',1),
('Dra. Maria Souza','CRM67890','(49)99999-2222','maria@saude.com',2);

INSERT INTO pacientes(nome,cpf,telefone,email,data_nascimento)
VALUES
('Carlos Pereira','111.111.111-11','(49)99999-3333','carlos@email.com','1990-05-20'),
('Ana Oliveira','222.222.222-22','(49)99999-4444','ana@email.com','1988-11-15');

INSERT INTO consultas(data,hora,status,id_paciente,id_medico)
VALUES
('2026-07-10','09:00:00','Agendada',1,1),
('2026-07-11','14:30:00','Agendada',2,2);
```
