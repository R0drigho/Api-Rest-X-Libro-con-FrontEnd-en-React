package libros.com.entity;

// @author Rodrigo

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "CategoriaEntity")
@Table(name = "categoria")
public class CategoriaEntity implements Serializable{
    
    private static final long serialVersionUID = 1L;
    
    @Id
    @Column(name = "cod_cat")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long codigo;
    
    @Column(name = "nom_cat")
    private String nombre;
    
    @Column(name = "est_cat")
    private boolean estado;
    
    public CategoriaEntity(String codigo) {
        this.codigo = Long.parseLong(codigo);
    }
}
