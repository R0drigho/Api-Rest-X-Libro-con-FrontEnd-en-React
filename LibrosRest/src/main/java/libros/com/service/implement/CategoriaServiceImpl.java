package libros.com.service.implement;

//@author Rodrigo

import java.util.List;
import java.util.Optional;
import libros.com.entity.CategoriaEntity;
import libros.com.repository.CategoriaRepository;
import libros.com.service.CategoriaService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoriaServiceImpl implements CategoriaService{
    
    @Autowired
    private CategoriaRepository repositorio;

    @Override
    public List<CategoriaEntity> findAll() {
        return repositorio.findAll();
    }

    @Override
    public List<CategoriaEntity> findAllTrue() {
        return repositorio.findAllTrue();
    }

    @Override
    public List<CategoriaEntity> findAllFalse() {
        return repositorio.findAllFalse();
    }

    @Override
    public Optional<CategoriaEntity> findById(long id) {
        return repositorio.findById(id);
    }

    @Override
    public CategoriaEntity add(CategoriaEntity c) {
        return repositorio.save(c);
    }

    @Override
    public CategoriaEntity update(CategoriaEntity c) {
        CategoriaEntity objCategoria = repositorio.getById(c.getCodigo());
        BeanUtils.copyProperties(c, objCategoria);
        return repositorio.save(objCategoria);
    }

    @Override
    public CategoriaEntity delete(CategoriaEntity c) {
        CategoriaEntity objCategoria = repositorio.getById(c.getCodigo());
        objCategoria.setEstado(false);
        return repositorio.save(objCategoria);
    }
}
