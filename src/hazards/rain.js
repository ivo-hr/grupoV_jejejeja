export default class Rain extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, tam, h, w) {
        super(scene, x, y, 'rain');
  
        this.initialize(tam, h, w);
        this.animation();
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true);
        this.lastHit = 0;
    }

    initialize(tam, h, w){
        this.size = tam;  
        this.sizeManag();
        this.displayHeight = h;
        this.displayWeigth = w;
    }
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
    preUpdate(time, delta){
        super.preUpdate(time, delta);
        if (this.scene.physics.overlap(this.scene.player, this) && this.lastHit == 0) {
            this.scene.player.minusHealth(1);
            this.lastHit = 60;
            console.log("colision");
        }
        else if(this.lastHit > 0){
            this.lastHit -= 1;
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