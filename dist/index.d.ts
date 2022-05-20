declare module 'three-js-editor-react-2';

declare interface ThreeJsEditorProps {
  /** Callbacks to use in Menubar */
  menubarCallbacks: {
    fileCallbacks: {
      exportGLTFCallback: (jsonText: string) => void;
    };
  };
}

export const ThreeJsEditor: React.FC<ThreeJsEditorProps>;
