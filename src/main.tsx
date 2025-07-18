import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./styles/global.css";
import { router } from "./routes";
import { AuthProvider } from "./Providers/AuthProvider";
import { SearchProvider } from "./Providers/SearchProvider";
import {HeaderTitleProvider} from "./Providers/HeaderTitleProvider"
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <HeaderTitleProvider>
        <SearchProvider>

          <RouterProvider router={router} />

        </SearchProvider>
      </HeaderTitleProvider>
    </AuthProvider>
  </StrictMode>
);
