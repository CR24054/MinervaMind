package com.minervamind.api.service;

import com.minervamind.api.dto.SleepRequestDTO;
import com.minervamind.api.dto.SleepResponseDTO;
import com.minervamind.api.dto.SleepSummaryResponseDTO;
import com.minervamind.api.dto.SleepRecommendationResponseDTO;
import com.minervamind.api.model.Sleep;
import com.minervamind.api.model.User;
import com.minervamind.api.repository.SleepRepository;
import com.minervamind.api.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class SleepService {

    private final SleepRepository sleepRepository;
    private final UserRepository userRepository;

    public SleepService(SleepRepository sleepRepository, UserRepository userRepository) {
        this.sleepRepository = sleepRepository;
        this.userRepository = userRepository;
    }

    // Crear registro de sueño
    public SleepResponseDTO save(SleepRequestDTO requestDTO) {

        User user = userRepository.findById(requestDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Sleep sleep = new Sleep();
        sleep.setBedTime(requestDTO.getBedTime());
        sleep.setWakeTime(requestDTO.getWakeTime());
        sleep.setHoursSlept(calculateHours(requestDTO));
        sleep.setSleepQuality(requestDTO.getSleepQuality());
        sleep.setNote(requestDTO.getNote());
        sleep.setDate(LocalDate.now());
        sleep.setUser(user);

        Sleep savedSleep = sleepRepository.save(sleep);

        return convertToResponseDTO(savedSleep);
    }

    // Obtener todos
    public List<SleepResponseDTO> findAll() {
        return StreamSupport.stream(
                        sleepRepository.findAll().spliterator(),
                        false)
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    // Buscar por ID
    public SleepResponseDTO findById(Long id) {

        Sleep sleep = sleepRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Sleep record not found"));

        return convertToResponseDTO(sleep);
    }

    // Actualizar
    public SleepResponseDTO update(Long id, SleepRequestDTO requestDTO) {

        Sleep sleep = sleepRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Sleep record not found"));

        sleep.setBedTime(requestDTO.getBedTime());
        sleep.setWakeTime(requestDTO.getWakeTime());
        sleep.setHoursSlept(calculateHours(requestDTO));
        sleep.setSleepQuality(requestDTO.getSleepQuality());
        sleep.setNote(requestDTO.getNote());

        Sleep updatedSleep = sleepRepository.save(sleep);

        return convertToResponseDTO(updatedSleep);
    }

    // Eliminar
    public void delete(Long id) {
        sleepRepository.deleteById(id);
    }

    // Historial por usuario
    public List<SleepResponseDTO> findByUser(Long userId) {

        return sleepRepository.findByUserIdUsuario(userId)
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    // Último registro
    public SleepResponseDTO latestSleep(Long userId) {

        Sleep sleep = sleepRepository
                .findTopByUserIdUsuarioOrderByDateDescIdDesc(userId)
                .orElseThrow(() ->
                        new RuntimeException("No sleep records found"));

        return convertToResponseDTO(sleep);
    }

    // Resumen
    public SleepSummaryResponseDTO summary(Long userId) {

        List<Sleep> records = sleepRepository.findByUserIdUsuario(userId);

        if (records.isEmpty()) {
            return new SleepSummaryResponseDTO(0.0, 0);
        }

        double averageHours = records.stream()
                .mapToDouble(Sleep::getHoursSlept)
                .average()
                .orElse(0);

        return new SleepSummaryResponseDTO(
                averageHours,
                records.size()
        );
    }

    // Recomendación basada en la última calidad de sueño
    public SleepRecommendationResponseDTO recommendation(Long userId) {

        Sleep sleep = sleepRepository
                .findTopByUserIdUsuarioOrderByDateDescIdDesc(userId)
                .orElseThrow(() ->
                        new RuntimeException("No sleep records found"));

        String recommendation;

        switch (sleep.getSleepQuality()) {

            case EXCELLENT:
                recommendation = "¡Excelente descanso! Aprovecha tu energía para tus actividades más importantes.";
                break;

            case GOOD:
                recommendation = "Buen descanso. Mantén tus hábitos de sueño actuales.";
                break;

            case REGULAR:
                recommendation = "Tu descanso fue regular. Intenta mantener un horario de sueño más constante.";
                break;

            case BAD:
                recommendation = "Dormiste poco o mal. Considera ajustar tu rutina nocturna y descansar más esta noche.";
                break;

            default:
                recommendation = "Continúa registrando tu sueño para obtener recomendaciones personalizadas.";
        }

        return new SleepRecommendationResponseDTO(
                sleep.getSleepQuality().name(),
                recommendation
        );
    }

    // Calcula horas dormidas a partir de bedTime y wakeTime si no vienen directo
    private Double calculateHours(SleepRequestDTO requestDTO) {

        if (requestDTO.getHoursSlept() != null) {
            return requestDTO.getHoursSlept();
        }

        if (requestDTO.getBedTime() != null && requestDTO.getWakeTime() != null) {

            int bedMinutes = requestDTO.getBedTime().getHour() * 60 + requestDTO.getBedTime().getMinute();
            int wakeMinutes = requestDTO.getWakeTime().getHour() * 60 + requestDTO.getWakeTime().getMinute();

            int diffMinutes;
            if (wakeMinutes > bedMinutes) {
                diffMinutes = wakeMinutes - bedMinutes;
            } else {
                diffMinutes = (24 * 60 - bedMinutes) + wakeMinutes;
            }

            return diffMinutes / 60.0;
        }

        return 0.0;
        
    }

    // Conversión Entity -> DTO
    private SleepResponseDTO convertToResponseDTO(Sleep sleep) {

        return new SleepResponseDTO(
                sleep.getId(),
                sleep.getBedTime(),
                sleep.getWakeTime(),
                sleep.getHoursSlept(),
                sleep.getSleepQuality(),
                sleep.getNote(),
                sleep.getDate(),
                sleep.getUser().getUsuario()
        );
    }
}
