import React, { useRef, useEffect } from "react";
import * as PIXI from "pixi.js";
import {Spine} from 'pixi-spine';

let color = 'F04660';

const app = new PIXI.Application({
  width: 1920,
  height: 1080,
  backgroundColor: `0x${color}`,
});

// const container = new PIXI.Container();
// const texture = ;
const sprite = new PIXI.Sprite(PIXI.Texture.from('mickey.png'));

sprite.x = app.screen.width / 2;
sprite.y = app.screen.height / 2;
app.stage.addChild(sprite);
// container.addChild(sprite);

app.ticker.add((delta) => {
  // rotate the container!
  // use delta to create frame-independent transform

  // console.log(delta);

  // color = (parseInt(color, 16) + 10).toString(16);
  // app.renderer.backgroundColor = `0x${color}`;
  console.log(color);
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


const styles = {
  position: 'absolute', height: '775px', width: '1397px', cursor: 'inherit'}

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
