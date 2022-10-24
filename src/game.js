import Boot from './boot.js';

import Level1 from './level1.js';


/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
    type: Phaser.WEBGL,
    canvas: document.getElementById("mainCanvas"),
    width:  500,
    height: 300,
    scale: {
        // mode: Phaser.Scale.FIT,  
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: true,
    scene: [Boot, Level1],
    physics: { 
        default: 'arcade', 
        arcade: { 
            gravity: { y: 1 }, 
            debug: false 
        } 
    }
};

new Phaser.Game(config);