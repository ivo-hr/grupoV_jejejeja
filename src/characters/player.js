import Bullet from '../bullet.js';
import Laser from '../laser.js';
import Dashield from "../dashield.js"
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
    this.maxHealth = 10;
    this.health = this.maxHealth;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    // Queremos que el jugador no se salga de los límites del mundo
    this.body.setCollideWorldBounds();
    this.gforce=600;
    this.body.setGravity(0,this.gforce);
    this.originalSpeed = 200;
    this.speed = this.originalSpeed;
    this.slowedTime = 0;
    this.isSlowed = false;
    this.jumpSpeed = -380;
    // Esta label es la UI en la que pondremos la puntuación del jugador
    let posX = this.scene.cameras.main.centerX*0.1;
    let posY = this.scene.cameras.main.height*0.1;
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.keys=this.scene.input.keyboard.addKeys('W,S,A,D,SPACE,H,T,L,P');
    this.healthBar = new HealthBar(this.scene, posX, posY, this.health);
    this.healthBar.setScrollFactor(0);

    //para controladores
    this.available=true;
    this.stand=true;
    this.invincible=false;
    this.notmove=false;

    //para animaciones
    this.quieto=false;
    this.saltado=false;
    this.damaged=false;

    this.body.setSize(60, 40);


    //estados de disparo
    const estados = {
      Normal: 0,
      RaLaser: 1,
      ElDash: 2
    }

    this.state= 2;

    this.flipped=false;
    this.facingRight=true;

    //creacion de animaciones
    this.scene.anims.create({
      key: 'movingplayer',
      frames: scene.anims.generateFrameNumbers('hand', { start: 4, end: 7 }),
      frameRate: 12,
      repeat: -1

    })

    
    this.scene.anims.create({
      key: 'idlePlayer',
      frames: scene.anims.generateFrameNumbers('hand', { start: 0, end: 1 }),
      frameRate: 6,
      repeat: -1

    })
    
    this.scene.anims.create({
      key: 'jumpPlayer',
      frames: scene.anims.generateFrameNumbers('hand', { start: 16, end: 20 }),
      frameRate: 9,
      repeat: 0

    })

    
    this.scene.anims.create({
      key: 'takeDamagePlayer',
      frames: scene.anims.generateFrameNumbers('hand', { start: 2, end: 3 }),
      frameRate: 8,
      repeat: -1

    })


    this.scene.anims.create({
			key: 'hyperbeam',
			frames: scene.anims.generateFrameNumbers('hand', {start:8, end:9}),
			frameRate: 9,
			repeat: -1
		});

    this.scene.anims.create({
			key: 'gun',
			frames: scene.anims.generateFrameNumbers('hand', {start:10, end:11}),
			frameRate: 9,
			repeat: 0
		});

    this.scene.anims.create({
			key: 'dash',
			frames: scene.anims.generateFrameNumbers('hand', {start:12, end:15}),
			frameRate: 9,
			repeat: 0
		});
    

    //al finalizar las animaciones, se lanza las balas
    this.onAnimationComplete('hyperbeam', 'idlePlayer');
    this.onAnimationComplete('gun', 'idlePlayer');
    this.onAnimationComplete('dash', 'idlePlayer');

    this.play('idlePlayer');


  }

  //lanza la animacion de disparo
  onAnimationComplete(currentAnimation, nextAnimation){
    this.on('animationcomplete', end =>{ //evento que se ejecuta cuando una animación ha terminado
			//console.log(this.anims.currentAnim.key)
			if(this.anims.currentAnim.key === currentAnimation){ //comprobamos si la animación que ha terminado es 'attack'
				this.play(nextAnimation); //ejecutamos la animación 'idle'
			}
			
		})
  }

  //resta vida al jugador
  minusHealth(num) {
    if(num > 0) {
      this.scene.damage += num;
    }
    this.health -= num;
    if(this.health < 0){
      this.health = 0;
    }
    else if(this.health > this.maxHealth){
      this.health = this.maxHealth;
    }
    this.healthBar.update(num);
    if (this.health <= 0) {
      this.death.play();
      
      this.scene.gameOver();
    }
    else
      this.dmg.play();

    // console.log(this.healthBar.value);
    // console.log(this.health);
  }

  //funciones de estado de animacion
  setable(){
    if(!this.available)
      this.available=true;

  
  }

  end(){
   
    if(!this.stand)
      this.stand=true;
    this.play('idlePlayer');
  }

  

  vulnerable(){
    if(this.invincible){
      this.invincible=false;
      this.play('idlePlayer');
    }
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

//funciones de invulnerabilidad
invincibility(){
    
  let timer=this.scene.time.addEvent({
    delay: 1000, 
    callback: this.vulnerable,
    callbackScope: this,
 });


}
setInvincible(){
  this.invincible=true;
  this.playerdmg();
  this.invincibility();
}

//funciones de movimiento
mov(){
  this.notmove=false;
  this.body.setGravity(0,this.gforce);
  this.play('idlePlayer');
}

inmov(){
    
  let timer=this.scene.time.addEvent({
    delay: 1000, 
    callback: this.mov,
    callbackScope: this,
 });


}

//funciones de laser y dash
laserable(){
  
  let timer=this.scene.time.addEvent({
    delay: 5000, 
    callback: this.setable,
    callbackScope: this,
 });


}

dashable(){
  
  let timer=this.scene.time.addEvent({
    delay: 1500, 
    callback: this.setable,
    callbackScope: this,
 });


}

//controlador de animaciones
setActiveAnim(){
    if(this.quieto){
      this.play('idlePlayer')
    }
    else{
      this.play('movingplayer')
    }
}

setJumpAnim(){
  this.saltado=true;
  this.play('jumpPlayer')
}

isgood(){
  this.damaged=false;
  this.play('idlePlayer');
}

timedmg(){
  let timer=this.scene.time.addEvent({
    delay: 300, 
    callback: this.isgood,
    callbackScope: this,
 });
}

playerdmg(){
  this.play('takeDamagePlayer');
  this.damaged=true;
  this.timedmg();
}

  /**
   * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
   * Como se puede ver, las colisiones con player se hacen desde el resto de objetos
   * @override
   */
  preUpdate(t,dt) {
    super.preUpdate(t,dt);

    if(this.slowedTime > 0 && this.isSlowed){
      this.slowedTime --;
    }

    //input del jugador y movimiento y disparo
    if(Phaser.Input.Keyboard.JustDown(this.keys.SPACE)&&this.available){
      if(this.state===0){
        this.play('gun');
        if(this.facingRight)
          this.bullet = new Bullet(this.scene,this.x,this.y,400);
        else{
          this.bullet = new Bullet(this.scene,this.x,this.y,-400);
          this.bullet.setFlip(false,false);

        }
        this.available=false;
        this.able();

        this.shot.play();
      }
      else if(this.state===1){
        this.play('hyperbeam');
        if(this.facingRight)
          this.bullet = new Laser(this.scene,this.x+30,this.y,1);
        else{
          this.bullet = new Laser(this.scene,this.x-30,this.y,-1);
          this.bullet.setFlip(false,false);
  
        }
        this.available=false;
        this.notmove=true;
        this.inmov();
        this.laserable();
        this.body.setVelocityX(0);
        this.body.setVelocityY(0);
        this.body.setGravity(0,-100);

        this.laser.play();
      }
      else if(this.state===2){
        if(this.facingRight){
      
          this.scene.physics.moveTo(this,this.x+150,this.y,500,200)
          this.stand=false;
          this.available=false;
          this.dash();
          this.dashable();
          this.obdash=new Dashield(this.scene,this.x,this.y)
          this.play('dash');
        }
      
        else{
          this.scene.physics.moveTo(this,this.x-150,this.y,500,200)
          this.stand=false;
          this.available=false;
          this.dash();
          this.dashable();
          this.obdash=new Dashield(this.scene,this.x,this.y)
          this.play('dash');
        }

        this.shot.play();
      }

    }
    else if (Phaser.Input.Keyboard.JustDown(this.keys.T)) {
      if(this.facingRight)
        this.x+=300;
      else
        this.x+=-300;
        // console.log(this.height);
    }
    
    else if (Phaser.Input.Keyboard.JustDown(this.keys.P)) {
      //make a pause menu
      this.scene.scene.launch('pauseMenu');
      this.scene.scene.pause();
    }

    //Con las teclas WASD variable keys
    if(!this.notmove&&this.stand){
      if (this.keys.W.isDown && this.body.onFloor()) {
        this.body.setVelocityY(this.jumpSpeed);

        this.jump.play();
        if(!this.saltado&&!this.damaged){
          
          this.setJumpAnim();
        }
      }
      if (this.keys.S.isDown) {

        this.body.setVelocityY(-this.jumpSpeed*3/4);
        /*if(this.quieto&&!this.saltado){
          this.quieto=false;
          this.setActiveAnim();
        }*/
      }
      if (this.keys.A.isDown) {
        if(this.stand){
          this.facingRight=false;
   
          this.body.setVelocityX(-this.speed);
          if(this.quieto&&this.body.onFloor()){
            this.quieto=false;
            this.setActiveAnim();
          }
        }
      }
      else if (this.keys.D.isDown) {
        if(this.stand){
          this.facingRight=true;
        }

        this.body.setVelocityX(this.speed);
        if(this.quieto&&this.body.onFloor()&&!this.damaged){
          this.quieto=false;
          this.setActiveAnim();
          
        }
      }
  
      else {
        
        this.body.setVelocityX(0);
        if(!this.quieto&&this.body.onFloor()&!this.damaged){
          this.quieto=true;
          this.setActiveAnim();
        }
      }

      if(this.saltado){
        this.saltado=false;
        if(this.body.newVelocity.y===0&&this.body.onFloor()&&!this.damaged){
          this.play('idlePlayer');
        } 
      }

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
      // console.log(this.speed);
    }
    
  }

  reduceSpeed(percentage){ //Reduce la velocidad del jugador
    let reducedSpeed = this.speed * percentage/100;
    this.speed -= reducedSpeed;
    // console.log(this.speed);
  }

  restoreSpeed(){ //Restaura la velocidad del jugador
    this.speed = this.originalSpeed; 
  }

  slowDown(percentage, time){ //Reduce la velocidad del jugador durante un tiempo
    this.reduceSpeed(percentage);
    this.slowedTime = time;
    this.isSlowed = true;
  }



  //genera los sonidos
  generateSounds(sfxConfig){
    this.pengu = this.scene.sound.add('pengu', sfxConfig);
    this.death = this.scene.sound.add('death', sfxConfig);
    this.shot = this.scene.sound.add('shot', sfxConfig);
    this.laser = this.scene.sound.add('laser', sfxConfig);
    this.dmg = this.scene.sound.add('dmg', sfxConfig);
    this.jump = this.scene.sound.add('jump', sfxConfig);
    this.killenemy = this.scene.sound.add('enemyKill', sfxConfig);
  }

  //añade puntuacion al matar enemigos
  addScore(score){
    this.killenemy.play();
    this.score += score;
    this.scene.scoreDial.update(score);
  }
  //remember this is a function
}