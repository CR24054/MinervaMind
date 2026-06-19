package com.minervamind.api.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "sleep_records")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Sleep {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalTime bedTime;

    private LocalTime wakeTime;

    private Double hoursSlept;

    @Enumerated(EnumType.STRING)
    private SleepQuality sleepQuality;

    private String note;

    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private User user;
}