import './App.css';

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from './component/Layout/Layout';
import RegistrationForm from './component/Registration/RegistrationForm';
import DetailsPage from './component/DetailsPage/DetailsPage';
import NoMatch from './component/NoMatch/NoMatch';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<RegistrationForm />} />
            <Route path="detail" element={<DetailsPage />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
