import NodeParser from '../core/NodeParser';
import GLSLNodeFunction from './GLSLNodeFunction';

class GLSLNodeParser extends NodeParser {
  parseFunction(source) {
    return new GLSLNodeFunction(source);
  }
}

export default GLSLNodeParser;
