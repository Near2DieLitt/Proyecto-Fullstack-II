package com.sonidovivo.gestion_usuarios.dto;


import com.sonidovivo.gestion_usuarios.model.Usuario;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioResponseDTO {
    private Long id;
    private String nombre;
    private String correo;
    private String telefono;
    private String rol;
    private Boolean activo;

    public static UsuarioResponseDTO from(Usuario u) {
        return new UsuarioResponseDTO(u.getId(), u.getNombre(), u.getCorreo(),
                u.getTelefono(), u.getRol().getNombre(), u.getActivo());
    }
}
