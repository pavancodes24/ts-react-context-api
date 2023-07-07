import Counter from "./Counter";
import { ContextProvider } from "./context/CreateContext";
function App() {
  return (
    <>
      <ContextProvider>
        <Counter>{(num: number) => <>count is {num}</>}</Counter>
      </ContextProvider>
    </>
  );
}

export default App;
