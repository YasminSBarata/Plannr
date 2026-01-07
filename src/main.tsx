import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import "./styles/index.css";

// criando o gerenciador de queries
const queryClient = new QueryClient({
  // esse queryClient é o cérbro. vai guardar todos os caches
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, //depois de buscar os dados, vai considerar válido por 5 minutos( se outro componente pedir esses dados, usa o mesmo cache sem buscar novamente)
      retry: 1, // se der error, tenta mais uma vez antes de desistir
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* vai disponibilizar para toda a aplicação. CONTEXT PROVIDER: faz o query client ficar disponivel em qualquer lugar do app, qualquer componente pode usar o useQuery */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
