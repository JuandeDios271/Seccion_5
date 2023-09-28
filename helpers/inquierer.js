const inquirer = require('inquirer');
const { default: Choice } = require('inquirer/lib/objects/choice');


require('colors');

const pregutas = [
    {
        type: 'list',
        name: 'opcion',
        message: 'QUE DESEA HACER',
        choices: [
            {
                value: '1',
                name: `${'1.'.red} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.red} listar tarea`
            },
            {
                value: '3',
                name: `${'3.'.red} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.red} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.red} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.red} Borrar tarea`
            },
            {
                value: '0',
                name: `${'0.'.red} SALIR`
            },
        ]
    }
    
];

const inquiereMenu = async() => {
    console.clear();
    console.log('==========================='.red);
    console.log('   Seleccione una opción   '.red);
    console.log('===========================\n'.red);

    const {opcion} = await inquirer.prompt(pregutas);

    return opcion;


}

const pausa = async() => {

    const question = [
        {
            type: 'input',
            name: 'Enter',
            message: `Presione ${' ENTER'.green} para continuar`

        }
    ];

    console.log('\n');
    await inquirer.prompt(question);
}

const leerInput = async() => {
    const question = [
        {
            type: 'input',
            name: 'desc',
           
            
            validate( value ){
                if( value.length === 0 ){
                    return ' POR FAVOR INGRESE UN VALOR';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;

}

const listadoTareasBorrar = async( tareas = [] ) => {
    const choices = tareas.map( (tarea,i) => {
        const idx = `${i +1}.`.green;
        return{
            value: tarea.id,
            name: `${ idx } ${tarea.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0. '.green + 'Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]
    const { id } = await inquirer.prompt(preguntas);
    return id;
    
}

const confirmar = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoChecklist = async( tareas = [] ) => {
    const choices = tareas.map( (tarea,i) => {
        const idx = `${i +1}.`.green;
        return{
            value: tarea.id,
            name: `${ idx } ${tarea.desc}`,
            checked:( tarea.completadoEn ) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]
    const { ids } = await inquirer.prompt(pregunta);
    return ids;
    
}

module.exports = {
    inquiereMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist

}