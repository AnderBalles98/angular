import {
  DestinosState,
  InitMyDataAction,
  NuevoDestinoAction,
  reducerDestinos,
  initializeDestinosState
} from './destino-state.model';
import {Destino} from './Destino.model';

describe('reducerDestinosViajes', () => {
  it('should reduce init data', () => {
    // setup
    const prevState: DestinosState = initializeDestinosState();
    const action: InitMyDataAction = new InitMyDataAction([{
      id: 'ddsdsdsd',
      nombre: 'destino 1',
      imagenUrl:
        'https://rockcontent.com/es/wp-content/uploads/2019/02/o-que-e-produto-no-mix-de-marketing-1280x720.png',
      url: 'sdsd',
    }, {
      id: 'ddsdsdsd',
      nombre: 'destino 2',
      imagenUrl:
        'https://rockcontent.com/es/wp-content/uploads/2019/02/o-que-e-produto-no-mix-de-marketing-1280x720.png',
      url: 'sdsd',
    }]);
    // action
    const newState: DestinosState = reducerDestinos(prevState, action);
    // assertions
    console.log(newState);
    expect(newState.items.length).toEqual(2);
    expect(newState.items[0].getNombre()).toEqual('destino 1');
  });

  it('should reduce new item added', () => {
    const prevState: DestinosState = initializeDestinosState();
    const action: NuevoDestinoAction = new NuevoDestinoAction(new Destino('barcelona' + 'url', 'barcelona', 'url', 'imagenUrl'));
    const newState: DestinosState = reducerDestinos(prevState, action);
    expect(newState.items.length).toEqual(1);
    expect(newState.items[0].getNombre()).toEqual('barcelona');
  });
});
