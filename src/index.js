import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route,Link } from "react-router-dom";
import Index from "./components/Index";
import Workers from "./components/workers";
import Taxes  from "./components/taxes";
import Accounting from "./components/accounting";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index exact path="/" element={<Index />} />
        <Route path="/workers" element={<Workers />} />
        <Route path="/accounting" element={<Accounting />} />
        <Route path="/taxes" element={<Taxes />} />
      </Routes>
    </BrowserRouter>  
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);