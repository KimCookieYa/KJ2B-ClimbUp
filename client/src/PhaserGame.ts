import Phaser from "phaser";

import HelloWorldScene from "./scenes/HelloWorldScene";
import Background from "./scenes/Background";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "phaser-container",
  backgroundColor: "#FFFFFF",
  scale: {
    mode: Phaser.Scale.ScaleModes.RESIZE,
    width: 1000,
    height: 600,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: [Background, HelloWorldScene],
};

export default new Phaser.Game(config);
