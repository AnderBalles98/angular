import {
  DestinosState,
  InitMyDataAction,
  NuevoDestinoAction,
  reducerDestinos,
  initializeDestinosState, VoteUpAction, VoteDownAction, ElegidoFavoritoAction, ClickOnAction
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

  it('should reduce vote up event', () => {
    const initialState: DestinosState = initializeDestinosState();
    const destino: Destino = new Destino('barcelona' + 'url', 'barcelona', 'url', 'imagenUrl');
    let action: any = new NuevoDestinoAction(destino);
    const newItemState: DestinosState = reducerDestinos(initialState, action);
    action = new VoteUpAction(destino);
    const voteUpState = reducerDestinos(newItemState, action);
    expect(voteUpState.items[0].getVotes()).toEqual(1);
    expect(voteUpState.items[0].getNombre()).toEqual('barcelona');
  });

  it('should reduce vote down event', () => {
    const initialState: DestinosState = initializeDestinosState();
    const destino: Destino = new Destino('barcelona' + 'url', 'barcelona', 'url', 'imagenUrl');
    let action: any = new NuevoDestinoAction(destino);
    const newItemState: DestinosState = reducerDestinos(initialState, action);
    action = new VoteDownAction(destino);
    const voteDownState = reducerDestinos(newItemState, action);
    expect(voteDownState.items[0].getVotes()).toEqual(-1);
    expect(voteDownState.items[0].getNombre()).toEqual('barcelona');
  });

  it('should reduce elegido favorito event', () => {
    const initialState: DestinosState = initializeDestinosState();
    const destino: Destino = new Destino('barcelona' + 'url', 'barcelona', 'url', 'imagenUrl');
    const destino2: Destino = new Destino('madrid' + 'url', 'barcelona', 'url', 'imagenUrl');
    let action: any = new NuevoDestinoAction(destino);
    let newItemState: DestinosState = reducerDestinos(initialState, action);
    action = new NuevoDestinoAction(destino2);
    newItemState = reducerDestinos(newItemState, action);
    action = new ElegidoFavoritoAction(destino2);
    const elegidoFavoritoState = reducerDestinos(newItemState, action);
    expect(elegidoFavoritoState.items[1].getIsSelected()).toEqual(true);
    expect(elegidoFavoritoState.items[0].getNombre()).toEqual('barcelona');
  });

  it('should reduce add click event', () => {
    const initialState: DestinosState = initializeDestinosState();
    const action: any = new ClickOnAction();
    let addClickState = reducerDestinos(initialState, action);
    expect(addClickState.clicks).toEqual(1);
    addClickState = reducerDestinos(addClickState, action);
    expect(addClickState.clicks).toEqual(2);
    addClickState = reducerDestinos(addClickState, action);
    expect(addClickState.clicks).toEqual(3);
  });
});
