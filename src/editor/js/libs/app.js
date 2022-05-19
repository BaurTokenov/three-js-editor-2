class APP {
  constructor() {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio); // TODO: Use player.setPixelRatio()
    renderer.outputEncoding = THREE.sRGBEncoding;

    const loader = new THREE.ObjectLoader();
    let camera;
    let scene;

    const vrButton = VRButton.createButton(renderer); // eslint-disable-line no-undef

    let events = {};

    const dom1 = document.createElement('div');
    dom1.appendChild(renderer.domElement);

    this.dom = dom1;

    this.width = 500;
    this.height = 500;

    this.load = function (json, ...args) {
      const { project } = json;

      if (project.vr !== undefined) renderer.xr.enabled = project.vr;
      if (project.shadows !== undefined) renderer.shadowMap.enabled = project.shadows;
      if (project.shadowType !== undefined) renderer.shadowMap.type = project.shadowType;
      if (project.toneMapping !== undefined) renderer.toneMapping = project.toneMapping;
      if (project.toneMappingExposure !== undefined) renderer.toneMappingExposure = project.toneMappingExposure;
      if (project.physicallyCorrectLights !== undefined)
        renderer.physicallyCorrectLights = project.physicallyCorrectLights;

      this.setScene(loader.parse(json.scene));
      this.setCamera(loader.parse(json.camera));

      events = {
        init: [],
        start: [],
        stop: [],
        keydown: [],
        keyup: [],
        pointerdown: [],
        pointerup: [],
        pointermove: [],
        update: [],
      };

      let scriptWrapParams = 'player,renderer,scene,camera';
      const scriptWrapResultObj = {};

      Object.keys(events).forEach((eventKey) => {
        scriptWrapParams += `, ${eventKey}`;
        scriptWrapResultObj[eventKey] = eventKey;
      });

      const scriptWrapResult = JSON.stringify(scriptWrapResultObj).replace(/"/g, '');
      Object.keys(json.scripts).forEach((uuid) => {
        const object = scene.getObjectByProperty('uuid', uuid, true);

        if (object === undefined) {
          console.warn('APP.Player: Script without object.', uuid);
          return;
        }

        const scripts = json.scripts[uuid];

        for (let i = 0; i < scripts.length; i += 1) {
          const script = scripts[i];

          // eslint-disable-next-line no-new-func
          const functions = new Function(scriptWrapParams, `${script.source}\nreturn ${scriptWrapResult};`).bind(
            object
          )(this, renderer, scene, camera);

          // eslint-disable-next-line no-loop-func
          Object.keys(functions).forEach((name) => {
            if (functions[name] === undefined) return;

            if (events[name] === undefined) {
              console.warn('APP.Player: Event type not supported (', name, ')');
              return;
            }

            events[name].push(functions[name].bind(object));
          });
        }
      });

      dispatch(events.init, ...args);
    };

    this.setCamera = function (value) {
      camera = value;
      camera.aspect = this.width / this.height;
      camera.updateProjectionMatrix();
    };

    this.setScene = function (value) {
      scene = value;
    };

    this.setPixelRatio = function (pixelRatio) {
      renderer.setPixelRatio(pixelRatio);
    };

    this.setSize = function (width, height) {
      this.width = width;
      this.height = height;

      if (camera) {
        camera.aspect = this.width / this.height;
        camera.updateProjectionMatrix();
      }

      renderer.setSize(width, height);
    };

    function dispatch(array, event) {
      for (let i = 0, l = array.length; i < l; i += 1) {
        array[i](event);
      }
    }

    let time;
    let startTime;
    let prevTime;

    function animate() {
      time = performance.now();

      try {
        dispatch(events.update, { time: time - startTime, delta: time - prevTime });
      } catch (e) {
        console.error(e.message || e, e.stack || '');
      }

      renderer.render(scene, camera);

      prevTime = time;
    }

    this.play = () => {
      if (renderer.xr.enabled) dom1.append(vrButton);

      prevTime = performance.now();
      startTime = prevTime;

      document.addEventListener('keydown', onKeyDown);
      document.addEventListener('keyup', onKeyUp);
      document.addEventListener('pointerdown', onPointerDown);
      document.addEventListener('pointerup', onPointerUp);
      document.addEventListener('pointermove', onPointerMove);

      dispatch(events.start, arguments);

      renderer.setAnimationLoop(animate);
    };

    this.stop = () => {
      if (renderer.xr.enabled) vrButton.remove();

      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('pointermove', onPointerMove);

      dispatch(events.stop, arguments);

      renderer.setAnimationLoop(null);
    };

    this.render = function (time) {
      dispatch(events.update, { time: time * 1000, delta: 0 /* TODO */ });

      renderer.render(scene, camera);
    };

    this.dispose = function () {
      renderer.dispose();

      camera = undefined;
      scene = undefined;
    };

    //

    function onKeyDown(event) {
      dispatch(events.keydown, event);
    }

    function onKeyUp(event) {
      dispatch(events.keyup, event);
    }

    function onPointerDown(event) {
      dispatch(events.pointerdown, event);
    }

    function onPointerUp(event) {
      dispatch(events.pointerup, event);
    }

    function onPointerMove(event) {
      dispatch(events.pointermove, event);
    }
  }
}

export { APP };
