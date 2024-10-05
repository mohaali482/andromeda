import { Analytics } from "@vercel/analytics/react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Layout from "./pages/layout"
import Home from "./pages/home"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import MarsRoverPhotos from "./pages/mars-rover-photos"
import APOD from "./pages/apod"

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
            <Route index element={<APOD />} />
            <Route path="/mars-rover-photos" element={<MarsRoverPhotos />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
