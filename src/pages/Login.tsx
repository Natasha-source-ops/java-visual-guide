import { ClipboardEvent, DragEvent, FormEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Lock, UserRound, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { tryLogin, isAuthenticated } from "@/lib/auth";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  function preventClipboard(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
  }

  function preventDrop(event: DragEvent<HTMLInputElement>) {
    event.preventDefault();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const ok = tryLogin(username.trim(), password);
    if (ok) {
      navigate("/", { replace: true });
      return;
    }
    setError("Login fehlgeschlagen. Bitte Benutzername und Passwort genau eingeben.");
  }

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100"
      style={{ fontFamily: "'Space Grotesk', 'Segoe UI', sans-serif" }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 -top-20 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute -right-14 top-24 h-72 w-72 rounded-full bg-lime-400/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_26%),radial-gradient(circle_at_80%_50%,rgba(255,255,255,0.08),transparent_28%)]" />
      </div>

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center p-6">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200/15 bg-slate-900/45 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl md:grid-cols-[1.1fr_1fr]">
          <div className="hidden border-r border-slate-200/10 bg-gradient-to-br from-cyan-500/20 via-emerald-500/10 to-blue-500/15 p-10 md:flex md:flex-col md:justify-between">
            <div>
              <h1 className="mt-5 text-4xl font-bold leading-tight text-white">
                <span className="bg-gradient-to-r from-cyan-300 via-emerald-300 to-blue-300 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(34,211,238,0.35)]">
                  JavaTutor
                </span>{" "}
                Zugang
              </h1>
              <p className="mt-4 max-w-md text-sm leading-6 text-slate-200/90">
                Interaktiver Lernbereich fuer Java im Semesterverlauf: Verfolge Codeausfuehrung Schritt fuer Schritt
                mit Stack/Heap-Visualisierung, löse offene Pruefungsfragen und Coding-Aufgaben und erhalte direktes,
                detailliertes Feedback mit Musterlösungen und gezielten Hinweisen zur Vertiefung.
              </p>
            </div>

            <div className="space-y-3 text-sm text-slate-100/90">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-lime-300" />
                <span>Eingabe nur manuell: Einfuegen ist deaktiviert.</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-cyan-200" />
                <span>Lokale Login-Pruefung fuer geschuetzten Zugriff.</span>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <div className="mx-auto w-full max-w-md">
              <h2 className="text-3xl font-bold text-white">Anmelden</h2>
              <p className="mt-2 text-sm text-slate-300/90">
                Bitte Benutzername und Passwort manuell eingeben.
              </p>

              <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                <label className="block space-y-2">
                  <span className="text-xs font-medium uppercase tracking-wide text-slate-300">Benutzername</span>
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200/20 bg-slate-950/40 px-3 focus-within:border-cyan-300/60">
                    <UserRound className="h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                      autoComplete="off"
                      spellCheck={false}
                      onPaste={preventClipboard}
                      onDrop={preventDrop}
                      className="h-11 w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                      placeholder="Benutzername"
                      required
                    />
                  </div>
                </label>

                <label className="block space-y-2">
                  <span className="text-xs font-medium uppercase tracking-wide text-slate-300">Passwort</span>
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200/20 bg-slate-950/40 px-3 focus-within:border-cyan-300/60">
                    <Lock className="h-4 w-4 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      autoComplete="new-password"
                      spellCheck={false}
                      onPaste={preventClipboard}
                      onDrop={preventDrop}
                      className="h-11 w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                      placeholder="Passwort"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-800/70 hover:text-slate-100"
                      aria-label={showPassword ? "Passwort verbergen" : "Passwort anzeigen"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </label>

                {error && (
                  <div className="rounded-lg border border-red-300/40 bg-red-500/10 px-3 py-2 text-sm text-red-100">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="h-11 w-full rounded-xl bg-gradient-to-r from-cyan-400 to-lime-400 text-sm font-semibold text-slate-950 transition hover:brightness-110 active:scale-[0.99]"
                >
                  Jetzt einloggen
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
