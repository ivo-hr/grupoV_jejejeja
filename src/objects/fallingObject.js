export default class FallingObject extends Phaser.GameObjects.Sprite {

    constructor(scene, player, x, y, nombreImg) {
      super(scene, x, y, nombreImg); 
  
      this.player=player;
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this);
      this.body.setCollideWorldBounds(); //Collision with the limits of the world
      this.body.setGravity(0,300);

      this.body.moves=true;  //Whether the Body's position and rotation are affected by its velocity, acceleration, drag, and gravity.
      this.y -= this.height;
  
    }
  
    preUpdate() {
      super.preUpdate();

    if (this.scene.physics.overlap(this.scene.player, this)) {
        //this.scene.player.lesspoint()
        this.destroy();
        this.createParticlesFallingbj();

      }
  
    }
  

    //Handles the collision with player and floor
    
    handleCollision(){
     if (this.scene.physics.overlap(this.scene.player, this)) {
        this.createParticlesFallingbj();

        //this.scene.player.lesspoint()
        this.destroy();

      }
      


    }
  
  
    /**
    * Handles the collision with player, and makes a breaking sound
    */
    handleCollisionPlayer() {
      //this.player.loseLife( this.nLifesLose);
      //this.fallingSound.play();
      this.createParticlesFallingbj();
      this.destroy();
    }
  
  
    /**
    * Handles the collision with floor and makes a breaking sound
    */
    handleCollisionFloor() {
      //this.fallingSound.play();
      this.createParticlesFallingbj();
      this.destroy();
    }
  
    
    /**
     * Create the particles of the F. Obj.
     */
    createParticlesFallingbj()
    {
    //   let deathParticles = this.scene.add.particles('fallingParticle');
    //   this.deathEmitter = deathParticles.createEmitter({
    //     x: -500,
    //     y: 300,
    //     speed: { min: -800, max: 800 },
    //     angle: { min: 0, max: 360 },
    //     scale: { start: 0.9, end: 0 },
    //     blendMode: 'SCREEN',
    //     //active: false,
    //     lifespan: 600,
    //     gravityY: 800
    //   });
    //   this.deathEmitter.explode(100, this.x,this.y);

    // var particles = this.scene.add.particles('fallingParticle');

    // var emitter = particles.createEmitter();

    // emitter.setPosition(this.x, this.y);
    // emitter.setSpeed(200);
    // emitter.setBlendMode(Phaser.BlendModes.ADD);

    }
  }