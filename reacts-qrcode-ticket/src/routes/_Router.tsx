import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FormInformation } from "../pages/FormInformation";
import { LandingPage } from "../pages/LandingPage";
import { Ticket } from "../pages/Ticket";
import { CheckQr } from "../pages/CheckQr";

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
