import Button from "./button.js";

/**
 * Escena del menú inicial.
 * @extends Phaser.Scene
 */
export default class Config extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'Config' });

  }
  create() {
    this.canvas = document.getElementById("mainCanvas");
    var cfgMenu = this.add.image(document.getElementById("mainCanvas").width / 2, document.getElementById("mainCanvas").height / 2, 'config', 0);

    cfgMenu.displayHeight = document.getElementById("mainCanvas").height;
    cfgMenu.displayWidth = document.getElementById("mainCanvas").width;

    let bckbuttonConfig = {

      x: this.canvas.width / 2,
      y: this.canvas.height *2.5/ 3,
      id: 'playButton'
    };

    this.bbutton = new Button(this, bckbuttonConfig);
    this.bbutton.setScale(2);

    this.events.on('buttonPressedplayButton', this.goBack, this);


    if (this.musicConfig == null) {
        this.musicConfig = {
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
    }

    this.musicTest = {
        mute: false,
        volume: this.musicConfig.volume,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
    }
    if (this.sfxConfig == null) {
        this.sfxConfig = {
        mute: false,
        volume: 0.5,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
        }
    }

    let lessMVolButt = {

        x: this.canvas.width / 5,
        y: this.canvas.height *2 / 5,
        id: 'lessMButton'
      };
    let moreMVolButt = {

        x: this.canvas.width * 4/ 5,
        y: this.canvas.height * 2  / 5,
        id: 'moreMButton'
    };

    let lessSVolButt = {
        x: this.canvas.width / 5,
        y: this.canvas.height *3 / 5,
        id: 'lessSButton'
      };
    let moreSVolButt = {

        x: this.canvas.width * 4/ 5,
        y: this.canvas.height * 3  / 5,
        id: 'moreSButton'
    };

    this.lessMButton = new Button(this, lessMVolButt);
    this.lessMButton.setScale(1.5);

    this.events.on('buttonPressedlessMButton', this.lessMusicVol, this);

    this.moreMButton = new Button(this, moreMVolButt);
    this.moreMButton.setScale(1.5);

    this.events.on('buttonPressedmoreMButton', this.moreMusicVol, this);

    this.lessSButton = new Button(this, lessSVolButt);
    this.lessSButton.setScale(1.5);

    this.events.on('buttonPressedlessSButton', this.lessSfxVol, this);

    this.moreSButton = new Button(this, moreSVolButt);
    this.moreSButton.setScale(1.5);

    this.events.on('buttonPressedmoreSButton', this.moreSfxVol, this);

    //create a rectangle that changes length based on volume
    this.musicVolRect = this.add.rectangle(this.canvas.width *2/ 5, this.canvas.height * 2 / 5, this.musicConfig.volume * this.canvas.width * 2/5, 10, 0x00ff00);
    this.sfxVolRect = this.add.rectangle(this.canvas.width *2/ 5, this.canvas.height * 3 / 5, this.sfxConfig.volume * this.canvas.width * 2/5, 10, 0xff0000);

//     this.volumelevel = this.add.text(this.canvas.width / 2, this.canvas.height * 2 / 5, 'M_vol=' + this.musicConfig.volume, { fontSize: '32px', fill: '#fff' });
//     this.sfxlevel = this.add.text(this.canvas.width / 2, this.canvas.height * 3 / 5, 'S_vol=' + this.sfxConfig.volume, { fontSize: '32px', fill: '#fff' });
   }
  goBack() {
    this.scene.start('Menu');
  }

    lessMusicVol() {
        this.musicConfig.volume -= 0.1;

        if (this.musicConfig.volume < 0) {
            this.musicConfig.volume = 0;
        }

        this.musicVolRect.width = this.musicConfig.volume * this.canvas.width * 2/5;

        this.musicTest.volume = this.musicConfig.volume;
        this.sound.play('shot', this.musicTest);
    }

    moreMusicVol() {
        this.musicConfig.volume += 0.1;

        if (this.musicConfig.volume > 1) {
            this.musicConfig.volume = 1;
        }
        this.musicVolRect.width = this.musicConfig.volume * this.canvas.width * 2/5;

        this.musicTest.volume = this.musicConfig.volume;
        this.sound.play('shot', this.musicTest);
    }

    lessSfxVol() {
        this.sfxConfig.volume -= 0.1;

        if (this.sfxConfig.volume < 0) {
            this.sfxConfig.volume = 0;
        }

        this.sfxVolRect.width = this.sfxConfig.volume * this.canvas.width * 2/5;

        this.sound.play('dmg', this.sfxConfig);
    }

    moreSfxVol() {
        this.sfxConfig.volume += 0.1;

        if (this.sfxConfig.volume > 1) {
            this.sfxConfig.volume = 1;
        }

        this.sfxVolRect.width = this.sfxConfig.volume * this.canvas.width * 2/5;

        this.sound.play('dmg', this.sfxConfig);
    }




    grabMusicConfig() {
        return this.musicConfig;
    }
    grabSfxConfig() {
        return this.sfxConfig;
    }

    setMusicConfig(musicConfig) {
        this.musicConfig = musicConfig;
    }
    setSfxConfig(sfxConfig) {
        this.sfxConfig = sfxConfig;
    }
}

