package libros.com.repository;

//@author Rodrigo

import java.util.List;
import libros.com.entity.CategoriaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CategoriaRepository extends JpaRepository<CategoriaEntity, Long>{
    
    @Query("select c from CategoriaEntity c where c.estado = true")
    List<CategoriaEntity> findAllTrue();
    
    @Query("select c from CategoriaEntity c where c.estado = false")
    List<CategoriaEntity> findAllFalse();
}
