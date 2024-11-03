import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./app.css";
import { Links } from "./links.tsx";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1 className="text-xl">LinksApp</h1>
      <Links />
    </QueryClientProvider>
  );
}
