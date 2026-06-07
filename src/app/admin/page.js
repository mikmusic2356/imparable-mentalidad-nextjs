"use client";

import { useState, useEffect } from "react";
import "./admin.css";

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Integrations Configuration State
  const [config, setConfig] = useState({
    facebookPixel: { id: "", enabled: false },
    googleTagManager: { id: "", enabled: false },
    googleAnalytics: { id: "", enabled: false },
    microsoftClarity: { id: "", enabled: false }
  });

  const [isLoading, setIsLoading] = useState(false);

  // Fetch configuration on component mount if logged in
  useEffect(() => {
    if (isLoggedIn) {
      fetchConfig();
    }
  }, [isLoggedIn]);

  const fetchConfig = async () => {
    try {
      const res = await fetch("/api/marketing");
      if (res.ok) {
        const data = await res.json();
        setConfig(data);
      }
    } catch (err) {
      console.error("Error loading config:", err);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Validate credentials
    if (email === "idullyh2356@gmail.com" && password === "Meteoro.65*") {
      setIsLoggedIn(true);
    } else {
      setError("Credenciales incorrectas. Inténtalo de nuevo.");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/marketing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(config)
      });

      if (res.ok) {
        setSuccess("Configuración de marketing guardada y aplicada con éxito.");
        setTimeout(() => setSuccess(""), 4000);
      } else {
        setError("Error al guardar la configuración.");
      }
    } catch (err) {
      setError("Error de red al conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleEnable = (key) => {
    setConfig((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        enabled: !prev[key].enabled
      }
    }));
  };

  const handleIdChange = (key, val) => {
    setConfig((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        id: val
      }
    }));
  };

  // --- LOGIN SCREEN ---
  if (!isLoggedIn) {
    return (
      <div className="admin-panel-root">
        <div className="glass-container">
          <h1 className="admin-title">Panel de Control</h1>
          <p className="admin-subtitle">Ingresa tus credenciales para administrar tus webs</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label className="input-label">Correo Electrónico</label>
              <input
                type="email"
                className="admin-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@correo.com"
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Contraseña</label>
              <input
                type="password"
                className="admin-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" className="admin-btn w-full">
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- DASHBOARD PANEL ---
  return (
    <div className="admin-panel-root">
      <div className="glass-container dashboard">
        <div className="dash-header">
          <div>
            <h1 className="admin-title" style={{ textAlign: "left", margin: 0 }}>Dashboard Marketing</h1>
            <span className="user-badge">{email}</span>
          </div>
          <button className="btn-logout" onClick={() => setIsLoggedIn(false)}>
            Cerrar Sesión
          </button>
        </div>

        {success && <div className="success-alert">{success}</div>}
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSave}>
          {/* META PIXEL CARD */}
          <div className="pixel-card">
            <div className="pixel-header">
              <div className="pixel-name">
                <span style={{ color: "#e91e63" }}>🔵</span> Meta (Facebook) Pixel
              </div>
              <div className={`pixel-status ${config.facebookPixel.enabled && config.facebookPixel.id ? "connected" : "disconnected"}`}>
                <span className="status-dot"></span>
                {config.facebookPixel.enabled && config.facebookPixel.id ? "Conectado" : "Desconectado"}
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Meta Pixel ID</label>
              <input
                type="text"
                className="admin-input"
                value={config.facebookPixel.id}
                onChange={(e) => handleIdChange("facebookPixel", e.target.value)}
                placeholder="Escribe el ID del Pixel de Meta (Ej. 2025817898284850)"
              />
            </div>

            <div className="switch-container" onClick={() => toggleEnable("facebookPixel")}>
              <span className="switch-label">Inyección en todas las páginas:</span>
              <div className={`switch-bg ${config.facebookPixel.enabled ? "active" : ""}`}>
                <div className="switch-knob"></div>
              </div>
            </div>
          </div>

          {/* GOOGLE TAG MANAGER CARD */}
          <div className="pixel-card">
            <div className="pixel-header">
              <div className="pixel-name">
                <span style={{ color: "#ff9800" }}>🟢</span> Google Tag Manager
              </div>
              <div className={`pixel-status ${config.googleTagManager.enabled && config.googleTagManager.id ? "connected" : "disconnected"}`}>
                <span className="status-dot"></span>
                {config.googleTagManager.enabled && config.googleTagManager.id ? "Conectado" : "Desconectado"}
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">GTM Container ID</label>
              <input
                type="text"
                className="admin-input"
                value={config.googleTagManager.id}
                onChange={(e) => handleIdChange("googleTagManager", e.target.value)}
                placeholder="Escribe el ID de contenedor de GTM (Ej. GTM-XXXXXXX)"
              />
            </div>

            <div className="switch-container" onClick={() => toggleEnable("googleTagManager")}>
              <span className="switch-label">Inyección en todas las páginas:</span>
              <div className={`switch-bg ${config.googleTagManager.enabled ? "active" : ""}`}>
                <div className="switch-knob"></div>
              </div>
            </div>
          </div>

          {/* GOOGLE ANALYTICS CARD */}
          <div className="pixel-card">
            <div className="pixel-header">
              <div className="pixel-name">
                <span style={{ color: "#2196f3" }}>🟡</span> Google Analytics (GA4)
              </div>
              <div className={`pixel-status ${config.googleAnalytics.enabled && config.googleAnalytics.id ? "connected" : "disconnected"}`}>
                <span className="status-dot"></span>
                {config.googleAnalytics.enabled && config.googleAnalytics.id ? "Conectado" : "Desconectado"}
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">GA Measurement ID</label>
              <input
                type="text"
                className="admin-input"
                value={config.googleAnalytics.id}
                onChange={(e) => handleIdChange("googleAnalytics", e.target.value)}
                placeholder="Escribe el ID de medición de GA4 (Ej. G-XXXXXXXXXX)"
              />
            </div>

            <div className="switch-container" onClick={() => toggleEnable("googleAnalytics")}>
              <span className="switch-label">Inyección en todas las páginas:</span>
              <div className={`switch-bg ${config.googleAnalytics.enabled ? "active" : ""}`}>
                <div className="switch-knob"></div>
              </div>
            </div>
          </div>

          {/* MICROSOFT CLARITY CARD */}
          <div className="pixel-card">
            <div className="pixel-header">
              <div className="pixel-name">
                <span style={{ color: "#0078d4" }}>🟣</span> Microsoft Clarity
              </div>
              <div className={`pixel-status ${config.microsoftClarity?.enabled && config.microsoftClarity?.id ? "connected" : "disconnected"}`}>
                <span className="status-dot"></span>
                {config.microsoftClarity?.enabled && config.microsoftClarity?.id ? "Conectado" : "Desconectado"}
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Clarity Project ID</label>
              <input
                type="text"
                className="admin-input"
                value={config.microsoftClarity?.id || ""}
                onChange={(e) => handleIdChange("microsoftClarity", e.target.value)}
                placeholder="Escribe el ID del Proyecto de Clarity (Ej. x3jey0xh11)"
              />
            </div>

            <div className="switch-container" onClick={() => toggleEnable("microsoftClarity")}>
              <span className="switch-label">Inyección en todas las páginas:</span>
              <div className={`switch-bg ${config.microsoftClarity?.enabled ? "active" : ""}`}>
                <div className="switch-knob"></div>
              </div>
            </div>
          </div>

          <button type="submit" className="admin-btn w-full" disabled={isLoading} style={{ marginTop: "20px" }}>
            {isLoading ? "Guardando..." : "Guardar y Aplicar Cambios"}
          </button>
        </form>
      </div>
    </div>
  );
}
