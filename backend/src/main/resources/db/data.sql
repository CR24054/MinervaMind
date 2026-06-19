DELETE FROM sleep_records;
DELETE FROM moods;
DELETE FROM usuarios;

INSERT INTO usuarios (usuario, email, password_hash)
VALUES ('CR24054', 'cr24054@ues.edu.sv', '$2b$10$g7iEhUHRLzI/yeai8K723.R63FcsiSuYCr6s1HovoTf0a03Yod1.C')
ON CONFLICT DO NOTHING;

INSERT INTO usuarios (usuario, email, password_hash)
VALUES ('RM21062', 'rm21062@ues.edu.sv', '$2b$10$1FK.PXbazNyC9/ydTbPF.e3gX4HtyAfDROnp9z5L/K9asHiUrMupq')
ON CONFLICT DO NOTHING;

INSERT INTO usuarios (usuario, email, password_hash)
VALUES ('SH24001', 'sh24001@ues.edu.sv', '$2b$10$MkSrbYLsoXhJHZ5KIXv3ce0f3qdCYkSehq1EGN4J/udhagJnsqXPK')
ON CONFLICT DO NOTHING;

INSERT INTO usuarios (usuario, email, password_hash)
VALUES ('RS08021', 'rs08021@ues.edu.sv', '$2b$10$5V7A.v5jF6MPOG21uxXCT.d1NbyrRu9fN7W9DfajA4LDYyECIIev6')
ON CONFLICT DO NOTHING;