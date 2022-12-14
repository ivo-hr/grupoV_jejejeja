import Platform from './platform.js';
import Player from './characters/player.js';
import Obstacle from './obstacle.js';
import Ball from './ball.js';
import Enemy from './characters/enemy.js';
import Bird from './characters/bird.js';
import Baby from './characters/baby.js';
import Rain from './hazards/rain.js';
import PaintBucket from './hazards/paintBucket.js';

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
    
    this.cameras.main.setBounds(0, 150, 1000 * 2, 180 * 2);
    //delimita limites del mundo
    this.bounds = this.physics.world.setBounds(0, 0, 1000 * 2, 250 * 2);

    //this.stars = 3;
    this.addParallaxImages();

    this.cfgScreen = this.scene.get('Config');

    this.musicConfig = this.cfgScreen.musicConfig;
    this.sfxConfig = this.cfgScreen.sfxConfig;

    const map = this.make.tilemap({ key: 'lvlP' });
    const tileset = map.addTilesetImage('tumama', 'tiles');
    const layer2 = map.createLayer('Building', tileset, 0, 200);
    this.layer3 = map.createLayer('Toldos', tileset, 0, 200);
    this.layer1 = map.createLayer('Collide', tileset, 0, 200);
    this.layer4 = map.createLayer('Bancos', tileset, 0, 200);
    this.layer5 = map.createLayer('Suelo', tileset, 0, 200);
    this.layer3.setCollisionByProperty({collides: true});
    this.layer3.forEachTile(tile => {
      if (tile.properties["Atravesable"]) {
        tile.setCollision(false, false, true, false);
      }
    });
    this.layer4.setCollisionByProperty({collides: true});
    this.layer4.forEachTile(tile => {
      if (tile.properties["Atravesable"]) {
        tile.setCollision(false, false, true, false);
      }
    });
    this.layer1.setCollisionByExclusion([-1], true);
    this.layer5.setCollisionByExclusion([-1], true);
    layer2.setCollisionByExclusion([-1], false);

    // this.bases = this.add.group();
    this.player = new Player(this, 200, 300);
    this.player.generateSounds(this.sfxConfig);
    this.allEnemies = this.add.group();
    this.obstacles = this.add.group();

    this.physics.add.collider(this.player, this.layer1);
    this.physics.add.collider(this.player, this.layer3);
    this.physics.add.collider(this.player, this.layer4);
    this.physics.add.collider(this.player, this.layer5);

    // new Platform(this, this.player, this.bases, 150, 500);
    // new Platform(this, this.player, this.bases, 850, 450);
    // new Platform(this, this.player, this.bases, 700, 500);
    // new Platform(this, this.player, this.bases, 400, 400);
    // new Platform(this, this.player, this.bases, 1000, 450);
    this.obstacles.add(new Rain(this, 1000, 250, 0.5, 200));
    this.obstacles.add(new PaintBucket(this, 650, 150, 0.5));
    
    
    for(let i=0;i<4;i++){
      let baby = new Baby(this, 100+i*300, 450, 90);
      this.allEnemies.add(baby);
    }
    let birb = new Bird(this, 300, 250, 96);
    birb.sfxConfig = this.soundConfig;
    this.allEnemies.add(birb);

    // this.spawn();


    this.cameras.main.startFollow(this.player);

    this.cameras.main.followOffset.set(0, 0);
    


  

    this.music = this.sound.add('game1', this.musicConfig);
    this.music.play();
  }

  addParallaxImages(){
    
    // this.add.image(0,0,'background1').setOrigin(0,0).setScrollFactor(0.1, 0);
    // this.add.image(0,0,'background2').setOrigin(0,0).setScrollFactor(0.2, 0);
    // this.add.image(0,0,'background3').setOrigin(0,0).setScrollFactor(0.3, 0);
    // this.add.image(0,0,'background4').setOrigin(0,0).setScrollFactor(0.4, 0);
    // this.add.image(0,0,'background5').setOrigin(0,0).setScrollFactor(0.8, 0);

    this.addParallaxImage('background1', 15, 0.1)
    this.addParallaxImage('background2', 15, 0.2)
    this.addParallaxImage('background3', 15, 0.3)
    this.addParallaxImage('background4', 15, 0.4)
    this.addParallaxImage('background5', 15, 0.8, 0.2, 50)


  }
  addParallaxImage(imageKey, count, scrollFactorX, scrollFactorY = 0, offset = 0){

    for(let i = 0; i < count;i++){
      this.add.image(i*500,offset,imageKey).setOrigin(0,0).setScrollFactor(scrollFactorX, scrollFactorY);
    }

  }
  /**
   * Genera una estrella en una de las bases del escenario
   * @param {Array<Base>} from Lista de bases sobre las que se puede crear una estrella
   * Si es null, entonces se crea aleatoriamente sobre cualquiera de las bases existentes
   */
  // spawn(from = null) {
  //   Phaser.Math.RND.pick(from || this.bases.children.entries).spawn();
  // }

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
      // else {
      //   let s = this.bases.children.entries;
      //   this.spawn(s.filter(o => o !== base));

      // }
  }
  gameover(){
    this.scene.start('Menu');
  }
}