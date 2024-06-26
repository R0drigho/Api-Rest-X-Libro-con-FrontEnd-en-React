package libros.com.service;

//@author Rodrigo

import java.util.List;
import java.util.Optional;
import libros.com.entity.EditorialEntity;

public interface EditorialService {
    
    List<EditorialEntity> findAll();
    List<EditorialEntity> findAllTrue();
    List<EditorialEntity> findAllFalse();
    Optional<EditorialEntity> findById(long id);
    
    EditorialEntity add(EditorialEntity e);
    EditorialEntity update(EditorialEntity e);
    EditorialEntity delete(EditorialEntity e);
}
