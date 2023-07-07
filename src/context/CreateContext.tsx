import {
  ChangeEvent,
  createContext,
  useCallback,
  useReducer,
  ReactElement,
  useContext,
} from "react";

type StateType = {
  count: number;
  text: string;
};

const initState: StateType = {
  count: 0,
  text: "",
};

const enum REDUCER_ACTION_TYPE {
  INCREMENT,
  DECREMENT,
  NEW_TYPE,
}

type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload: number | string;
};

const reducer = (
  state: StateType,
  { type, payload }: ReducerAction
): StateType => {
  switch (type) {
    case REDUCER_ACTION_TYPE.INCREMENT:
      return {
        ...state,
        count: state.count + Number(payload),
      };
    case REDUCER_ACTION_TYPE.DECREMENT:
      return {
        ...state,
        count: state.count + Number(payload),
      };
    case REDUCER_ACTION_TYPE.NEW_TYPE:
      return {
        ...state,
        text: String(payload),
      };
    default:
      throw new Error();
  }
};

const useCounterContext = (initState: StateType) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.NEW_TYPE,
      payload: e?.target?.value,
    });
  };
  const increment = useCallback(
    () => dispatch({ type: REDUCER_ACTION_TYPE.INCREMENT, payload: 1 }),
    []
  );

  const decrement = useCallback(
    () => dispatch({ type: REDUCER_ACTION_TYPE.DECREMENT, payload: -1 }),
    []
  );

  return { state, increment, decrement, handleInputChange };
};

type UseCounterContextType = ReturnType<typeof useCounterContext>;

const contextInitState: UseCounterContextType = {
  state: initState,
  increment: () => {},
  decrement: () => {},
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => {},
};

export const CreateContext =
  createContext<UseCounterContextType>(contextInitState);

type ChildrenType = {
  children: ReactElement | ReactElement[] | undefined;
};
export const ContextProvider = ({ children }: ChildrenType) => {
  return (
    <CreateContext.Provider value={useCounterContext(initState)}>
      {children}
    </CreateContext.Provider>
  );
};

type UseCounter = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

export const useCounter = (): UseCounter => {
  const {
    state: { count },
    increment,
    decrement,
  } = useContext(CreateContext);
  return { count, increment, decrement };
};

type UseTextData = {
  text: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const useTextData = (): UseTextData => {
  const {
    state: { text },
    handleInputChange,
  } = useContext(CreateContext);
  return { text, handleInputChange };
};
