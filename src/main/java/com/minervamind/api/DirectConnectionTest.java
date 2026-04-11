package com.minervamind.api;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class DirectConnectionTest {
    public static void main(String[] args) {
        String postgresUrl = "jdbc:postgresql://localhost:5432/postgres";
        String minervamindUrl = "jdbc:postgresql://localhost:5432/minervamind";
        String user = "postgres";
        String password = "12345";
        
        try {
            System.out.println("=== PASO 1: Conectando a PostgreSQL (servidor) ===");
            System.out.println("URL: " + postgresUrl);
            System.out.println("Usuario: " + user);
            System.out.println();
            
            Connection connServer = DriverManager.getConnection(postgresUrl, user, password);
            System.out.println("✓ Conexión al servidor exitosa");
            System.out.println("✓ Driver: " + connServer.getMetaData().getDriverName());
            System.out.println("✓ Versión: " + connServer.getMetaData().getDatabaseProductVersion());
            System.out.println();
            
            // Intentar crear la BD
            System.out.println("=== PASO 2: Verificando/Creando base de datos 'minervamind' ===");
            try (Statement stmt = connServer.createStatement()) {
                // Verificar si la BD ya existe
                stmt.executeQuery("SELECT 1 FROM pg_database WHERE datname='minervamind'");
                System.out.println("✓ Base de datos 'minervamind' ya existe");
            } catch (SQLException e) {
                // Intentar crear
                try (Statement stmt = connServer.createStatement()) {
                    stmt.executeUpdate("CREATE DATABASE minervamind");
                    System.out.println("✓ Base de datos 'minervamind' creada");
                }
            }
            
            connServer.close();
            
            // Ahora conectar a la BD minervamind
            System.out.println();
            System.out.println("=== PASO 3: Conectando a 'minervamind' ===");
            System.out.println("URL: " + minervamindUrl);
            System.out.println();
            
            Connection connMinervamind = DriverManager.getConnection(minervamindUrl, user, password);
            System.out.println("✓ ¡Conexión a 'minervamind' exitosa!");
            System.out.println("✓ URL de BD: " + connMinervamind.getMetaData().getURL());
            System.out.println("✓ Usuario: " + connMinervamind.getMetaData().getUserName());
            System.out.println("✓ Driver: " + connMinervamind.getMetaData().getDriverName());
            System.out.println("✓ Versión BD: " + connMinervamind.getMetaData().getDatabaseProductVersion());
            
            connMinervamind.close();
            System.out.println();
            System.out.println("✓✓✓ ¡CONEXIÓN VALIDADA CON ÉXITO! ✓✓✓");
            
        } catch (SQLException e) {
            System.out.println("✗ Error:");
            System.out.println("  SQLState: " + e.getSQLState());
            System.out.println("  Error Code: " + e.getErrorCode());
            System.out.println("  Mensaje: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
