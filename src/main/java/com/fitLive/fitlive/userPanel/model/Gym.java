package com.fitLive.fitlive.userPanel.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "gyms")
@Getter
@Setter
@NoArgsConstructor
public class Gym {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String imageUrl;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String location;
}
