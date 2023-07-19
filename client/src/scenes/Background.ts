import Phaser from "phaser";

export default class Background extends Phaser.Scene {
  constructor() {
    super({ key: "background" });
  }

  preload() {
    this.load.image("background", "infinity_wall.png");
    this.load.image("ground", "floor.png");
    this.load.image("rock", "falling_rock.png");
    this.load.image("red", "fire.png");
    this.load.image("player1_climb1", "Biker_climb_1.png");
    this.load.image("player1", "Biker_climb_2.png");
    this.load.image("player1_climb3", "Biker_climb_3.png");
    this.load.image("player1_climb7", "Biker_climb_7.png");
    this.load.image("player1_climb6", "Biker_climb_6.png");
    this.load.image("player1_walk", "Biker_punch_1.png");

    this.load.spritesheet("player1_climb", "Biker_climb.png", {
      frameWidth: 48,
      frameHeight: 48,
    });

    //this.load.image("base_tiles", "sunny-land/assets/environment/tileset.png");
    //this.load.tilemapTiledJSON("tilemap", "sunny-land/assets/maps/map.json");

    this.load.image("tiles", "tileset.png");
    this.load.tilemapTiledJSON("infinite", "infinity_wall.json");
  }

  create() {
    this.scene.start("helloworld");
  }

  update() {}
}
