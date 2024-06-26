package libros.com.service;

// @author Rodrigo

import java.util.List;
import java.util.Optional;
import libros.com.entity.AutorEntity;

public interface AutorService {
    
    List<AutorEntity> findAll();
    List<AutorEntity> findAllTrue();
    List<AutorEntity> findAllFalse();
    Optional<AutorEntity> finById(long id);
    
    AutorEntity add(AutorEntity a);
    AutorEntity update(AutorEntity a);
    AutorEntity delete(AutorEntity a);
}
