package libros.com.repository;

//@author Rodrigo

import java.util.List;
import libros.com.entity.EditorialEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EditorialRepository extends JpaRepository<EditorialEntity, Long>{
    
    @Query("select e from EditorialEntity e where e.estado = true")
    List<EditorialEntity> findAllTrue();
    
    @Query("select e from EditorialEntity e where e.estado = false")
    List<EditorialEntity> findAllFalse();
}
