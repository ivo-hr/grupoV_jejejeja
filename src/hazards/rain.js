export default class Rain extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, tam, h, w) {
        super(scene, x, y, 'rain');
  
        this.initialize(tam, h, w);
        this.animation();
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true);
        this.hitable = true;
    }

    //inicializa el objeto
    initialize(tam, h, w){
        this.size = tam;  
        this.sizeManag();
        this.displayHeight = h;
        this.displayWeigth = w;
    }

    //Redimensiona el objeto en funcion de su tamaño
    sizeManag(){
        if(this.size == 0){
            this.setScale(0.25);
        }
        else if(this.size == 1){
            this.setScale(0.5);
        }
        else{
            this.setScale(1);
        }
    }

    //Hace que el objeto no pueda dañar al jugador durante un tiempo
    dable(){  
        let timer=this.scene.time.addEvent({
          delay: 1500, 
          callback: this.setHitable,
          callbackScope: this,
       });
    }
    setHitable(){
        if(!this.hitable) 
        this.hitable = true;
    }
    preUpdate(time, delta){
        super.preUpdate(time, delta);
        if (this.scene.physics.overlap(this.scene.player, this) && this.hitable && !this.scene.player.invincible) {
            this.scene.player.minusHealth(1);
            this.hitable = false;
            this.dable();
        }
    }
    animation(){
        this.anims.create({
            key: 'rain',
            frames: this.anims.generateFrameNumbers('rain', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.play('rain', true);
    }
}