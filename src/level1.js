import Player from './characters/player.js';
import Obstacle from './obstacle.js';
import Enemy from './characters/enemy.js';
import Bird from './characters/bird.js';
import Baby from './characters/baby.js';
import Rain from './hazards/rain.js';
import PaintBucket from './hazards/paintBucket.js';
import Drunk from './characters/drunk.js';
import Dog from './characters/dog.js';

import scoreDial from './score.js';
import PowerUp from './powerUps/powerUp.js';
import PowerHealth from './powerUps/powerHealth.js';
import EndingFlag from './hazards/endingFlag.js';

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

    this.cameras.main.setBounds(0, -100, 1650 * 2, 270 * 2);
    //delimita limites del mundo
    this.bounds = this.physics.world.setBounds(0, -100, 1650 * 2, 270 * 2);

    //this.stars = 3;
    this.addParallaxImages();

    this.cfgScreen = this.scene.get('Config');

    this.musicConfig = this.cfgScreen.musicConfig;
    this.sfxConfig = this.cfgScreen.sfxConfig;

    const map = this.make.tilemap({ key: 'lvlP' });
    const tileset = map.addTilesetImage('tumama', 'tiles');
    const layer2 = map.createLayer('Building', tileset, 0, 0);
    this.layer3 = map.createLayer('Toldos', tileset, 0, 0);
    this.layer1 = map.createLayer('Collide', tileset, 0, 0);
    this.layer4 = map.createLayer('Bancos', tileset, 0, 0);
    this.layer5 = map.createLayer('Suelo', tileset, 0, 0);
    this.layer3.setCollisionByProperty({ collides: true });
    this.layer3.forEachTile(tile => {
    if (tile.properties["Atravesable"]) {
        tile.setCollision(false, false, true, false);
      }
    });
    this.layer4.setCollisionByProperty({ collides: true });
    this.layer4.forEachTile(tile => {
    if (tile.properties["Atravesable"]) {
        tile.setCollision(false, false, true, false);
      }
    });
    this.layer1.setCollisionByExclusion([-1], true);
    this.layer5.setCollisionByExclusion([-1], true);
    layer2.setCollisionByExclusion([-1], false);
    this.floorLevel = 380;

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
    // let rain = new Rain(this, 1000, 250, 0.5, 200);

    // this.obstacles.add(rain);
    // let paintBucket = new PaintBucket(this, 650, 150, 0.5);
    // paintBucket.generateSounds(this.sfxConfig);
    // this.obstacles.add(paintBucket);
    
    this.maxDialValue = 0;
    let baby = new Baby(this, 300, this.floorLevel, 90);
    baby.setScore(baby.myScore);
    this.moralDialValue += baby.myScore;
    baby.generateSounds(this.sfxConfig);
    this.allEnemies.add(baby);

    let baby2 = new Baby(this, 1200, this.floorLevel, 90);
    baby2.setScore(baby2.myScore);
    this.moralDialValue += baby2.myScore;
    baby2.generateSounds(this.sfxConfig);
    this.allEnemies.add(baby2);

    // let birb = new Bird(this, 300, 250, 96);
    // birb.setScore(birb.myScore);
    // this.moralDialValue += birb.myScore;
    // birb.generateSounds(this.sfxConfig);
    // this.allEnemies.add(birb);

    // let borracho = new Drunk(this, 200, this.floorLevel, 96);
    // this.allEnemies.add(borracho);
    // borracho.setScore(borracho.myScore);
    // this.moralDialValue += borracho.myScore;

    // let dog = new Dog(this, 400, this.floorLevel, 60);
    // dog.setScore(dog.myScore);
    // this.moralDialValue += dog.myScore;
    // this.allEnemies.add(dog);

    //crea el dial de moral
    this.scoreDial = new scoreDial(this, 450, 0, this.maxDialVal);
    
    //crea obstaculos
    this.obstacles.add(new PowerUp(this, 300, 300, 'powerPunch', 2));
    this.obstacles.add(new PowerUp(this, 400, 300, 'powerShot', 0));
    this.obstacles.add(new PowerUp(this, 500, 300, 'powerHyperbeam', 1));
    this.obstacles.add(new PowerHealth(this, 600, 300));

    //crea la bandera final
    this.obstacles.add(new EndingFlag(this, 600, 300));

    //crea el texto de tiempo
    this.newtime=0;
    this.restarted=true;
    this.timeText=this.add.text(20,5, "Time: ", 
    {font: "24px", fill: '#000000', stroke: '#FFF', strokeThickness: 3}); 
    
    this.timeText.setScrollFactor(0);


    //camaras sigue al jugador
    this.cameras.main.startFollow(this.player);

    this.cameras.main.followOffset.set(0, 0);


  // si no hay musica, la crea y la reproduce
    if (this.music == null)
      this.music = this.sound.add('game1', this.musicConfig);

      this.music.play();


  }

  //creacion de imagenes de fondo
  addParallaxImages() {

    this.addParallaxImage('background1', 15, 0.1)
    this.addParallaxImage('background2', 15, 0.2)
    this.addParallaxImage('background3', 15, 0.3)
    this.addParallaxImage('background4', 15, 0.4)
    this.addParallaxImage('background5', 15, 0.8, 0.2, 50)


  }
  //añade imagenes de fondo
  addParallaxImage(imageKey, count, scrollFactorX, scrollFactorY = 0, offset = 0) {

    for (let i = 0; i < count; i++) {
      this.add.image(i * 500, offset, imageKey).setOrigin(0, 0).setScrollFactor(scrollFactorX, scrollFactorY);
    }

  }

  update(time){
    if(this.restarted){
      this.newtime=time;
      this.restarted=false;
    }
    this.gameRuntime = (time-this.newtime) * 0.001; 
    this.timeText.setText("Time: " + Math.round(this.gameRuntime));
  }



 //si el jugador muere, se para la musica y se llama a la escena de gameOver
  gameOver() {
    this.music.stop();
    this.scene.stop();
    this.registry.destroy();
    this.events.off();

    let GameOver = this.scene.get('gameOver');

    GameOver.scene.restart();
  }
//si el jugador gana, se para la musica y se llama a la escena de gameWin
  gameWin() {
    this.music.stop();
    this.scene.stop();
    this.registry.destroy();
    this.events.off();

    let GameWin = this.scene.get('gameWin');

    GameWin.moralitySet(this.scoreDial.getScore(), this.maxDialVal, 100 /*aqui va la variable puntuación */);

    GameWin.scene.restart();
  }
}