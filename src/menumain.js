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

    //play music
    let musicConfig = {
      mute: false,
      volume: 0.5,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    }

    this.sound.play('mainMenu', musicConfig);
    this.createVolumeSliders();
  }

  //Create a music and sfx slider to control the volume of the music and sfx
  createVolumeSliders() {
    let musicSlider = this.add.image(100, 100, 'slider').setInteractive();
    let sfxSlider = this.add.image(100, 200, 'slider').setInteractive();
    let musicVolume = this.sound.volume;
    let sfxVolume = this.sound.volume;

    musicSlider.on('pointerdown', function (pointer) {
      this.setTint(0xff0000);
    });

    musicSlider.on('pointerup', function (pointer) {
      this.clearTint();
    });

    musicSlider.on('pointermove', function (pointer) {
      if (pointer.isDown) {
        this.musicSlider.x = pointer.x;
        musicVolume = musicSlider.x - 100;
        this.sound.volume = musicVolume;
        if (musicVolume < 0.1) {
          //musicSlider.setFrame(1);
        } else if (musicVolume < 0.5) {
          //musicSlider.setFrame(2);
        } else {
          //musicSlider.setFrame(3);
        }
      }
    }, this);

    sfxSlider.on('pointerdown', function (pointer) {
      this.setTint(0xff0000);
    });

    sfxSlider.on('pointerup', function (pointer) {
      this.clearTint();
    });

    sfxSlider.on('pointermove', function (pointer) {
      if (pointer.isDown) {
        sfxVolume = pointer.x / 800;
        this.sound.volume = sfxVolume;
        if (sfxVolume < 0.1) {
          sfxSlider.setFrame(1);
        } else if (sfxVolume < 0.5) {
          sfxSlider.setFrame(2);
        } else {
          sfxSlider.setFrame(3);
        }
      }
    }, this);
  }


  /**
   * Método que inicia el juego, cambiando a la escena de la primera noche
   */
  startGame() {

    this.scene.start('level1');
  }
}
