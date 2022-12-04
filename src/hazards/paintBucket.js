export default class PaintBucket extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor de Star
     * @param {Sceme} scene Escena en la que aparece la estrella
     * @param {Base} base Objeto base sobre el que se va a dibujar la estrella
     * @param {number} x coordenada x
     * @param {number} y coordenada y
     */
    constructor(scene, x, y) {
      super(scene, x, y, 'bucket');
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this, true);
      
    }
  
    /**
     * Redefinición del preUpdate de Phaser
     * @override
     */
    preUpdate() {
      // IMPORTANTE: Si no ponemos esta instrucción y el sprite está animado
      // no se podrá ejecutar la animación del sprite. 
      super.preUpdate();
      if (this.scene.physics.overlap(this.scene.player, this)) {
          this.scene.player.minusHealth(1);
          this.destroy();
      }
    }
  }