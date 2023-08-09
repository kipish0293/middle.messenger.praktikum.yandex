import Block from "../helpers/block";
import store, { StoreEvents } from "../helpers/store";
import { isEqual } from "./heplerFunction";

type Indexed<T = any> = {
    [key in string]: T;
};

export function connect(mapStateToProps: (state: Indexed) => Indexed) {
    return function (Component: typeof Block) {
        return class extends Component {
            constructor(props: any) {
                let state = mapStateToProps(store.getState());

                // подписываемся на событие
                store.on(StoreEvents.Updated, () => {
                    // при обновлении получаем новое состояние
                    const newState = mapStateToProps(store.getState());

                    // если что-то из используемых данных поменялось, обновляем компонент
                    if (!isEqual(state, newState)) {
                        this.setProps({ ...newState });
                    }

                    // не забываем сохранить новое состояние
                    state = newState;
                });

                super({ ...props, ...state });
            }
        };
    };
}
