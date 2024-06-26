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
@Entity(name = "AutorEntity")
@Table(name = "autor")
public class AutorEntity implements Serializable{
    
    private static final long serialVersionUID = 1L;
    
    @Id
    @Column(name = "cod_aut")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long codigo;
    
    @Column(name = "nom_aut")
    private String nombre;
    
    @Column(name = "naci_aut")
    private String pais;
    
    @Column(name = "est_aut")
    private boolean estado;
    
    // Constructor que acepta un String para el código, porque da problema la webada
    public AutorEntity(String codigo) {
        this.codigo = Long.parseLong(codigo); // Convertir el String a long
    }
}
