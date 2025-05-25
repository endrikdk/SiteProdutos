import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";

export default function ProdutosLayout() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ marginLeft: "220px", padding: "1rem", width: "100%" }}>
        <Outlet />
      </main>
    </div>
  );
}
