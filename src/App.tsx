import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

function App() {
  const [status, setStatus] = useState("Testando conexão...");

  useEffect(() => {
    supabase
      .from("categorias")
      .select("count")
      .then(({ error }) => {
        if (error) {
          setStatus("❌ Erro: " + error.message);
        } else {
          setStatus("✅ Conectado ao Supabase!");
        }
      });
  }, []);

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>App Finanças</h1>
      <p>{status}</p>
    </div>
  );
}

export default App;
