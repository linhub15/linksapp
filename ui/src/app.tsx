import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./app.css";
import { Links } from "./links.tsx";
import { client } from "./lib/hey-client/mod.ts";

const queryClient = new QueryClient();

client.setConfig({
  baseUrl: import.meta.env.VITE_API_URL,
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1 className="text-xl">LinksApp</h1>
      <Links />
    </QueryClientProvider>
  );
}
