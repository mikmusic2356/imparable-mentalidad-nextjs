"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

export default function ClarityTracker({ config }) {
  useEffect(() => {
    // Si no viene ID de la base de datos, usamos el fallback x3jey0xh11
    const clarityId = config?.id || "x3jey0xh11";
    
    // Si la base de datos no tiene configurado un ID, activamos Clarity por defecto.
    // Si la base de datos sí tiene un ID configurado, respetamos la opción de 'enabled' de la base de datos.
    const isEnabled = config?.id ? config.enabled : true;

    if (isEnabled && clarityId) {
      try {
        Clarity.init(clarityId);
        console.log("Microsoft Clarity initialized with project ID:", clarityId);
      } catch (err) {
        console.error("Failed to initialize Microsoft Clarity:", err);
      }
    }
  }, [config]);

  return null;
}
