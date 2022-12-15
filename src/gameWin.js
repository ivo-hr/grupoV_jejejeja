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
    //referencia a la escena de config para poder acceder a sus variables
    this.cfgScreen = this.scene.get('Config');

    this.canvas = document.getElementById("mainCanvas");
    
    var winMenu;


    this.musicConfig = this.cfgScreen.grabMusicConfig();
    this.sfxConfig = this.cfgScreen.grabSfxConfig();
    //Imagen y musica del menú ppal, dependiendo de la moralidad
    //si la moralidad es menor a 1/3, es pacifista
    if (this.morality == 0){
        winMenu = this.add.image(document.getElementById("mainCanvas").width / 2, 
        document.getElementById("mainCanvas").height / 2, 'gamePacifist', 0);

        if (this.pmusic == null)
        this.pmusic = this.sound.add('pacifist', this.musicConfig);
        
        this.pmusic.play();
    
    }
    //si la moralidad es menor a 2/3, es neutral
    else if (this.morality <= this.maxMorality * 2 / 3){
        winMenu = this.add.image(document.getElementById("mainCanvas").width / 2, 
        document.getElementById("mainCanvas").height / 2, 'gameNeutral', 0);

        if (this.nmusic == null)
        this.nmusic = this.sound.add('neutral', this.musicConfig);
        
        this.nmusic.play();
    }
    //si la moralidad es mayor a 2/3, es genocida
    else{
        winMenu = this.add.image(document.getElementById("mainCanvas").width / 2,
        document.getElementById("mainCanvas").height / 2, 'gameGenocide', 0);

        
        if (this.gmusic == null)
        this.gmusic = this.sound.add('genocide', this.musicConfig);
        
        this.gmusic.play();
    }
    //escala la imagen
    winMenu.displayHeight = document.getElementById("mainCanvas").height;
    winMenu.displayWidth = document.getElementById("mainCanvas").width;


    //boton de play
    let plybuttonConfig = {

      x: this.canvas.width / 2,
      y: this.canvas.height * 9 / 10,
      id: 'playButton'
    };

    this.pbutton = new Button(this, plybuttonConfig);
    this.pbutton.setScale(1.5);

    this.events.on('buttonPressedplayButton', this.startGame, this);


    //sistema de puntuacion
    let grade = '';
    let gradeColor = '#000000';

    if (this.score <= 40){
        grade = 'D';
        gradeColor = '#994d00';
    }
    else if (this.score <= 60){
        grade = 'C';
        gradeColor = '#adad85';
    }
    else if (this.score <= 80){
        grade = 'B';
        gradeColor = '#a6a6a6';
    }
    else if (this.score < 100){
        grade = 'A';
        gradeColor = '#ffb31a';
    }
    else if (this.score >= 100){
        grade = 'S';
        gradeColor = '#cc99ff';
    }

    //añade el texto de la puntuacion
    let gradeText = this.add.text(this.canvas.width / 20, this.canvas.height * 6 / 10, grade, 
    {   fontFamily: 'Arial', 
        fontSize: 120, 
        fill: gradeColor,
        stroke: '#000000',
        strokeThickness: 10
    });

    
  }

  //carga la escena del menu
  startGame() {

    this.musicStopper();

    this.registry.destroy();
    this.events.off();

    this.scene.start('Menu');
    //this.menu.scene.start();
    
  }

  //carga la moralidad
  moralitySet(morality, maxMorality, score) {
    this.morality = morality;
    this.maxMorality = maxMorality;
    this.score = score;
  }

  //para parar la musica
  musicStopper(){
    if (this.pmusic != null)
      this.pmusic.stop();
    if (this.nmusic != null)
      this.nmusic.stop();
    if (this.gmusic != null)
      this.gmusic.stop();
  }


}
