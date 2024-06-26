package libros.com.repository;

//@author Rodrigo

import java.util.List;
import libros.com.entity.AutorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AutorRepository extends JpaRepository<AutorEntity, Long>{
    
    @Query("select a from AutorEntity a where a.estado = true")
    List<AutorEntity> findAllTrue();
    
    @Query("select a from AutorEntity a where a.estado = false")
    List<AutorEntity> findAllFalse();
}
