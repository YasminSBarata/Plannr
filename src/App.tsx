import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { ProtectedRoute } from './auth/ProtectedRoute'
import { useAuth } from './auth/AuthContext'

// Tela temporária do Dashboard (vamos criar depois)
function Dashboard() {
  const { user, signOut } = useAuth()

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-card p-6">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">Dashboard - Plannr</h1>
          <p className="text-neutral-600 mb-4">Bem-vindo, {user?.email}!</p>
          <button
            onClick={signOut}
            className="bg-danger hover:bg-danger-dark text-white px-4 py-2 rounded-lg transition-colors"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rotas protegidas */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
