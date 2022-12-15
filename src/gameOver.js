import Button from "./button.js";

/**
 * Escena del menú muerte.
 * @extends Phaser.Scene
 */
export default class GameOver extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'gameOver' });
  }

  /**
   * Creación de la escena.
   * @override
   */
  create() {

    this.cfgScreen = this.scene.get('Config');

    this.canvas = document.getElementById("mainCanvas");
    //Imagen del menú ppal
    var mainmenu = this.add.image(document.getElementById("mainCanvas").width / 2, document.getElementById("mainCanvas").height / 2, 'gameOver', 0);

    mainmenu.displayHeight = document.getElementById("mainCanvas").height;
    mainmenu.displayWidth = document.getElementById("mainCanvas").width;

    let plybuttonConfig = {

      x: this.canvas.width / 2,
      y: this.canvas.height *3.1/ 4,
      id: 'playButton'
    };

    this.pbutton = new Button(this, plybuttonConfig);
    this.pbutton.setScale(1.5);

    this.events.on('buttonPressedplayButton', this.startGame, this);


    //play music
    this.musicConfig = this.cfgScreen.grabMusicConfig();
    this.sfxConfig = this.cfgScreen.grabSfxConfig();


    if (this.music == null)
      this.music = this.sound.add('game3', this.musicConfig);
      
      this.music.play();
  }

  startGame() {

    this.music.stop();
    this.scene.stop();
    this.registry.destroy();
    this.events.off();

    this.scene.start('Menu');
    //this.menu.scene.start();
    
  }


}
