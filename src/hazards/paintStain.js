export default class PaintStain extends Phaser.GameObjects.Sprite {
    
    /**
     * Constructor de Star
     * @param {Sceme} scene Escena en la que aparece la estrella
     * @param {Base} base Objeto base sobre el que se va a dibujar la estrella
     * @param {number} x coordenada x
     * @param {number} y coordenada y
     */
     constructor(scene, x, y, tam) {
        super(scene, x, y, 'paint');
        this.initialize(tam);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds();
        this.scene.physics.add.collider(this, this.scene.layer3);
        this.scene.physics.add.collider(this, this.scene.layer5);
      }
      initialize(tam){
        this.size = tam;  
        this.sizeManag();
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
      preUpdate(){
        super.preUpdate();
        if (this.scene.physics.overlap(this.scene.player, this)) {
            this.scene.player.slowDown(40, 1);
        }
      }

}