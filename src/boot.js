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
    this.load.spritesheet('hand', 'hand.png', {frameWidth: 90, frameHeight:84});
    this.load.spritesheet('penguin', 'penguin.png', {frameWidth: 64, frameHeight:64});
    this.load.spritesheet('bird', 'bird.png', {frameWidth: 96, frameHeight:96});
    this.load.spritesheet('baby', 'baby.png', {frameWidth: 96, frameHeight:96});
    this.load.image('background1', 'paraBackground1.png');
    this.load.image('background2', 'paraBackground2.png');
    this.load.image('background3', 'paraBackground3.png');
    this.load.image('background4', 'paraBackground4.png');
    this.load.image('background5', 'paraBackground5.png');


    this.load.setPath('assets/images/');
    this.load.image('mainMenu', 'main.png');
    this.load.image('playButton', 'playButton.gif');

    this.load.setPath('assets/fonts/');
    
    this.load.bitmapFont(
      'press_start_2p_font', 'press_start_2p_white.png',
      'press_start_2p.xml');
  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    this.scene.start('Menu');
  }
}