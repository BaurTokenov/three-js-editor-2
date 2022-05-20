# three-js-editor-react-2
## What is this project about?
#### 
This is a react component for using ThreeJsEditor inside React.
https://github.com/mrdoob/three.js/tree/master/editor
-----------------------------------------------------------------------------------------------------------------------

## Installation
```npm install three-js-editor-react-2```

## Usage
```js
import { ThreeJsEditor } from 'three-js-editor-react-2';

const ThreeJsEditorPage = () => {
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
            />
        </div>
    )
}
```

## Code management
I probably should've forked the original repo.

## Not supported
* It doesn't support Scripts due to Codemirror, Acorn, TernServer dependencies for now.