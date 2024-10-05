import { Analytics } from "@vercel/analytics/react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Layout from "./pages/layout"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import APOD from "./pages/apod/layout"
import MarsRoverPhotos from "./pages/mars-rover-photos/layout"
import About from "./pages/about/layout"
import Home from "./pages/home/layout"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Analytics />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/apod" element={<APOD />} />
            <Route path="/mars-rover-photos" element={<MarsRoverPhotos />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
