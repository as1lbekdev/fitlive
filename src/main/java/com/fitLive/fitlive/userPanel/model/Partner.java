package com.fitLive.fitlive.userPanel.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="partners")
@Getter
@Setter
@NoArgsConstructor
public class Partner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false )
    private String name;

    @Column(nullable  = false)
    private String location;
}
