package libros.com.entity;

//@author Rodrigo

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Entity(name = "LibroEntity")
@Table(name = "libro")
public class LibroEntity implements Serializable{
    
    private static final long serialVersionUID = 1L;
    
    @Id
    @Column(name = "cod_lib")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long codigo;
    
    @ManyToOne
    @JoinColumn(name = "cod_autor", nullable = false)
    private AutorEntity autor;
    
    @ManyToOne
    @JoinColumn(name = "cod_editorial", nullable = false)
    private EditorialEntity editorial;
    
    @ManyToOne
    @JoinColumn(name = "cod_categoria", nullable = false)
    private CategoriaEntity categoria;
    
    @Column(name = "nom_lib")
    private String nombre;
    
    @Column(name = "img_lib")
    private String imagen;
    
    @Column(name = "info_lib")
    private String informacion;
    
    @Column(name = "pag_lib")
    private int pagina;
    
    @Column(name = "anio_lib")
    private Integer anio;
    
    @Column(name = "stock_lib")
    private int stock;
    
    @Column(name = "prec_lib")
    private double precio;
    
    @Column(name = "est_lib")
    private boolean estado;
    
    public LibroEntity(String codigo) {
        this.codigo = Long.parseLong(codigo);
    }
}

// http://localhost:8090/xlib/libros