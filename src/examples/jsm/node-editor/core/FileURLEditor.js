import { StringInput, Element } from '../../libs/flow.module';
import { BaseNode } from './BaseNode';
import { DataFile } from './DataFile';

export class FileURLEditor extends BaseNode {
  constructor() {
    const dataFile = new DataFile();

    super('File URL', 1, dataFile, 250);

    const urlInput = new StringInput().onChange(() => {
      if (urlInput.getValue() !== dataFile.getURL()) {
        dataFile.setValue(urlInput.getValue());

        this.invalidate();
      }
    });

    this.add(new Element().add(urlInput));
  }
}
