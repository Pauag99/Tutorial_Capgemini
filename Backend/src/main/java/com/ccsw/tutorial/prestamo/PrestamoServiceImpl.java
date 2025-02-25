package com.ccsw.tutorial.prestamo;

import com.ccsw.tutorial.common.criteria.SearchCriteria;
import com.ccsw.tutorial.prestamo.model.Prestamo;
import com.ccsw.tutorial.prestamo.model.PrestamoDto;
import com.ccsw.tutorial.prestamo.model.PrestamoSearchDto;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

/**
 * @prestamo ccsw
 *
 */
@Service
@Transactional
public class PrestamoServiceImpl implements PrestamoService {

    @Autowired
    PrestamoRepository prestamoRepository;

    /**
     * {@inheritDoc}
     */
    @Override
    public Prestamo get(Long id) {

        return this.prestamoRepository.findById(id).orElse(null);
    }

    public Page<Prestamo> findPage(PrestamoSearchDto dto, String clientName, String gameTitle, Date date) {
        Specification<Prestamo> especificacion = Specification.where(null);
        System.out.println("1 " + "juego: " + gameTitle + " nombre cliente: " + clientName + "fecha" + date);
        if (gameTitle != null)
            System.out.println(gameTitle);
        especificacion = especificacion.and(new PrestamoSpecification(new SearchCriteria("gamename", ":", gameTitle)));
        if (clientName != null)
            especificacion = especificacion.and(new PrestamoSpecification(new SearchCriteria("clientname", ":", clientName)));
        if (date != null) {
            especificacion = especificacion.and(new PrestamoSpecification(new SearchCriteria("fechaprestamo", ":<", date)));
            especificacion = especificacion.and(new PrestamoSpecification(new SearchCriteria("fechadevolucion", ":>", date)));
        }
        return this.prestamoRepository.findAll(especificacion, dto.getPageable().getPageable());
    }

    /**
     * {@inheritDoc}
     */
    public void save(Long id, PrestamoDto dto) throws Exception {
        Prestamo prestamo;
        Date fechaInicio = dto.getFechaprestamo();
        Date fechaFin = dto.getFechadevolucion();
        Long dias = fechaFin.getTime() - fechaInicio.getTime();
        dias = dias / (1000 * 60 * 60 * 24); //Pasamos de milisegundos a días

        if (fechaFin.before(fechaInicio)) {
            throw new Exception("Fecha Incorrecta");
        }

        if (dias > 14) {
            throw new Exception("Fecha Incorrecta 14 días max.");
        }

        List<Prestamo> Prestamos = prestamoRepository.findAPrestamo(dto.getClientname(), dto.getClientname(), fechaInicio, fechaFin);

        if (Prestamos.stream().anyMatch(existingPrestamo -> !existingPrestamo.getClientname().equals(dto.getClientname()))) {
            throw new Exception("Este juego esta ocupado");
        }

        int clientPrestamos = prestamoRepository.countClientPrestamo(dto.getClientname(), dto.getFechaprestamo(), dto.getFechadevolucion());

        if (clientPrestamos >= 1)
            throw new Exception("El cliente ya tiene un prestamo en esa fecha");

        if (id == null) {
            prestamo = new Prestamo();
        } else {
            prestamo = this.prestamoRepository.findById(id).orElse(null);
        }

        BeanUtils.copyProperties(dto, prestamo, "id", "client", "game");
        prestamo.setClientname(dto.getClientname());
        prestamo.setName((dto.getName()));

        this.prestamoRepository.save(prestamo);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void delete(Long id) throws Exception {

        if (this.get(id) == null) {
            throw new Exception("Not exists");
        }

        this.prestamoRepository.deleteById(id);
    }

}