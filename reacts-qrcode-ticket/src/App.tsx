import _Routes from "./routes/_Router";
import ApolloClientProvider from "./ApolloClient";

function App() {
  return (
    <ApolloClientProvider>
      <_Routes />
    </ApolloClientProvider>
  );
}

export default App;
