import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "./components/ErrorBoundary";
import { LocaleProvider } from "./contexts/LocaleContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Divination from "./pages/Divination";
import Guide from "./pages/Guide";
import SiteShell from "./components/SiteShell";

function Router() {
  return <WouterRouter hook={useHashLocation}><SiteShell><Switch><Route path="/" component={Home} /><Route path="/about" component={Home} /><Route path="/guide" component={Guide} /><Route path="/divination" component={Divination} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch></SiteShell></WouterRouter>;
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <LocaleProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LocaleProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
