import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';



/**
 * Initialization data for the jupyter_jmp_to_err extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyter_jmp_to_err:plugin',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension jupyter_jmp_to_err is activated!');
  }
};

export default plugin;
