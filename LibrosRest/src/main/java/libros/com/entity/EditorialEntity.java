package libros.com.entity;

//@author Rodrigo

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
@Entity(name = "EditorialEntity")
@Table(name = "editorial")
public class EditorialEntity implements Serializable{
    
    private static final long serialVersionUID = 1L;
    
    @Id
    @Column(name = "cod_edi")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long codigo;
    
    @Column(name = "nom_edi")
    private String nombre;
    
    @Column(name = "est_edi")
    private boolean estado;
    
    public EditorialEntity(String codigo) {
        this.codigo = Long.parseLong(codigo);
    }
}
