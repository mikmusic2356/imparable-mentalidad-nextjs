import "../onboarding.css";

export const metadata = {
  title: "Política de Privacidad - Imparable Mentalidad",
  description: "Política de privacidad y protección de datos personales de Imparable Mentalidad.",
};

export default function PrivacyPolicy() {
  return (
    <div id="imparable-onboarding-root">
      <div className="cinematic-bg"></div>
      <div className="onboarding-wrapper" style={{ display: "block", padding: "120px 20px 80px 20px" }}>
        <header className="minimal-header">
          <span className="logo-text">IMPARABLE MENTALIDAD</span>
        </header>

        <div style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "12px",
          padding: "40px",
          backdropFilter: "blur(10px)",
          color: "#f5f2eb",
          fontFamily: "'Montserrat', sans-serif",
          lineHeight: "1.8",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
        }}>
          <h1 style={{
            fontFamily: "'League Spartan', sans-serif",
            fontSize: "2.5rem",
            fontWeight: "700",
            color: "#ffffff",
            marginBottom: "10px",
            lineHeight: "1.2"
          }}>
            POLÍTICA DE PRIVACIDAD
          </h1>
          <p style={{ fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.5)", marginBottom: "30px" }}>
            Última actualización: 8 de junio de 2026
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            <section>
              <h2 style={{ fontSize: "1.3rem", color: "#e91e63", marginBottom: "10px", fontFamily: "'League Spartan', sans-serif" }}>
                1. IDENTIFICACIÓN Y RESPONSABLE DEL TRATAMIENTO
              </h2>
              <p>
                El responsable del tratamiento de los datos recolectados a través de esta plataforma es <strong>Duly Hernández</strong> (en adelante, &ldquo;Imparable Mentalidad&rdquo;), con domicilio en Colombia y número de contacto <strong>+57 317 164 6811</strong>. Nos comprometemos a proteger y respetar tu privacidad de acuerdo con la legislación vigente de protección de datos personales.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.3rem", color: "#e91e63", marginBottom: "10px", fontFamily: "'League Spartan', sans-serif" }}>
                2. DATOS QUE RECOLECTAMOS
              </h2>
              <p>
                Recopilamos información para proporcionar y mejorar nuestros servicios de entrenamiento mental. Los tipos de información que podemos recopilar incluyen:
              </p>
              <ul style={{ paddingLeft: "20px", marginTop: "10px", listStyleType: "disc" }}>
                <li><strong>Respuestas del Diagnóstico:</strong> Respuestas a preguntas sobre tus patrones de comportamiento, niveles de sobrecarga mental, parálisis por miedo y hábitos de postergación.</li>
                <li><strong>Información de Contacto:</strong> Datos facilitados voluntariamente por ti si decides contactarnos directamente por WhatsApp o redes sociales (tales como tu número de teléfono y nombre).</li>
                <li><strong>Datos de Navegación y Cookies:</strong> Píxeles de seguimiento y cookies proporcionadas por servicios de terceros como <em>Facebook Pixel</em>, <em>Google Analytics</em>, <em>Google Tag Manager</em> y <em>Microsoft Clarity</em> para medir el tráfico y rendimiento del sitio.</li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontSize: "1.3rem", color: "#e91e63", marginBottom: "10px", fontFamily: "'League Spartan', sans-serif" }}>
                3. FINALIDAD DEL TRATAMIENTO DE DATOS
              </h2>
              <p>
                Los datos obtenidos son utilizados única y exclusivamente para las siguientes finalidades:
              </p>
              <ul style={{ paddingLeft: "20px", marginTop: "10px", listStyleType: "disc" }}>
                <li>Generar y mostrar los resultados personalizados del diagnóstico de mentalidad (Onboarding).</li>
                <li>Ofrecer orientación personalizada y recomendar la mentoría más adecuada según tu perfil obtenido (Sobrecarga, Autosabotaje o Miedo).</li>
                <li>Analizar y medir de forma anónima la interacción en nuestro sitio web para optimizar la velocidad y la experiencia del usuario.</li>
                <li>Cumplir con las políticas de publicidad y seguimiento requeridas por las plataformas de distribución y marketing (Meta/Facebook Ads).</li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontSize: "1.3rem", color: "#e91e63", marginBottom: "10px", fontFamily: "'League Spartan', sans-serif" }}>
                4. DERECHOS DEL USUARIO Y SOLICITUD DE ELIMINACIÓN DE DATOS (DERECHO ARCO)
              </h2>
              <p>
                Tienes derecho a acceder, rectificar, limitar y solicitar la eliminación de cualquiera de tus datos recopilados en nuestra plataforma en cualquier momento.
              </p>
              <p style={{ marginTop: "10px" }}>
                <strong>Instrucciones para solicitar la eliminación de datos:</strong> Si deseas que eliminemos cualquier información de registro o diagnóstico asociada a tu visita, puedes enviarnos una solicitud explícita de eliminación de datos a través de los siguientes canales:
              </p>
              <ul style={{ paddingLeft: "20px", marginTop: "10px", listStyleType: "disc" }}>
                <li><strong>Mensaje directo de WhatsApp:</strong> al número <strong>+57 317 164 6811</strong> indicando tu nombre o solicitud de limpieza de cookies/píxeles.</li>
                <li><strong>Correo de atención o formulario de contacto en redes:</strong> a través de nuestra cuenta oficial de Instagram <strong>@imparablementalidad</strong>.</li>
              </ul>
              <p style={{ marginTop: "10px" }}>
                Procesaremos y confirmaremos la eliminación total de tus registros en un plazo máximo de 48 horas hábiles tras recibir la solicitud.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.3rem", color: "#e91e63", marginBottom: "10px", fontFamily: "'League Spartan', sans-serif" }}>
                5. COOKIES Y TECNOLOGÍAS DE SEGUIMIENTO
              </h2>
              <p>
                Este sitio web utiliza cookies técnicas y analíticas de terceros para mejorar el funcionamiento de la web y registrar conversiones de anuncios. Puedes deshabilitar el uso de cookies configurando las opciones de privacidad de tu navegador.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.3rem", color: "#e91e63", marginBottom: "10px", fontFamily: "'League Spartan', sans-serif" }}>
                6. CAMBIOS EN LA PRESENTE POLÍTICA
              </h2>
              <p>
                Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento para adaptarla a novedades legislativas o requerimientos de las redes publicitarias. Te sugerimos revisar esta página periódicamente.
              </p>
            </section>

            <div style={{
              textAlign: "center",
              marginTop: "40px",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              paddingTop: "30px"
            }}>
              <style dangerouslySetInnerHTML={{__html: `
                .btn-back:hover {
                  background: rgba(255, 255, 255, 0.1) !important;
                  border-color: rgba(255, 255, 255, 0.6) !important;
                }
              `}} />
              <a 
                href="/" 
                className="btn-back"
                style={{
                  display: "inline-block",
                  fontFamily: "'Raleway', sans-serif",
                  background: "transparent",
                  color: "#ffffff",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  padding: "12px 30px",
                  borderRadius: "4px",
                  fontSize: "0.85rem",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  transition: "all 0.4s ease"
                }}
              >
                Volver al Diagnóstico
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
