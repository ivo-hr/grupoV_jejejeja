import Star from '../star.js';
import Bullet from '../bullet.js';
import HealthBar from "../healthbar.js";
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
    this.body.setGravity(0,600);
    this.speed = 200;
    this.jumpSpeed = -400;
    // Esta label es la UI en la que pondremos la puntuación del jugador
    let posX = this.scene.cameras.main.centerX*0.1;
    let posY = this.scene.cameras.main.height*0.1;
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.keys=this.scene.input.keyboard.addKeys('W,S,A,D,SPACE,H,T');
    this.healthBar = new HealthBar(this.scene, posX, posY, 100);
    this.healthBar.setScrollFactor(0);
    this.available=true;

    this.flipped=false;
    this.facingRight=true;

    this.scene.anims.create({
      key: 'movingplayer',
      frames: scene.anims.generateFrameNumbers('hand', { start: 0, end: 3 }),
      frameRate: 12,
      repeat: -1

    })

    this.scene.anims.create({
			key: 'hyperbeam',
			frames: scene.anims.generateFrameNumbers('hand', {start:3, end:5}),
			frameRate: 9,
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
    console.log(this.score)
    this.healthBar.update(-10);
  }

  lesspoint() {
    this.score--;
    console.log(this.score)
    this.healthBar.update(10);
  }
  
  /**
   * Actualiza la UI con la puntuación actual
   */

  setable(){
    this.available=true;
  }

  able(){
    
      let timer=this.scene.time.addEvent({
        delay: 500, 
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
      this.play('hyperbeam');
      this.on('animationcomplete', end =>{ 
      if(this.facingRight)
      this.bullet = new Bullet(this.scene,this.x,this.y,400);
      else{
        this.bullet = new Bullet(this.scene,this.x,this.y,-400);
        this.bullet.setFlip(false,false);
      }
      this.available=false;

      this.able();})
    }
    else if (Phaser.Input.Keyboard.JustDown(this.keys.T)) {
      if(this.facingRight)
      this.x+=300;
      else
      this.x+=-300;
    
    }

    else if (Phaser.Input.Keyboard.JustDown(this.keys.H)) {
      for(let i=0;i<10;i++){
        this.x+=10;
      }
    
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

      this.body.setVelocityY(-this.jumpSpeed*3/4);
    }
    if (this.keys.A.isDown) {
      this.facingRight=false;
   
      this.body.setVelocityX(-this.speed);
    }
    else if (this.keys.D.isDown) {
      this.facingRight=true;
      this.body.setVelocityX(this.speed);
    }
    
    else {
      this.body.setVelocityX(0);
    }
    if(!this.facingRight&&!this.flipped){
      this.setFlip(true, false);
      this.flipped=true;
    }
   
    if(this.facingRight){
      this.setFlip(false, false);
      this.flipped=false;
    }
    
  }
}
    
    
  
  

