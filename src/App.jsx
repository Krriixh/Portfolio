import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import ScrollToTop from './components/ScrollToTop';
import Home from '@/pages/Home';
import CaseStudy from '@/pages/CaseStudy';
import React, { useState } from 'react';
import Preloader from '@/components/portfolio/Preloader';
import BackgroundCanvas from '@/components/portfolio/BackgroundCanvas';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClientInstance}>
      <BackgroundCanvas />
      
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      
      {!isLoading && (
        <Router basename={import.meta.env.BASE_URL}>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/case-study/:id" element={<CaseStudy />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      )}
      <Toaster />
    </QueryClientProvider>
  )
}

export default App