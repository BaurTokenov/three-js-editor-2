import { UIPanel, UIButton, UICheckbox } from './libs/ui';
import translateIconSrc from '../images/translate.svg';
import rotateIconSrc from '../images/rotate.svg';
import scaleIconSrc from '../images/scale.svg';

function Toolbar(editor) {
  const signals = editor.signals;
  const strings = editor.strings;

  const container = new UIPanel();
  container.setId('toolbar');

  // translate / rotate / scale

  const translateIcon = document.createElement('img');
  translateIcon.title = strings.getKey('toolbar/translate');
  translateIcon.src = translateIconSrc;

  const translate = new UIButton();
  translate.dom.className = 'Button selected';
  translate.dom.appendChild(translateIcon);
  translate.onClick(function () {
    signals.transformModeChanged.dispatch('translate');
  });
  container.add(translate);

  const rotateIcon = document.createElement('img');
  rotateIcon.title = strings.getKey('toolbar/rotate');
  rotateIcon.src = rotateIconSrc;

  const rotate = new UIButton();
  rotate.dom.appendChild(rotateIcon);
  rotate.onClick(function () {
    signals.transformModeChanged.dispatch('rotate');
  });
  container.add(rotate);

  const scaleIcon = document.createElement('img');
  scaleIcon.title = strings.getKey('toolbar/scale');
  scaleIcon.src = scaleIconSrc;

  const scale = new UIButton();
  scale.dom.appendChild(scaleIcon);
  scale.onClick(function () {
    signals.transformModeChanged.dispatch('scale');
  });
  container.add(scale);

  const local = new UICheckbox(false);
  local.dom.title = strings.getKey('toolbar/local');
  local.onChange(function () {
    signals.spaceChanged.dispatch(this.getValue() === true ? 'local' : 'world');
  });
  container.add(local);

  //

  signals.transformModeChanged.add(function (mode) {
    translate.dom.classList.remove('selected');
    rotate.dom.classList.remove('selected');
    scale.dom.classList.remove('selected');

    switch (mode) {
      case 'translate':
        translate.dom.classList.add('selected');
        break;
      case 'rotate':
        rotate.dom.classList.add('selected');
        break;
      case 'scale':
        scale.dom.classList.add('selected');
        break;
    }
  });

  return container;
}

export { Toolbar };
