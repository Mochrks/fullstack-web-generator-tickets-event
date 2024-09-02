import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FormInformation } from "../components/demo/FormInformation";
import { LandingPage } from "../components/demo/LandingPage";
import { Ticket } from "../components/demo/Ticket";
import { CheckQr } from "../components/demo/CheckQr";

const _Routes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/form" element={<FormInformation />} />
        <Route path="/form/tickets" element={<Ticket />} />
        <Route path="/check" element={<CheckQr />} />
      </Routes>
    </Router>
  );
};

export default _Routes;
