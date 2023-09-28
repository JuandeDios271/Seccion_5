const { resolve } = require('path');

require('colors');


const mostrarMenu = () => {
    return new Promise ( resolve =>{
        
    console.clear();
    console.log('==========================='.red);
    console.log('   Seleccione una opción   '.red);
    console.log('===========================\n'.red);


    console.log(`${ '1.'.red } Crear Tarea `);
    console.log(`${ '2.'.red } Listar Tareas `);
    console.log(`${ '3.'.red } Listar Tareas Completas `);
    console.log(`${ '4.'.red } Listar Tareas Pendientes `);
    console.log(`${ '5.'.red } Completar Tarea (s) `);
    console.log(`${ '6.'.red } Borrar Tarea `);
    console.log(`${ '0.'.red } Salir \n`);
    
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });


    readline.question('Seleccione una opción: ', (opt ) =>{
        readline.close();
        resolve(opt);
    })

    });



}


const pausa =() => {

    return new Promise( resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
    
        readline.question(`\nPresione ${' ENTER'.green} para continuar\n`, (opt ) =>{
            readline.close();
            resolve();
        })

    });
   

}


module.exports = {
    mostrarMenu,
    pausa
}



