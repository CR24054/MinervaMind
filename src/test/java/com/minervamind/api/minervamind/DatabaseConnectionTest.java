
package com.minervamind.api.minervamind;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Disabled;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import static org.junit.jupiter.api.Assertions.*;

@Disabled("Test de integración con PostgreSQL - requiere BD configurada localmente")
class DatabaseConnectionTest {

	@Test
	@DisplayName("Debe validar conexión a la base de datos PostgreSQL")
	void testDatabaseConnection() throws SQLException {
		String url = "jdbc:postgresql://localhost:5432/minervamind";
		String user = "postgres";
		String password = "soydaniel13";
		
		System.out.println("\n=== VALIDACION DE CONEXION A BASE DE DATOS ===");
		System.out.println("URL: " + url);
		System.out.println("Usuario: " + user);
		System.out.println();
		
		try (Connection connection = DriverManager.getConnection(url, user, password)) {
			assertNotNull(connection, "La conexion a la base de datos no debe ser nula");
			assertFalse(connection.isClosed(), "La conexion no debe estar cerrada");
			assertTrue(connection.isValid(2), "La conexion no es valida");
			
			System.out.println("SUCCESS: Conexion establecida");
			System.out.println("URL: " + connection.getMetaData().getURL());
			System.out.println("Usuario: " + connection.getMetaData().getUserName());
			System.out.println("Driver: " + connection.getMetaData().getDriverName());
			System.out.println("Version BD: " + connection.getMetaData().getDatabaseProductVersion());
			System.out.println("\nVALIDACION EXITOSA - La base de datos esta lista!\n");
		} catch (SQLException e) {
			fail("Error al conectar a la base de datos: " + e.getMessage());
		}
	}
}
