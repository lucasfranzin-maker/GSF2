import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import UeberGsf from "@/pages/UeberGsf";
import Standorte from "@/pages/Standorte";
import Tesa from "@/pages/Tesa";
import Sortiment from "@/pages/Sortiment";
import Projekte from "@/pages/Projekte";
import Kontakt from "@/pages/Kontakt";
import Impressum from "@/pages/Impressum";
import Datenschutz from "@/pages/Datenschutz";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ueber-gsf" element={<UeberGsf />} />
            <Route path="/standorte" element={<Standorte />} />
            <Route path="/tesa" element={<Tesa />} />
            <Route path="/sortiment" element={<Sortiment />} />
            <Route path="/projekte" element={<Projekte />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
        <Toaster position="top-right" richColors closeButton />
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
