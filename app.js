require('colors');


const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquiereMenu,pausa,leerInput,listadoTareasBorrar,confirmar,mostrarListadoChecklist  } = require('./helpers/inquierer');

const Tareas = require('./models/tareas');




const main = async() =>{

    
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB(); 

    if (tareasDB ){//cargar tareas
      tareas.cargarTareasFromArray( tareasDB );

    }
    
 

     do {
      opt = await inquiereMenu();
     
      switch (opt) {
        case '1': //crear tarea
          const desc = await leerInput('Descripcion: ');
          tareas.crearTarea( desc );
        break;
      
        case '2'://mostar tareas
          tareas.listadoCompleto();
        break;

        case '3': //listar completadas
          tareas.listarPendientesCompletadas(true);
        break;

        case '4': //listar pendientes
          tareas.listarPendientesCompletadas(false);
        break;

        case '5': //completado |  pendiente
          const ids = await mostrarListadoChecklist( tareas.listadoArr);
          tareas.toggleCompletadas( ids );
        break;

        case '6': //Borrar tareas
          const id = await listadoTareasBorrar( tareas.listadoArr );
          if( id !== '0'){
            const ok = await confirmar('¿ESTA SEGURO DE BORRAR?');
            if ( ok ) {
            tareas.borrarTarea( id );
            console.log('TAREA BORRADA CORRECTAMENTE')
          }
          }
          
        break;
      }

      guardarDB( tareas.listadoArr );
      
      await pausa();


    } while ( opt != '0' ); 

    // pausa();




}

main();

