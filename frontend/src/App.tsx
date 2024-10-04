import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Layout from "./pages/layout"
import Home from "./pages/home"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import MarsRoverPhotos from "./pages/mars-rover-photos"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/mars-rover-photos" element={<MarsRoverPhotos />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
