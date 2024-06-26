package libros.com.service.implement;

//@author Rodrigo

import java.util.List;
import java.util.Optional;
import libros.com.entity.AutorEntity;
import libros.com.repository.AutorRepository;
import libros.com.service.AutorService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

@Service
public class AutorServiceImpl implements AutorService{
    
    @Autowired
    private AutorRepository repositorio;

    @Override
    public List<AutorEntity> findAll() {
        return repositorio.findAll();
    }

    @Override
    public List<AutorEntity> findAllTrue() {
        return repositorio.findAllTrue();
    }

    @Override
    public List<AutorEntity> findAllFalse() {
        return repositorio.findAllFalse();
    }

    @Override
    public Optional<AutorEntity> finById(long id) {
        return repositorio.findById(id);
    }

    @Override
    public AutorEntity add(AutorEntity a) {
        try {
            return repositorio.save(a);
        } catch (DataIntegrityViolationException e) {
            throw new DataIntegrityViolationException("El nombre ya existe", e);
        }
    }

    @Override
    public AutorEntity update(AutorEntity a) {
        AutorEntity objAutor = repositorio.getById(a.getCodigo());
        BeanUtils.copyProperties(a, objAutor);
        return repositorio.save(objAutor);
    }

    @Override
    public AutorEntity delete(AutorEntity a) {
        AutorEntity objAutor = repositorio.getById(a.getCodigo());
        objAutor.setEstado(false);
        return repositorio.save(objAutor);
    }
    
}
