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
import { keyboard } from "@testing-library/user-event/dist/keyboard";


// let color = 'F04660';
let color = 'Ffffff';

const app = new PIXI.Application({
  width: 1280,
  height: 720,
  backgroundColor: `0x${color}`,
});

const options = {
  ticker: app.ticker
};

const Keyboard = require("pixi.js-keyboard");


const camera = new Camera(options);

// const mildShake = new Shake(app.stage, 3, 5000);
// camera.effect(mildShake);



// const fadeToBlack = new Fade(app.stage, new PIXI.Sprite(PIXI.Texture.WHITE), 0x000000, 1, 5000);
// camera.effect(fadeToBlack);

// const rotate45Deg = new Rotate(app.stage, 45, 3000);
// camera.effect(rotate45Deg);


const background = new PIXI.Container();
const texture = PIXI.Texture.from('mickey.png');
const sprite = new PIXI.Sprite(texture);


sprite.x = app.screen.width / 2;
sprite.y = app.screen.height / 2;
app.stage.addChild(background);
background.addChild(sprite);

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

    // const zoomIn = new ZoomTo(spineBoyPro, 2, 2, 5000);
    // camera.effect(zoomIn);

    // const panToCenter = new PanTo(spineBoyPro, 200, 250, 1000);
    // camera.effect(panToCenter);

    let animate = 'hoverboard'
    let speed = 5;

    // set the position
    // spineBoyPro.x = 0;
    spineBoyPro.x = app.screen.width / 2;
    spineBoyPro.y = app.screen.height / 2;

    app.ticker.add((delta) => {

      // update the spine animation
      // console.log(delta);

      if (Keyboard.isKeyDown("ArrowLeft")) {
        spineBoyPro.x -= speed * delta;
        // console.log('left');
      }

      if (Keyboard.isKeyDown("ArrowRight")) {
        spineBoyPro.x += speed * delta;
        // console.log('right');
      }

      Keyboard.update();
      console.log(animate);
      
    });
    
    Keyboard.events.on('pressed', (keyCode, e)  => {
      // console.log(keyCode); 
      if (keyCode === 'ArrowLeft') {
        // console.log('left');
        spineBoyPro.scale.x *= -1; //flip the sprite
        animate = 'walk';
        speed = 5;
        spineBoyPro.state.setAnimation(0, animate, true);
      }
      if (keyCode === 'ArrowRight') {
        // console.log('right');
        animate = 'run';
        speed = 10;
        spineBoyPro.state.setAnimation(0, animate, true);
    }});

      

    spineBoyPro.scale.set(0.5);

    // app.stage.addChild(spineBoyPro);
    background.addChild(spineBoyPro);

    // const singleAnimations = ['aim', 'death', 'jump', 'portal'];
    // const loopAnimations = ['hoverboard', 'idle', 'run', 'shoot', 'walk'];
    // const allAnimations = [].concat(singleAnimations, loopAnimations);

    spineBoyPro.state.setAnimation(0, animate, true);

    // let lastAnimation = '';

    // Press the screen to play a random animation
    // app.stage.on('pointerdown', () => {
    //     let animation = '';
    //     do {
    //         animation = allAnimations[Math.floor(Math.random() * allAnimations.length)];
    //     } while (animation === lastAnimation);

    //     spineBoyPro.state.setAnimation(0, animation, loopAnimations.includes(animation));

    //     lastAnimation = animation;
    // });
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
