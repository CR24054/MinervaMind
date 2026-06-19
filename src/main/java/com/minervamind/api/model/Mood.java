package com.minervamind.api.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "moods")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Mood {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private MoodType moodType;

    private Integer stressLevel;

    private Integer energyLevel;

    private String note;

    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private User user;
}