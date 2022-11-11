import Button from "./button.js";

/**
 * Escena del menú inicial.
 * @extends Phaser.Scene
 */
export default class Menu extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'Menu' });
  }

  /**
   * Creación de la escena. Tan solo contiene el título y el botón para cambiar de escena
   * @override
   */
  create() {

    this.canvas = document.getElementById("mainCanvas");
    //Imagen del menú ppal
    var mainmenu = this.add.image(document.getElementById("mainCanvas").width / 2, document.getElementById("mainCanvas").height / 2, 'mainMenu', 0);

    mainmenu.displayHeight = document.getElementById("mainCanvas").height;
    mainmenu.displayWidth = document.getElementById("mainCanvas").width;

    //Título del juego
    this.add.text(this.canvas.width / 2, this.canvas.height / 4, 'A Handful', { font: "70px Spectral", fill: "#00ffff " })
      .setOrigin(0.5, 0.5)  // Colocamos el pivote en el centro de cuadro de texto 
      .setAlign('center');  // Centramos el texto dentro del cuadro de texto

    let buttonConfig = {

      x: this.canvas.width / 2,
      y: this.canvas.height / 2
    };

    this.button = new Button(this, buttonConfig, 'playButton');
    this.button.setScale(0.5);

    this.events.on('buttonPressed', this.startGame, this);
  }

  /**
   * Método que inicia el juego, cambiando a la escena de la primera noche
   */
  startGame() {

    this.scene.start('level1');
  }
}