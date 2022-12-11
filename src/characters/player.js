import Star from '../star.js';
import Bullet from '../bullet.js';
import Laser from '../laser.js';
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
    this.score = 100;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    // Queremos que el jugador no se salga de los límites del mundo
    this.body.setCollideWorldBounds();
    this.body.setGravity(0,600);
    this.originalSpeed = 200;
    this.speed = this.originalSpeed;
    this.slowedTime = 0;
    this.isSlowed = false;
    this.jumpSpeed = -450;
    // Esta label es la UI en la que pondremos la puntuación del jugador
    let posX = this.scene.cameras.main.centerX*0.1;
    let posY = this.scene.cameras.main.height*0.1;
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.keys=this.scene.input.keyboard.addKeys('W,S,A,D,SPACE,H,T,L');
    this.healthBar = new HealthBar(this.scene, posX, posY, 100);
    this.healthBar.setScrollFactor(0);
    this.available=true;
    this.stand=true;


    const estados = {
      Normal: 0,
      RaLaser: 1,
      ElDash: 2
    }

    this.state= 0;

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

  minusHealth(num) {
    this.healthBar.update(num);
    this.dmg.play();
  }
  
  /**
   * Actualiza la UI con la puntuación actual
   */

  setable(){
    if(!this.available)
    this.available=true;

  
  }

  end(){
   

    if(!this.stand)
    this.stand=true;
  }


  able(){
    
      let timer=this.scene.time.addEvent({
        delay: 500, 
        callback: this.setable,
        callbackScope: this,
     });
    
    
  }

  dash(){
    
    let timer=this.scene.time.addEvent({
      delay: 200, 
      callback: this.end,
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

    if(this.body.checkWorldBounds()){
      console.log("colisionWorld");
    }
    if(this.slowedTime > 0 && this.isSlowed){
        this.slowedTime --;
    }

    
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
      if(this.state===0){
        this.play('hyperbeam');
        if(this.facingRight)
          this.bullet = new Bullet(this.scene,this.x,this.y,400);
        else{
          this.bullet = new Bullet(this.scene,this.x,this.y,-400);
          this.bullet.setFlip(false,false);

        }
        this.available=false;
        this.able();

        this.pengu.play();
      }
      else if(this.state===1){
        this.play('hyperbeam');
        if(this.facingRight)
        this.bullet = new Laser(this.scene,this.x,this.y,1);
        else{
        this.bullet = new Laser(this.scene,this.x,this.y,-1);
        this.bullet.setFlip(false,false);
  
        }
        this.available=false;
        this.able();

        this.laser.play();
      }
      else if(this.state===2){
        if(this.facingRight){
      
          this.scene.physics.moveTo(this,this.x+300,this.y,300,200)
          this.stand=false;
          this.dash();
          }
      
          else{
          this.scene.physics.moveTo(this,this.x-300,this.y,300,200)
          this.stand=false;
          this.dash();
    
          }

          this.shot.play();
      }

    }
    else if (Phaser.Input.Keyboard.JustDown(this.keys.T)) {
      if(this.facingRight)
      this.x+=300;
      else
      this.x+=-300;
      console.log(this.height);
    
      this.shot.play();

    }
 /*
    if (Phaser.Input.Keyboard.JustDown(this.keys.H)) {
      if(this.facingRight){
      
      this.scene.physics.moveTo(this,this.x+300,this.y,300,200)
      this.stand=false;
      this.dash();
      }
  
      else{
      this.scene.physics.moveTo(this,this.x-300,this.y,300,200)
      this.stand=false;
      this.dash();

      }
    }
    
    if(Phaser.Input.Keyboard.JustDown(this.keys.L)&&this.available){
      this.play('hyperbeam');
      if(this.facingRight)
      this.bullet = new Laser(this.scene,this.x,this.y,1);
      else{
      this.bullet = new Laser(this.scene,this.x,this.y,-1);
      this.bullet.setFlip(false,false);

      }
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

      this.jump.play();
    }
    if (this.keys.S.isDown) {

      this.body.setVelocityY(-this.jumpSpeed*3/4);
    }
    if (this.keys.A.isDown) {
      if(this.stand){
      this.facingRight=false;
   
      this.body.setVelocityX(-this.speed);
    }
    }
    else if (this.keys.D.isDown) {
      if(this.stand){

      this.facingRight=true;

      this.body.setVelocityX(this.speed);
      }
    }

   
    
    else {
      if(this.stand)
      this.body.setVelocityX(0);
    }
   
    if(!this.facingRight&&!this.flipped){
      this.setFlip(true, false);
      this.flipped=true;
    }
   
    if(this.facingRight&&this.flipped){
      this.setFlip(false, false);
      this.flipped=false;
    }

    if(this.slowedTime == 0 && this.isSlowed){
      this.restoreSpeed(); 
      this.isSlowed = false;
      console.log(this.speed);
    }
    
  }

  reduceSpeed(percentage){ //Reduce la velocidad del jugador
    let reducedSpeed = this.speed * percentage/100;
    this.speed -= reducedSpeed;
    console.log(this.speed);
  }

  restoreSpeed(){ //Restaura la velocidad del jugador
    this.speed = this.originalSpeed; 
  }

  slowDown(percentage, time){ //Reduce la velocidad del jugador durante un tiempo
    this.reduceSpeed(percentage);
    this.slowedTime = time;
    this.isSlowed = true;
  }



  generateSounds(sfxConfig){
    this.pengu = this.scene.sound.add('pengu', sfxConfig);
    this.shot = this.scene.sound.add('shot', sfxConfig);
    this.laser = this.scene.sound.add('laser', sfxConfig);
    this.dmg = this.scene.sound.add('dmg', sfxConfig);
    this.jump = this.scene.sound.add('jump', sfxConfig);
  }

  //remember this is a function
}
    
    
  
  

