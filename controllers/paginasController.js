import { Viaje } from "../models/Viaje.js";
import { Testimoniales } from "../models/Testimoniales.js";

const paginaInicio = async (req, res) => {

    try {
        // No es recomendado hacer este doble await porque uno bloquea al otro sumandose el tiempo en que se consulta la base de datos
        // const viajes = await Viaje.findAll( { limit: 3 } );
        // const testimoniales = await Testimoniales.findAll( { limit: 3 } );

        // Usamos Promise para que ambas consultas se ejecuten al mismo tiempo, así la respuesta es más rápida, podemos hacer esto porque las consultas se realizan sobre 2 entidades diferentes
        const promiseDB = []
        promiseDB.push( Viaje.findAll( { limit: 3 } ) );
        promiseDB.push( Testimoniales.findAll( { limit: 3 } ) );

        const resultado = await Promise.all( promiseDB );
        
        // send (contenido un poco más dinámico pero el más limitado), json (contenido estático de formato json) y render (una vista, el más usado)
        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
    } catch (error) {
        console.log(error);
    }
}

const paginaNosotros = (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaViajes = async (req, res) => {

    // Consultar DB
    const viajes = await Viaje.findAll();
    
    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes,
    });
}

const paginaTestimoniales = async (req, res) => {

    try {
        const testimoniales = await Testimoniales.findAll();
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error)
    }
}

// Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
    
    const { slug } = req.params;

    try {
        const viaje = await Viaje.findOne({ where: { slug } });
        
        res.render('viaje', {
            pagina: 'Información Viaje',
            viaje,
        });
    } catch (error) {
        console.log(error)
    }
    
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}