package com.ccsw.tutorial.prestamo;

import com.ccsw.tutorial.prestamo.model.Prestamo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.util.List;

/**
 * @prestamo ccsw
 *
 */
public interface PrestamoRepository extends CrudRepository<Prestamo, Long> {

    /**
     * Método para recuperar un listado paginado de {@link Prestamo}
     *
     * @param pageable pageable
     * @return {@link Page} de {@link Prestamo}
     */

    Page<Prestamo> findAll(Specification<Prestamo> specification, Pageable pageable);

    @Query("SELECT p FROM Prestamo p WHERE p.gamename = :gamename AND :fechaprestamo <= p.fechadevolucion AND :fechadevolucion >= p.fechaprestamo AND p.clientname <> :clientname")
    List<Prestamo> findAPrestamo(@Param("clientname") String clientname, @Param("gamename") String gamename, @Param("fechaprestamo") Date fechaprestamo, @Param("fechadevolucion") Date fechadevolucion);

    @Query("SELECT COUNT(p) FROM Prestamo p WHERE p.clientname = :clientname AND :fechaprestamo <= p.fechadevolucion AND :fechadevolucion >= p.fechaprestamo")
    int countClientPrestamo(@Param("clientname") String clientname, @Param("fechaprestamo") Date fechaprestamo, @Param("fechadevolucion") Date fechadevolucion);

}