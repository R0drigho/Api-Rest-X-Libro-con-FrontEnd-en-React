package libros.com.controllerRest;

//@author Rodrigo

import java.util.List;
import java.util.Optional;
import libros.com.entity.EditorialEntity;
import libros.com.service.EditorialService;
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
@RequestMapping("/editorial")
public class EditorialRestController {
    
    @Autowired
    private EditorialService service;
    
    @GetMapping
    public List<EditorialEntity> findAll(){
        return service.findAll();
    }
    
    @GetMapping("/activo")
    public List<EditorialEntity> findAllTrue(){
        return service.findAllTrue();
    }
    
    @GetMapping("/inactivo")
    public List<EditorialEntity> findAllFalse(){
        return service.findAllFalse();
    }
    
    @GetMapping("/{id}")
    public Optional<EditorialEntity> finfById(@PathVariable Long id){
        return service.findById(id);
    }
    
    @PostMapping
    public EditorialEntity add(@RequestBody EditorialEntity e){
        return service.add(e);
    }
    
    @PutMapping("{id}")
    public EditorialEntity update(@PathVariable Long id, @RequestBody EditorialEntity e){
        e.setCodigo(id);
        return service.update(e);
    }
    
    @DeleteMapping("{id}")
    public EditorialEntity delete(@PathVariable Long id){
        
        EditorialEntity objEditorial = service.findById(id).orElse(null);
        
        if(objEditorial.isEstado()){
            objEditorial.setEstado(false);
        }
        else{
            objEditorial.setEstado(true);
        }
        return service.update(objEditorial);
    }
}
