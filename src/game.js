import Boot from './boot.js';
import Menu from './menumain.js';
import Config from './menucfg.js';
import PauseMenu from './pauseMenu.js';
import Level1 from './level1.js';
import GameOver from './gameOver.js';


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
    scene: [Boot, Menu, Config, Level1, PauseMenu, GameOver],
    physics: { 
        default: 'arcade', 
        arcade: { 
            gravity: { y: 100 }, 
            debug: false 
        } 
    }
};

new Phaser.Game(config);

