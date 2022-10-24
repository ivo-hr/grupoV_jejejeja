import Star from '../star.js';
import Bullet from '../bullet.js';
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Player extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor del jugador
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   */
  constructor(scene, x, y) {
    super(scene, x, y, 'player');
    this.score = 0;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    // Queremos que el jugador no se salga de los límites del mundo
    this.body.setCollideWorldBounds();
    this.body.setGravity(0,300);
    this.speed = 300;
    this.jumpSpeed = -400;
    // Esta label es la UI en la que pondremos la puntuación del jugador
    this.label = this.scene.add.text(10, 10, "");
    this.label.setScrollFactor(0);
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.keys=this.scene.input.keyboard.addKeys('W,S,A,D,SPACE');
    this.updateScore();
    this.available=true;

    this.scene.anims.create({
      key: 'movingplayer',
      frames: scene.anims.generateFrameNumbers('hand', { start: 0, end: 3 }),
      frameRate: 7,
      repeat: -1

    })

    this.scene.anims.create({
			key: 'hyperbeam',
			frames: scene.anims.generateFrameNumbers('hand', {start:4, end:5}),
			frameRate: 5,
			repeat: 0
		});

    this.on('animationcomplete', end =>{ //evento que se ejecuta cuando una animación ha terminado
			//console.log(this.anims.currentAnim.key)
			if(this.anims.currentAnim.key === 'hyperbeam'){ //comprobamos si la animación que ha terminado es 'attack'
				this.play('movingplayer'); //ejecutamos la animación 'idle'
			}
			
		})
    this.play('movingplayer');
  }

  /**
   * El jugador ha recogido una estrella por lo que este método añade un punto y
   * actualiza la UI con la puntuación actual.
   */
  point() {
    this.score++;
    this.updateScore();
  }

  lesspoint() {
    this.score--;
    this.updateScore();
  }
  
  /**
   * Actualiza la UI con la puntuación actual
   */
  updateScore() {
    this.label.text = 'Score: ' + this.score;
  }

  setable(){
    this.available=true;
  }

  able(){
    
      let timer=this.scene.time.addEvent({
        delay: 2000, 
        callback: this.setable,
        callbackScope: this,
     });
    
    
  }

  /**
   * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
   * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
   * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
   * @override
   */
  preUpdate(t,dt) {
    super.preUpdate(t,dt);
    
    /*if (this.cursors.up.isDown && this.body.onFloor()) {
      this.body.setVelocityY(this.jumpSpeed);
    }
    if (this.cursors.left.isDown) {
   
      this.body.setVelocityX(-this.speed);
    }
    else if (this.cursors.right.isDown) {
      this.body.setVelocityX(this.speed);
    }
    else {
      this.body.setVelocityX(0);
    }*/

    //if(this.keys.S.isDown&&this.available){
    if(Phaser.Input.Keyboard.JustDown(this.keys.SPACE)&&this.available){
      this.bullet = new Bullet(this.scene,this.x,this.y);
      this.available=false;
      this.able();
    }
    /*if(!this.available){
      let timer=this.scene.time.addEvent({
        delay: 2000, 
        callback: this.able,
        callbackScope: this,
    });
    }
    /*
    //No funciona
    this.scene.input.keyboard.on("keydown",function(event){
     
    switch(event.keys){
        case "A":
          this.body.setVelocityX(-this.speed);
        break;
        case "D":
          this.body.setVelocityX(this.speed);
        break;
        case "W":
          if (this.body.onFloor()) {
            this.body.setVelocityY(this.jumpSpeed);
          }
        break;
      }
      event.preventDefault();
    })*/

    //Con las teclas WASD variable keys //Funciona
    if (this.keys.W.isDown && this.body.onFloor()) {
      this.body.setVelocityY(this.jumpSpeed);
    }
    else if (this.keys.S.isDown) {
      this.body.setVelocityY(-this.jumpSpeed*2/3);
    }
    if (this.keys.A.isDown) {
   
      this.body.setVelocityX(-this.speed);
    }
    else if (this.keys.D.isDown) {
      this.body.setVelocityX(this.speed);
    }
    else {
      this.body.setVelocityX(0);
    }
    
    
    
    
  }
}
    
    
  
  

