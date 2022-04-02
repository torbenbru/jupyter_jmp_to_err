import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { NotebookActions } from '@jupyterlab/notebook';

import { ICodeCellModel } from '@jupyterlab/cells';

/**
 * Initialization data for the jupyter_jmp_to_err extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyter_jmp_to_err:plugin',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {

    NotebookActions.executed.connect((_, context) => {
      let {cell} = context; 
      const codeCellModel = cell.model as ICodeCellModel;

      for(let i = 0; i < codeCellModel.outputs.length; i++) {
        const outputObject = codeCellModel.outputs.get(i).toJSON();

        if(outputObject && outputObject.output_type == 'error') {

          var element = cell.promptNode;

          if(element !== null) {
            element.scrollIntoView();
          }
        }
      }
    });
  }
};

export default plugin;
