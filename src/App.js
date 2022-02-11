import React, { useRef, useEffect } from "react";
import * as PIXI from "pixi.js";
import {Spine} from 'pixi-spine';

import {
  Fade,
  PanTo,
  Shake,
  Rotate,
  ZoomTo,
  Camera,
} from 'pixi-game-camera';


let color = 'F04660';

const app = new PIXI.Application({
  width: 1920,
  height: 1080,
  backgroundColor: `0x${color}`,
});

const options = {
  ticker: app.ticker
};

const camera = new Camera(options);
// const mildShake = new Shake(app.stage, 3, 5000);
// camera.effect(mildShake);

const panToCenter = new PanTo(app.stage, 200, 250, 5000);
camera.effect(panToCenter);

// const fadeToBlack = new Fade(app.stage, new PIXI.Sprite(PIXI.Texture.WHITE), 0x000000, 1, 5000);
// camera.effect(fadeToBlack);

// const rotate45Deg = new Rotate(app.stage, 45, 3000);
// camera.effect(rotate45Deg);

// const container = new PIXI.Container();
const texture = PIXI.Texture.from('mickey.png');
const sprite = new PIXI.Sprite(texture);


sprite.x = app.screen.width / 2;
sprite.y = app.screen.height / 2;
app.stage.addChild(sprite);
// container.addChild(sprite);

app.ticker.add((delta) => {
  // rotate the container!
  // use delta to create frame-independent transform

  // color = (parseInt(color, 16) + 1).toString(16);
  // app.renderer.backgroundColor = `0x${color}`;

});

// const app = new PIXI.Application();

// load spine data
app.loader
    .add('spineboypro', 'spineboy-ess.json')
    .load(onAssetsLoaded);

app.stage.interactive = true;

function onAssetsLoaded(loader, res) {
    // create a spine boy
    const spineBoyPro = new Spine(res.spineboypro.spineData);

    // set the position
    spineBoyPro.x = app.screen.width / 2;
    spineBoyPro.y = app.screen.height;

    spineBoyPro.scale.set(0.5);

    app.stage.addChild(spineBoyPro);

    const singleAnimations = ['aim', 'death', 'jump', 'portal'];
    const loopAnimations = ['hoverboard', 'idle', 'run', 'shoot', 'walk'];
    const allAnimations = [].concat(singleAnimations, loopAnimations);

    let lastAnimation = '';

    // Press the screen to play a random animation
    app.stage.on('pointerdown', () => {
        let animation = '';
        do {
            animation = allAnimations[Math.floor(Math.random() * allAnimations.length)];
        } while (animation === lastAnimation);

        spineBoyPro.state.setAnimation(0, animation, loopAnimations.includes(animation));

        lastAnimation = animation;
    });
}


function App() {
  const ref = useRef(null);

  useEffect(() => {
    // On first render add app to DOM
    ref.current.appendChild(app.view);
    // Start the PixiJS app
    app.start();

    return () => {
      // On unload stop the application
      app.stop();
    };
  }, []);
 
  return <div ref={ref} />;
}

export default App;
