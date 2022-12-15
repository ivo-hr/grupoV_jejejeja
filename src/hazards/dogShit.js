export default class DogShit extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'dogshit');

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(); //Collision with the limits of the world 
        this.scene.physics.add.collider(this, this.scene.layer5);
        this.shitIsOnFloor = false;
    }

    preUpdate() {
        super.preUpdate();
        let timer = this.scene.time.addEvent({
            delay: 3000, 
            callback: this.onDestroy,
            callbackScope: this,
        });
        this.falling();
        this.handleCollision();
    }

    falling(){
        if(!this.shitIsOnFloor) this.body.setGravity(0, 350);
    }

    onDestroy() {
        this.destroy(this);
    }
    //Handles the collision with floor
    handleCollision() {
        if (this.scene.physics.collide(this.scene.layer5, this)) {
            this.shitIsOnFloor = true;
        }
        if (this.scene.physics.overlap(this.scene.player, this)) {
            if(!this.scene.player.invincible){
                this.scene.player.setInvincible();
                this.scene.player.minusHealth(1);
            }
            this.onDestroy();
        }
    }
}