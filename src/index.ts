import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  NotebookActions,
  NotebookPanel,
  INotebookModel
} from '@jupyterlab/notebook';

import { 
  IDisposable, 
  DisposableDelegate 
} from '@lumino/disposable';

import { ICodeCellModel } from '@jupyterlab/cells';

import { ToolbarButton } from '@jupyterlab/apputils';

import { DocumentRegistry } from '@jupyterlab/docregistry';

const CSS_ICON_CLASS = 'jp-ScrollToErrorToolbarIcon';

let ErrorNode: HTMLElement;

export class ScrollToErrorButton
  implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel>
{
  createNew(
    widget: NotebookPanel,
    context: DocumentRegistry.IContext<INotebookModel>
  ): IDisposable {
    let btn = new ToolbarButton({
      className: 'jumpError',
      iconClass: 'fas fa-jump ' + CSS_ICON_CLASS,
      onClick: (): void => {
        if (ErrorNode) {
          ErrorNode.scrollIntoView();
        }
      },
      tooltip: 'Jump to the Cell that threw the last error',
      label: 'Jump to Error'
    });

    widget.toolbar.insertItem(10, 'jumpError', btn);

    return new DisposableDelegate(() => {
      btn.dispose();
    });
  }
}

/**
 * Initialization data for the jupyter_jmp_to_err extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyter_jmp_to_err:plugin',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    const scrolltoErrButton = new ScrollToErrorButton();
    app.docRegistry.addWidgetExtension('Notebook', scrolltoErrButton);

    NotebookActions.executed.connect((_, context) => {
      let { cell } = context;
      const codeCellModel = cell.model as ICodeCellModel;

      for (let i = 0; i < codeCellModel.outputs.length; i++) {
        const outputObject = codeCellModel.outputs.get(i).toJSON();

        if (outputObject && outputObject.output_type == 'error') {
          var element: HTMLElement = cell.promptNode;

          if (element !== null) {
            ErrorNode = element;
          }
        }
      }
    });
  }
};

export default plugin;