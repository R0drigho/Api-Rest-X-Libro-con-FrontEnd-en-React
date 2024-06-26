package libros.com.service.implement;

//@author Rodrigo

import java.util.List;
import java.util.Optional;
import libros.com.entity.EditorialEntity;
import libros.com.repository.EditorialRepository;
import libros.com.service.EditorialService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EditorialServiceImpl implements EditorialService{
    
    @Autowired
    private EditorialRepository repositorio;

    @Override
    public List<EditorialEntity> findAll() {
        return repositorio.findAll();
    }

    @Override
    public List<EditorialEntity> findAllTrue() {
        return repositorio.findAllTrue();
    }

    @Override
    public List<EditorialEntity> findAllFalse() {
        return repositorio.findAllFalse();
    }

    @Override
    public Optional<EditorialEntity> findById(long id) {
        return repositorio.findById(id);
    }

    @Override
    public EditorialEntity add(EditorialEntity e) {
        return repositorio.save(e);
    }

    @Override
    public EditorialEntity update(EditorialEntity e) {
        EditorialEntity objEditorial = repositorio.getById(e.getCodigo());
        BeanUtils.copyProperties(e, objEditorial);
        return repositorio.save(objEditorial);
    }

    @Override
    public EditorialEntity delete(EditorialEntity e) {
        EditorialEntity objEditorial = repositorio.getById(e.getCodigo());
        objEditorial.setEstado(false);
        return repositorio.save(objEditorial);
    }
    
}
