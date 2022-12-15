import Button from "./button.js";

/**
 * Escena del menú pausa.
 * @extends Phaser.Scene
 */
export default class PauseMenu extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'pauseMenu' });
  }

  /**
   * Creación de la escena.
   * @override
   */
  create() {

    this.playingScene = ' ';
    this.canvas = document.getElementById("mainCanvas");
    //Imagen del menú pausa
    var pmenu = this.add.image(document.getElementById("mainCanvas").width / 2, document.getElementById("mainCanvas").height / 2, 'pause', 0);

    pmenu.displayHeight = document.getElementById("mainCanvas").height;
    pmenu.displayWidth = document.getElementById("mainCanvas").width;

    let pbuttonConfig = {

      x: this.canvas.width / 2,
      y: this.canvas.height / 2,
      id: 'playButton'
    };

    this.pbutton = new Button(this, pbuttonConfig);
    this.pbutton.setScale(4);

    this.events.on('buttonPressedplayButton', this.startGame, this);
  }

  startGame() {
    this.scene.resume('level1');
    this.scene.stop();
    
  }
}
