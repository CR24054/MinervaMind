
DELETE FROM usuarios;


INSERT INTO usuarios (usuario, email, password_hash) VALUES ('CR24054', 'cr24054@ues.edu.sv', 'contrasena594') ON CONFLICT DO NOTHING;
INSERT INTO usuarios (usuario, email, password_hash) VALUES ('RM21062', 'rm21062@ues.edu.sv', 'contrasena594') ON CONFLICT DO NOTHING;
INSERT INTO usuarios (usuario, email, password_hash) VALUES ('SH24001', 'sh24001@ues.edu.sv', 'contrasena594') ON CONFLICT DO NOTHING;
INSERT INTO usuarios (usuario, email, password_hash) VALUES ('RS08021', 'rs08021@ues.edu.sv', 'contrasena594') ON CONFLICT DO NOTHING;


