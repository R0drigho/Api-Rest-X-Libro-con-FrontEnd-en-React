package libros.com.service;

// @author Rodrigo

import java.util.List;
import java.util.Optional;
import libros.com.entity.LibroEntity;

public interface LibroService {
    
    List<LibroEntity> findAll();
    List<LibroEntity> findAllTrue();
    List<LibroEntity> findAllFalse();
    Optional<LibroEntity> findById(long id);
    
    LibroEntity add(LibroEntity l);
    LibroEntity update(LibroEntity l);
    LibroEntity delete(LibroEntity l);
}
