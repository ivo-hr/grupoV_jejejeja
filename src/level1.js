import Platform from './platform.js';
import Player from './characters/player.js';
import Obstacle from './obstacle.js';
import Ball from './ball.js';

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Level1 extends Phaser.Scene {
  /**
   * Constructor de la escena
   * n estrellas que se crean
   */
  constructor() {
    super({ key: 'level1' });
  }

 
  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {
    
    this.cameras.main.setBounds(0, 0, 1000 * 2, 250 * 2);
    //delimita limites del mundo
    this.physics.world.setBounds(0, 0, 1000 * 2, 250 * 2);

    //this.stars = 3;
    
    this.bases = this.add.group();
    this.player = new Player(this, 200, 300);
    this.allballs = this.add.group();
   

    new Platform(this, this.player, this.bases, 150, 350);
    new Platform(this, this.player, this.bases, 850, 350);
    new Platform(this, this.player, this.bases, 500, 200);
    new Platform(this, this.player, this.bases, 150, 100);
    new Platform(this, this.player, this.bases, 850, 100);
    new Obstacle(this, 1000, 200);
    
    for(let i=0;i<this.nball;i++){
      this.allballs.add(new Ball(this,Phaser.Math.Between(100, 1800),Phaser.Math.Between(100, 400),96));
    }
    this.spawn();


    this.cameras.main.startFollow(this.player);

    this.cameras.main.followOffset.set(0, 0);
    
  }

  /**
   * Genera una estrella en una de las bases del escenario
   * @param {Array<Base>} from Lista de bases sobre las que se puede crear una estrella
   * Si es null, entonces se crea aleatoriamente sobre cualquiera de las bases existentes
   */
  spawn(from = null) {
    Phaser.Math.RND.pick(from || this.bases.children.entries).spawn();
  }

  /**
   * Método que se ejecuta al coger una estrella. Se pasa la base
   * sobre la que estaba la estrella cogida para evitar repeticiones
   * @param {Base} base La base sobre la que estaba la estrella que se ha cogido
   */
  starPickt (base) {
    this.player.point();
      if (this.player.score == this.stars) {
        this.scene.start('end');
      }
      else {
        let s = this.bases.children.entries;
        this.spawn(s.filter(o => o !== base));

      }
  }
}