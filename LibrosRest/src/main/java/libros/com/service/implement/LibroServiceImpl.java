package libros.com.service.implement;

// @author Rodrigo

import java.util.List;
import java.util.Optional;
import libros.com.entity.LibroEntity;
import libros.com.repository.LibroRepository;
import libros.com.service.LibroService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LibroServiceImpl implements LibroService{
    
    @Autowired
    private LibroRepository repositorio;

    @Override
    public List<LibroEntity> findAll() {
        return repositorio.findAll();
    }

    @Override
    public List<LibroEntity> findAllTrue() {
        return repositorio.findAllTrue();
    }

    @Override
    public List<LibroEntity> findAllFalse() {
        return repositorio.findAllFalse();
    }

    @Override
    public Optional<LibroEntity> findById(long id) {
        return repositorio.findById(id);
    }

    @Override
    public LibroEntity add(LibroEntity l) {
        return repositorio.save(l);
    }

    @Override
    public LibroEntity update(LibroEntity l) {
        LibroEntity objLibro = repositorio.getById(l.getCodigo());
        BeanUtils.copyProperties(l, objLibro);
        return repositorio.save(objLibro);
    }

    @Override
    public LibroEntity delete(LibroEntity l) {
        LibroEntity objLibro = repositorio.getById(l.getCodigo());
        objLibro.setEstado(false);
        return repositorio.save(objLibro);
    }
    
}
