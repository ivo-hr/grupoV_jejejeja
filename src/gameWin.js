import Button from "./button.js";

/**
 * Escena del menú muerte.
 * @extends Phaser.Scene
 */
export default class GameWin extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'gameWin' });
  }

  /**
   * Creación de la escena.
   * @override
   */
  create() {
    this.canvas = document.getElementById("mainCanvas");

    var winMenu;
    var musicName = 'game3';
    //Imagen del menú ppal, dependiendo de la moralidad
    if (this.morality <= this.maxMorality / 3){
        winMenu = this.add.image(document.getElementById("mainCanvas").width / 2, 
        document.getElementById("mainCanvas").height / 2, 'gamePacifist', 0);

        musicName = 'pacifist';
    }
    else if (this.morality <= this.maxMorality * 2 / 3){
        winMenu = this.add.image(document.getElementById("mainCanvas").width / 2, 
        document.getElementById("mainCanvas").height / 2, 'gameNeutral', 0);

        musicName = 'neutral';
    }
    else{
        winMenu = this.add.image(document.getElementById("mainCanvas").width / 2,
        document.getElementById("mainCanvas").height / 2, 'gameGenocide', 0);

        musicName = 'genocide';
    }
    winMenu.displayHeight = document.getElementById("mainCanvas").height;
    winMenu.displayWidth = document.getElementById("mainCanvas").width;

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

    //si hay musica, la elimina
    if (this.music != null)
    this.sound.removeall();

    this.music = this.sound.add(musicName, this.musicConfig);
    this.music.play();
  }

  //carga la escena del menu
  startGame() {

    this.music.stop();
    this.scene.stop();
    this.registry.destroy();
    this.events.off();

    this.scene.start('Menu');
    //this.menu.scene.start();
    
  }

  //carga la moralidad
  moralitySet(morality, maxMorality) {
    this.morality = morality;
    this.maxMorality = maxMorality;
  }



}
