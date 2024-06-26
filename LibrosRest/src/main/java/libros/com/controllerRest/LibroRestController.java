package libros.com.controllerRest;

// @author Rodrigo

import java.util.List;
import java.util.Optional;
import libros.com.entity.LibroEntity;
import libros.com.service.LibroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/libros")
public class LibroRestController {
    
    @Autowired
    private LibroService service;
    
    @GetMapping
    public List<LibroEntity> findAll(){
        return service.findAll();
    }
    
    @GetMapping("/activo")
    public List<LibroEntity> findAllTrue(){
        return service.findAllTrue();
    }
    
    @GetMapping("/inactivo")
    public List<LibroEntity> findAllFalse(){
        return service.findAllFalse();
    }
    
    @GetMapping("/{id}")
    public Optional<LibroEntity> findById(@PathVariable Long id){
        return service.findById(id);
    }
    
    @PostMapping
    public LibroEntity add(@RequestBody LibroEntity l){
        return service.add(l);
    }
    
    @PutMapping("{id}")
    public LibroEntity update(@PathVariable Long id, @RequestBody LibroEntity l){
        l.setCodigo(id);
        return service.update(l);
    }
    
    @DeleteMapping("{id}")
    public LibroEntity delete(@PathVariable Long id){
        
        LibroEntity objLibro = service.findById(id).orElse(null);
        
        if(objLibro.isEstado()){
            objLibro.setEstado(false);
        }
        else{
            objLibro.setEstado(true);
        }
        return service.update(objLibro);
    }
}
