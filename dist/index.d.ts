declare module 'three-js-editor-react-2';

/** Loader function type provided by three-js-editor */
declare type ObjectLoaderFunctionType = (files: File[]) => void;
declare type ClearEditorFunctionType = () => void;
declare type SetPositionFunctionType = (
  newPosition: [number, number, number]
) => void;

declare interface ThreeJsEditorProps {
  /** Callbacks to use in Menubar */
  menubarCallbacks?: {
    fileCallbacks: {
      exportGLTFCallback: (jsonText: string) => void;
    };
  };
  /** Setter for the loader function. Can be further used to directly load objects from url into the editor. */
  setObjectLoaderFunction?: (newFunction: ObjectLoaderFunctionType) => void;
  /** Setter for the clear function. Can be used to clear the editor. Equivalent to clicking "File->New" */
  setClearEditorFunction?: (newFunction: ClearEditorFunctionType) => void;
  /** Setter for positions in the sidebar. Enables direct access to an object's position. */
  setPositionFunction?: SetPositionFunctionType;
  /** Map to rename texts in the Menubar */
  menubarRenameMap?: {
    fileRenameMap?: {
      'menubar/file/export/gltf': string;
    };
  };
}

export const ThreeJsEditor: React.FC<ThreeJsEditorProps>;
