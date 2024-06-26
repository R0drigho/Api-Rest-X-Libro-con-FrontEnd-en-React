package libros.com.service;

// @author Rodrigo

import java.util.List;
import java.util.Optional;
import libros.com.entity.CategoriaEntity;

public interface CategoriaService {
    
    List<CategoriaEntity> findAll();
    List<CategoriaEntity> findAllTrue();
    List<CategoriaEntity> findAllFalse();
    Optional<CategoriaEntity> findById(long id);
    
    CategoriaEntity add(CategoriaEntity c);
    CategoriaEntity update(CategoriaEntity c);
    CategoriaEntity delete(CategoriaEntity c);
}
