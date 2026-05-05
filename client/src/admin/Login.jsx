import { Film } from "lucide-react";
import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SEO from "../components/SEO";

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(form.email, form.password);
      navigate(location.state?.from?.pathname || "/admin", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-radial-cinema px-4 py-10">
      <SEO title="Admin Login" description="Admin login for portfolio management." />
      <form className="glass-card w-full max-w-md rounded-[8px] p-7" onSubmit={submit}>
        <div className="mb-8 flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-[8px] bg-electric text-ink">
            <Film size={22} />
          </span>
          <div>
            <p className="eyebrow mb-1">Secure access</p>
            <h1 className="text-2xl font-black text-white">Admin Login</h1>
          </div>
        </div>
        <div className="grid gap-4">
          <input
            className="input-field"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            required
          />
          <input
            className="input-field"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
            required
          />
        </div>
        {error ? <div className="mt-4 rounded-[8px] border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div> : null}
        <button className="premium-button mt-5 w-full" disabled={loading} type="submit">
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </main>
  );
};

export default Login;
