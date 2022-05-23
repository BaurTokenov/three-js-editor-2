declare module 'three-js-editor-react-2';

/** Loader function type provided by three-js-editor */
declare type ObjectLoaderFunctionType = ((files: File[]) => void) | null;

declare interface ThreeJsEditorProps {
  /** Callbacks to use in Menubar */
  menubarCallbacks?: {
    fileCallbacks: {
      exportGLTFCallback: (jsonText: string) => void;
    };
  };
  /** Setter for the loader function. Can be further used to directly load objects from url into the editor. */
  setObjectLoaderFunction?: React.Dispatch<
    React.SetStateAction<ObjectLoaderFunctionType>
  >;
  /** Setter for the clear function. Can be used to clear the editor. Equivalent to clicking "File->New" */
  setClearEditorFunction?: React.Dispatch<
    React.SetStateAction<(() => void) | null>
  >;
}

export const ThreeJsEditor: React.FC<ThreeJsEditorProps>;
