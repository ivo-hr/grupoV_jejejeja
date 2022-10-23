import Star from './star.js';
/**
 * Clase que representa el comportamiento de las balas 
 */
export default class BulletRes extends Phaser.Physics.Arcade.Sprite {
  
  /**
   * Constructor del jugador
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   */
  constructor(scene, x, y) {
    super(scene, x, y, 'star');
    this.scene.add.existing(this);
    this.setVelocityY(-100);
    //this.scene.physics.add.existing(this);
  }

  
  /*dispara(x,y){
    this.body.reset(x, y);

        this.setActive(true);
        this.setVisible(true);

        this.setVelocityY(-100);
  }*/
  
  
  

  /**
   * Métodos preUpdate de Phaser. 
   * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
   * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
   * @override
   */
  preUpdate(t,dt) {
    super.preUpdate(t,dt);
    
   if(this.y<0){
     this.setActive(false);
     this.setVisible(false);
   }
    
    
  }
}
    
    
  
  

