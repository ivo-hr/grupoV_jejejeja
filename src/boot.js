/**
 * Escena para la precarga de los assets que se usarán en el juego.
 * Esta escena se puede mejorar añadiendo una imagen del juego y una 
 * barra de progreso de carga de los assets
 * @see {@link https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/} como ejemplo
 * sobre cómo hacer una barra de progreso.
 */
export default class Boot extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'boot' });
  }

  /**
   * Carga de los assets del juego
   */
  preload() {
    // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
    this.load.setPath('assets/sprites/');
    this.load.image('platform', 'platform.png');
    this.load.image('base', 'base.png');
    this.load.image('star', 'star.png');
    this.load.image('powerHyperbeam', 'powerHyperbeam.png');
    
    this.load.image('powerPunch', 'powerPunch.png');
    this.load.spritesheet('player', 'player.png',{frameWidth: 65, frameHeight: 70});
    this.load.spritesheet('laserp', 'pruebalaser.png',{frameWidth: 32, frameHeight:32});
    this.load.spritesheet('hand', 'hand68x60.png', {frameWidth: 68, frameHeight:60});
    this.load.spritesheet('penguin', 'penguin.png', {frameWidth: 64, frameHeight:64});
    this.load.spritesheet('bird', 'bird.png', {frameWidth: 96, frameHeight:96});
    this.load.spritesheet('birdShit', 'birdShit.png', {frameWidth: 16, frameHeight:16});
    this.load.spritesheet('baby', 'baby64x66.png', {frameWidth: 64, frameHeight:66});
    this.load.spritesheet('drunk', 'drunk.png', {frameWidth: 40, frameHeight:64});
    this.load.spritesheet('rain', 'rain.png', {frameWidth: 50, frameHeight:50});
    this.load.spritesheet('bullet', 'fireBall.png', {frameWidth: 26, frameHeight:26});
    this.load.spritesheet('bucket', 'bucket.png', {frameWidth: 50, frameHeight:50});
    this.load.spritesheet('paint', 'paintStain.png', {frameWidth: 50, frameHeight:26});

    this.load.image('background1', 'background1.png');
    this.load.image('background2', 'background2.png');
    this.load.image('background3', 'background3.png');
    this.load.image('background4', 'background4.png');
    this.load.image('background5', 'background5.png');
    this.load.image('fallingParticle' , 'baby.png');

    this.load.image('dial', 'dial.png');
    this.load.image('dialHand', 'dialHand.png');

    
    this.load.setPath('assets/tilemaps/');
    this.load.image('tiles', 'spritesheetMap.png');
    this.load.tilemapTiledJSON('lvlP', 'levelPrueba.json');



    this.load.setPath('assets/images/');
    this.load.image('mainMenu', 'main.png');
    this.load.image('config', 'config.png');
    this.load.image('playButton', 'playButton.png');
    this.load.image('cfgButton', 'cfgButton.png');
    this.load.image('moreMButton', 'plusM.png');
    this.load.image('lessMButton', 'minusM.png');
    this.load.image('moreSButton', 'plusS.png');
    this.load.image('lessSButton', 'minusS.png');

    this.load.setPath('assets/fonts/');
    this.load.bitmapFont(
      'press_start_2p_font', 'press_start_2p_white.png',
      'press_start_2p.xml');

    this.load.setPath('assets/sounds/');
    this.load.audio('mainMenu', 'EggyToast_Condemned.mp3');
    this.load.audio('game1', 'EggyToast_DeathValley.mp3');
    this.load.audio('game2', 'EggyToast_EnemiesofthePeople.mp3');
    this.load.audio('game3', 'EggyToast_YouTried.mp3');
    this.load.audio('dmg', 'dmgtaken.wav');
    this.load.audio('shot', 'shot.wav');
    this.load.audio('laser', 'laser.wav');
    this.load.audio('pengu', 'pengu.wav');
    this.load.audio('jump', 'jump.wav');
    this.load.audio('baby', 'baby.wav');
    this.load.audio('enemyKill', 'killedEnemy.wav');
    this.load.audio('bucket', 'bucket.wav');
  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    this.scene.start('Menu');
  }
}