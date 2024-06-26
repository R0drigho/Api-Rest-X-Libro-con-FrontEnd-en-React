package libros.com.config;

// @author Rodrigo
 
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("http://localhost:3000") // Reemplazar con el puerto de aplicación React
            .allowedMethods("GET", "POST", "PUT", "DELETE");
    }
}
/*
habilitar CORS para todas las solicitudes en tu aplicación Spring Boot, 
puedes agregar un filtro CORS global.
*/