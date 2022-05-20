# three-js-editor-react-2

## What is this project about?

###

This is a react component for using ThreeJsEditor inside React.
https://github.com/mrdoob/three.js/tree/master/editor

---

## Beta version

This package is at its beta stage. It may break with updates, so please be careful.

## Installation

```
npm install three-js-editor-react-2

yarn add three-js-editor-react-2
```

## Usage

```ts
import {
  ThreeJsEditor,
  ObjectLoaderFunctionType,
} from 'three-js-editor-react-2';
import axios from 'axios';

const ThreeJsEditorPage = () => {
  const [objectLoaderFunction, setObjectLoaderFunction] =
    useState<null | ObjectLoaderFunctionType>(null);

  // the loader function will then be available in a state variable
  console.log(objectLoaderFunction);

  // example usage of objectLoaderFunction
  const loadObjectByUrl = (objectUrl: string) => {
    axios({
      url: objectUrl,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const file = new File([response.data], 'filename.gltf');
      objectLoaderFunction!([file]);
    });
  };

  return (
    <div>
      <ThreeJsEditor
        menubarCallbacks={{
          fileCallbacks: {
            exportGLTFCallback: (jsonText: string) => {
              console.log('jsonText', jsonText);
            },
          },
        }}
        setObjectLoaderFunction={setObjectLoaderFunction}
      />
    </div>
  );
};
```

## Code management

There's little to no code management for now, any suggestions are welcome.

## Not supported

- It doesn't support Scripts due to Codemirror, Acorn, TernServer dependencies for now.
