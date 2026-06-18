package com.minervamind.api.service;

import com.minervamind.api.dto.MoodRequestDTO;
import com.minervamind.api.dto.MoodResponseDTO;
import com.minervamind.api.dto.RecommendationResponseDTO;
import com.minervamind.api.dto.SummaryResponseDTO;
import com.minervamind.api.model.Mood;
import com.minervamind.api.model.User;
import com.minervamind.api.repository.MoodRepository;
import com.minervamind.api.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class MoodService {

    private final MoodRepository moodRepository;
    private final UserRepository userRepository;

    public MoodService(MoodRepository moodRepository, UserRepository userRepository) {
        this.moodRepository = moodRepository;
        this.userRepository = userRepository;
    }

    // Crear registro emocional
    public MoodResponseDTO save(MoodRequestDTO requestDTO) {

        User user = userRepository.findById(requestDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Mood mood = new Mood();
        mood.setMoodType(requestDTO.getMoodType());
        mood.setStressLevel(requestDTO.getStressLevel());
        mood.setEnergyLevel(requestDTO.getEnergyLevel());
        mood.setNote(requestDTO.getNote());
        mood.setDate(LocalDate.now());
        mood.setUser(user);

        Mood savedMood = moodRepository.save(mood);

        return convertToResponseDTO(savedMood);
    }

    // Obtener todos los registros
    public List<MoodResponseDTO> findAll() {
        return StreamSupport.stream(
                        moodRepository.findAll().spliterator(),
                        false)
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    // Buscar por ID
    public MoodResponseDTO findById(Long id) {

        Mood mood = moodRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Mood record not found"));

        return convertToResponseDTO(mood);
    }

    // Actualizar
    public MoodResponseDTO update(Long id, MoodRequestDTO requestDTO) {

        Mood mood = moodRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Mood not found"));

        mood.setMoodType(requestDTO.getMoodType());
        mood.setStressLevel(requestDTO.getStressLevel());
        mood.setEnergyLevel(requestDTO.getEnergyLevel());
        mood.setNote(requestDTO.getNote());

        Mood updatedMood = moodRepository.save(mood);

        return convertToResponseDTO(updatedMood);
    }

    // Eliminar
    public void delete(Long id) {
        moodRepository.deleteById(id);
    }

    // Historial por usuario
    public List<MoodResponseDTO> findByUser(Long userId) {

        return moodRepository.findByUserIdUsuario(userId)
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    // Último estado emocional
    public MoodResponseDTO latestMood(Long userId) {

        Mood mood = moodRepository
        .findTopByUserIdUsuarioOrderByDateDescIdDesc(userId)
                .orElseThrow(() ->
                        new RuntimeException("No mood records found"));

        return convertToResponseDTO(mood);
    }

    // Resumen emocional
    public SummaryResponseDTO summary(Long userId) {

        List<Mood> moods = moodRepository.findByUserIdUsuario(userId);

        if (moods.isEmpty()) {
            return new SummaryResponseDTO(0.0, 0.0, 0);
        }

        double averageStress = moods.stream()
                .mapToInt(Mood::getStressLevel)
                .average()
                .orElse(0);

        double averageEnergy = moods.stream()
                .mapToInt(Mood::getEnergyLevel)
                .average()
                .orElse(0);

        return new SummaryResponseDTO(
                averageStress,
                averageEnergy,
                moods.size()
        );
    }

    // Recomendación basada en el último estado emocional
    public RecommendationResponseDTO recommendation(Long userId) {

        Mood mood = moodRepository
        .findTopByUserIdUsuarioOrderByDateDescIdDesc(userId)
                .orElseThrow(() ->
                        new RuntimeException("No mood records found"));

        String recommendation;

        switch (mood.getMoodType()) {

            case HAPPY:
                recommendation = "Aprovecha tu buen estado de ánimo para avanzar en tareas importantes.";
                break;

            case MOTIVATED:
                recommendation = "Es un buen momento para trabajar en actividades de alta prioridad.";
                break;

            case CALM:
                recommendation = "Mantén tu ritmo actual y continúa con tus hábitos positivos.";
                break;

            case TIRED:
                recommendation = "Considera descansar un poco antes de continuar trabajando.";
                break;

            case STRESSED:
                recommendation = "Toma un descanso corto y reorganiza tus tareas pendientes.";
                break;

            case ANXIOUS:
                recommendation = "Respira profundamente y divide tus tareas en pasos pequeños.";
                break;

            case SAD:
                recommendation = "Habla con alguien de confianza o realiza una actividad que disfrutes.";
                break;

            case ANGRY:
                recommendation = "Tómate unos minutos antes de tomar decisiones importantes.";
                break;

            default:
                recommendation = "Continúa monitoreando tu estado emocional.";
        }

        return new RecommendationResponseDTO(
                mood.getMoodType().name(),
                recommendation
        );
    }

    // Conversión Entity -> DTO
    private MoodResponseDTO convertToResponseDTO(Mood mood) {

        return new MoodResponseDTO(
                mood.getId(),
                mood.getMoodType(),
                mood.getStressLevel(),
                mood.getEnergyLevel(),
                mood.getNote(),
                mood.getDate(),
                mood.getUser().getUsuario()
        );
    }
}