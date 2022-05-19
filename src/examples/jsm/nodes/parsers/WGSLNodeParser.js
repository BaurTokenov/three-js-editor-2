import NodeParser from '../core/NodeParser';
import WGSLNodeFunction from './WGSLNodeFunction';

class WGSLNodeParser extends NodeParser {
  parseFunction(source) {
    return new WGSLNodeFunction(source);
  }
}

export default WGSLNodeParser;
