import TopBar from "./components/topbar";
import BottomBar from "./components/bottombar";

function App() {
  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <TopBar />
      <main style={{ flex: 1 }} />
      <BottomBar />
    </div>
  );
}

export default App;
