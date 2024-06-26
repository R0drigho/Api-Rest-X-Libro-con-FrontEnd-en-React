package libros.com.repository;

// @author Rodrigo

import java.util.List;
import libros.com.entity.LibroEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LibroRepository extends JpaRepository<LibroEntity, Long>{
    
    @Query("select l from LibroEntity l where l.estado = true")
    List<LibroEntity> findAllTrue();
    
    @Query("select l from LibroEntity l where l.estado = false")
    List<LibroEntity> findAllFalse();
}
