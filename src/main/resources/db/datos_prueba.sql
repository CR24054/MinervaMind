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

-- Registros de sueño para CR24054 (id=1)
INSERT INTO sleep_records (bed_time, wake_time, hours_slept, sleep_quality, note, date, id_usuario)
VALUES ('22:30', '06:30', 8.0, 'EXCELLENT', 'Descansé muy bien', '2026-06-10', 1);

INSERT INTO sleep_records (bed_time, wake_time, hours_slept, sleep_quality, note, date, id_usuario)
VALUES ('23:45', '07:00', 7.25, 'GOOD', 'Buen descanso', '2026-06-11', 1);

INSERT INTO sleep_records (bed_time, wake_time, hours_slept, sleep_quality, note, date, id_usuario)
VALUES ('01:00', '07:30', 6.5, 'REGULAR', 'Me acosté tarde estudiando', '2026-06-12', 1);

INSERT INTO sleep_records (bed_time, wake_time, hours_slept, sleep_quality, note, date, id_usuario)
VALUES ('02:30', '06:00', 3.5, 'BAD', 'Noche de exámenes', '2026-06-13', 1);

INSERT INTO sleep_records (bed_time, wake_time, hours_slept, sleep_quality, note, date, id_usuario)
VALUES ('22:00', '07:00', 9.0, 'EXCELLENT', 'Me recuperé bien', '2026-06-14', 1);

-- Registros de sueño para RS08021 (id=4)
INSERT INTO sleep_records (bed_time, wake_time, hours_slept, sleep_quality, note, date, id_usuario)
VALUES ('23:00', '07:00', 8.0, 'GOOD', 'Noche tranquila', '2026-06-10', 4);

INSERT INTO sleep_records (bed_time, wake_time, hours_slept, sleep_quality, note, date, id_usuario)
VALUES ('00:30', '06:30', 6.0, 'REGULAR', 'Trabajando en el proyecto', '2026-06-11', 4);

INSERT INTO sleep_records (bed_time, wake_time, hours_slept, sleep_quality, note, date, id_usuario)
VALUES ('22:30', '06:30', 8.0, 'EXCELLENT', 'Excelente descanso', '2026-06-12', 4);

-- Registros de ánimo para CR24054 (id=1)
INSERT INTO moods (mood_type, stress_level, energy_level, note, date, id_usuario)
VALUES ('MOTIVATED', 3, 8, 'Listo para trabajar', '2026-06-10', 1);

INSERT INTO moods (mood_type, stress_level, energy_level, note, date, id_usuario)
VALUES ('STRESSED', 8, 4, 'Mucha carga académica', '2026-06-11', 1);

INSERT INTO moods (mood_type, stress_level, energy_level, note, date, id_usuario)
VALUES ('TIRED', 6, 3, 'Trasnochado por el proyecto', '2026-06-12', 1);

INSERT INTO moods (mood_type, stress_level, energy_level, note, date, id_usuario)
VALUES ('ANXIOUS', 9, 2, 'Día de entrega', '2026-06-13', 1);

INSERT INTO moods (mood_type, stress_level, energy_level, note, date, id_usuario)
VALUES ('HAPPY', 2, 9, 'Entrega exitosa', '2026-06-14', 1);

-- Registros de ánimo para RS08021 (id=4)
INSERT INTO moods (mood_type, stress_level, energy_level, note, date, id_usuario)
VALUES ('CALM', 2, 7, 'Día productivo', '2026-06-10', 4);

INSERT INTO moods (mood_type, stress_level, energy_level, note, date, id_usuario)
VALUES ('MOTIVATED', 4, 8, 'Avanzando en el frontend', '2026-06-11', 4);

INSERT INTO moods (mood_type, stress_level, energy_level, note, date, id_usuario)
VALUES ('STRESSED', 7, 5, 'Bugs en producción', '2026-06-12', 4);

INSERT INTO moods (mood_type, stress_level, energy_level, note, date, id_usuario)
VALUES ('HAPPY', 1, 9, 'Todo funcionando', '2026-06-14', 4);
