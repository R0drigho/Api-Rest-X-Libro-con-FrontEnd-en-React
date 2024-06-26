package libros.com.controllerRest;

//@author Rodrigo

import java.util.List;
import java.util.Optional;
import libros.com.entity.AutorEntity;
import libros.com.service.AutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/autor")
public class AutorRestContoller {
    
    @Autowired
    private AutorService servicio;
    
    @GetMapping
    public List<AutorEntity> findAll(){
        return servicio.findAll();
    }
    
    @GetMapping("/activo")
    public List<AutorEntity> findAllTrue(){
        return servicio.findAllTrue();
    }
    
    @GetMapping("/inactivo")
    public List<AutorEntity> findAllFalse(){
        return servicio.findAllFalse();
    }
    
    @GetMapping("/{id}")
    public Optional<AutorEntity> finfById(@PathVariable Long id){
        return servicio.finById(id);
    }
    
    @PostMapping
    public AutorEntity add(@RequestBody AutorEntity a){
        validar(a);
        try {
            return servicio.add(a);
        } catch (DataIntegrityViolationException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El nombre ya existe", e);
        }
    }
    
    @PutMapping("{id}")
    public AutorEntity update(@PathVariable Long id, @RequestBody AutorEntity a){
        a.setCodigo(id);
        return servicio.update(a);
    }
    
    @DeleteMapping("{id}")
    public AutorEntity delete(@PathVariable Long id){
        
        AutorEntity objAutor = servicio.finById(id).orElse(null);
        if(objAutor.isEstado()){
            objAutor.setEstado(false);
        }
        else{
            objAutor.setEstado(true);
        }
        return servicio.update(objAutor);
    }
    
    private void validar(AutorEntity autor) {
        if (autor.getNombre() == null || autor.getNombre().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El nombre no puede estar en blanco");
        }
        if (autor.getPais() == null || autor.getPais().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El pais no puede estar en blanco");
        }
    }
}
