package com.sonidovivo.gestion_catalogo.config;

import java.math.BigDecimal;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.sonidovivo.gestion_catalogo.model.Categoria;
import com.sonidovivo.gestion_catalogo.model.Marca;
import com.sonidovivo.gestion_catalogo.model.Producto;
import com.sonidovivo.gestion_catalogo.repository.CategoriaRepository;
import com.sonidovivo.gestion_catalogo.repository.MarcaRepository;
import com.sonidovivo.gestion_catalogo.repository.ProductoRepository;

import lombok.RequiredArgsConstructor;


@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final ProductoRepository productoRepo;
    private final CategoriaRepository categoriaRepo;
    private final MarcaRepository marcaRepo;

    @Override
    public void run(String... args) {
        if (productoRepo.count() > 0) {
            return;
        }
        crear("Guitarra eléctrica Stratocaster", "Guitarra eléctrica de 6 cuerdas, cuerpo de aliso.", "389990", "Guitarras", "Fender", true,
            "https://audiomusicacl.vtexassets.com/arquivos/ids/191443/1-guitarra-electrica-fender-squier-sonic-stratocaster-hss-tahitian-coral-1113313.jpg?v=638525238954070000");
        crear("Guitarra acústica F310", "Guitarra acústica con tapa de abeto.", "149990", "Guitarras", "Yamaha", true,
            "https://i5.walmartimages.cl/asr/a1774d9f-e686-4dec-b03b-5d30e6736a1f.33ddf2d8b210f44efdbf39ea93665da8.jpeg?odnHeight=2000&odnWidth=2000&odnBg=ffffff");
        crear("Guitarra eléctrica RG421", "Mástil delgado, ideal para rock y metal.", "329990", "Guitarras", "Ibanez", false,
            "https://musicworks.cl/wp-content/uploads/2025/11/2-15-600x720-1.jpg");
        crear("Piano digital FP-30X", "88 teclas con acción de martillo.", "699990", "Teclados", "Roland", true,
            "https://kraftmusic.com/cdn/shop/files/ROL-FP30X_Style-Shots-13.jpg?v=1770225759&width=3000");
        crear("Teclado PSR-E373", "61 teclas sensibles al tacto, 622 voces.", "219990", "Teclados", "Yamaha", false,
            "https://es.yamaha.com/es/files/PSR_E463_tcm121-1687045.jpg?impolicy=resize&imwid=735&imhei=735");
        crear("Batería electrónica TD-1K", "Kit compacto con pads de malla.", "549990", "Percusion", "Roland", true,
            "https://musicbox.com.co/wp-content/uploads/2022/06/6033467-1-768x743.jpg");
        crear("Micrófono SM58", "Micrófono dinámico vocal, estándar de escenario.", "119990", "Audio", "Shure", false,
            "https://www.blupointmusic.cl/wp-content/uploads/2026/04/Shure-MV7X-Microfono-Dinamico-3.webp");
        crear("Micrófono SM57", "Micrófono dinámico para instrumentos.", "109990", "Audio", "Shure", false,
            "https://www.tiendavisionbroadcast.co/wp-content/uploads/2022/10/shure-super-55.webp");
        crear("Set de cuerdas para guitarra", "Cuerdas de acero calibre 010-046.", "9990", "Accesorios", "Fender", false,
            "https://rockbox.es/40287-home_default/ernie-ball-eb2006-earthwood-bronze-extra-light-2006-1050.jpg");
        crear("Correa para guitarra", "Correa ajustable de cuero sintético.", "14990", "Accesorios", "Ibanez", false,
            "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=600&q=80");
    }

    private void crear(String nombre, String descripcion, String precio, String categoria, String marca,
            boolean destacado, String imagenUrl) {
        Categoria c = categoriaRepo.findByNombre(categoria).orElseThrow();
        Marca m = marcaRepo.findByNombre(marca).orElseThrow();
        Producto p = new Producto();
        p.setNombre(nombre);
        p.setDescripcion(descripcion);
        p.setPrecio(new BigDecimal(precio));
        p.setImagenUrl(imagenUrl);
        p.setCategoria(c);
        p.setMarca(m);
        p.setDestacado(destacado);
        productoRepo.save(p);
    }
}
