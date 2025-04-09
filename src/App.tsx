import CheckCredentials from "./components/Connect/CheckCredentials"
import ErrorBoundary from "./components/ErrorBoundary"
import MainApp from "./components/MainApp/MainApp"
import AppContext from "./context/AppContext"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

const queryClient = new QueryClient();

function App() {

  return (
    <AppContext>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <CheckCredentials>
            <MainApp />
          </CheckCredentials>
        </QueryClientProvider>
      </ErrorBoundary>
    </AppContext>
  );
};

export default App;
