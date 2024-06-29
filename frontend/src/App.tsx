import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./app/contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import { Router } from "./router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <ToastContainer />
      </AuthProvider>
    </QueryClientProvider>
  );
}
export default App;
