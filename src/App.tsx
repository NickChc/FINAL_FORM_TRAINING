import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { PublicLayout } from "@src/layouts/PublicLayout";

const Home = lazy(() => import("@src/views/Home"));

function App() {
  return <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>

  </Suspense>;
}

export default App;
