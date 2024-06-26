package libros.com.controllerRest;

//@author Rodrigo

import java.util.List;
import java.util.Optional;
import libros.com.entity.CategoriaEntity;
import libros.com.service.CategoriaService;
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
@RequestMapping("/categoria")
public class CategoriaRestController {
    
    @Autowired
    private CategoriaService service;
    
    @GetMapping
    public List<CategoriaEntity> findAll(){
        return service.findAll();
    }
    
    @GetMapping("/activo")
    public List<CategoriaEntity> findAllTrue(){
        return service.findAllTrue();
    }
    
    @GetMapping("/inactivo")
    public List<CategoriaEntity> findAllFalse(){
        return service.findAllFalse();
    }
    
    @GetMapping("/{id}")
    public Optional<CategoriaEntity> findById(@PathVariable Long id){
        return service.findById(id);
    }
    
    @PostMapping
    public CategoriaEntity add(@RequestBody CategoriaEntity c){
        return service.add(c);
    }
    
    @PutMapping("{id}")
    public CategoriaEntity update(@PathVariable Long id, @RequestBody CategoriaEntity c){
        c.setCodigo(id);
        return service.update(c);
    }
    
    @DeleteMapping("{id}")
    public CategoriaEntity delete(@PathVariable Long id){
        
        CategoriaEntity objCategoria = service.findById(id).orElse(null);
        
        if(objCategoria.isEstado()){
            objCategoria.setEstado(false);
        }
        else{
            objCategoria.setEstado(true);
        }
        return service.update(objCategoria);
    }
}
