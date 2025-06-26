import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import ContentsPage from "./pages/contents";
import SiirKadinPage from "./pages/contents/pages/siir-kadin";
import SiirIcmeyeGerekYokKiSevincePage from "./pages/contents/pages/icmeye-gerek-yok-ki-sevince";

export default function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contents">
               <Route index={true} element={<ContentsPage />} />
               <Route path="siir-kadin" element={<SiirKadinPage />} />
               <Route
                  path="icmeye-gerek-yokki-sevince"
                  element={<SiirIcmeyeGerekYokKiSevincePage />}
               />
            </Route>
         </Routes>
      </BrowserRouter>
   );
}
