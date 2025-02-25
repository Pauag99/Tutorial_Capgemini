package com.ccsw.tutorial.prestamo.model;

import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name = "prestamo")

public class Prestamo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "gamename", nullable = false)
    private String gamename;

    @Column(name = "clientname", nullable = false)
    private String clientname;

    @Column(name = "fechaprestamo", nullable = false)
    private Date fechaprestamo;

    @Column(name = "fechadevolucion", nullable = false)
    private Date fechadevolucion;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClientname() {
        return clientname;
    }

    public void setClientname(String clientname) {
        this.clientname = clientname;
    }

    public String getName() {
        return gamename;
    }

    public void setName(String name) {
        this.gamename = name;
    }

    public Date getFechaprestamo() {
        return fechaprestamo;
    }

    public void setFechaprestamo(Date fechaprestamo) {
        this.fechaprestamo = fechaprestamo;
    }

    public Date getFechadevolucion() {
        return fechadevolucion;
    }

    public void setFechadevolucion(Date fechadevolucion) {
        this.fechadevolucion = fechadevolucion;
    }
}
