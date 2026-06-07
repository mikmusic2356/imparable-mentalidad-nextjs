import fs from "fs";
import path from "path";
import "./globals.css";

export const metadata = {
  title: "Onboarding - Imparable Mentalidad",
  description: "Diagnóstico de patrones de mentalidad",
};

// Helper function to read config synchronously in server component
function getMarketingConfig() {
  const configPath = path.join(process.cwd(), "marketing-config.json");
  try {
    if (fs.existsSync(configPath)) {
      const data = fs.readFileSync(configPath, "utf8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading config in layout:", error);
  }
  return null;
}

export default function RootLayout({ children }) {
  const config = getMarketingConfig();

  return (
    <html lang="es">
      <head>
        {/* Google Tag Manager (Script) */}
        {config?.googleTagManager?.enabled && config?.googleTagManager?.id && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${config.googleTagManager.id}');
              `
            }}
          />
        )}

        {/* Facebook Pixel Code */}
        {config?.facebookPixel?.enabled && config?.facebookPixel?.id && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${config.facebookPixel.id}');
                  fbq('track', 'PageView');
                `
              }}
            />
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${config.facebookPixel.id}&ev=PageView&noscript=1`}
              />
            </noscript>
          </>
        )}

        {/* Google Analytics (gtag.js) */}
        {config?.googleAnalytics?.enabled && config?.googleAnalytics?.id && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${config.googleAnalytics.id}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${config.googleAnalytics.id}');
                `
              }}
            />
          </>
        )}
      </head>
      <body>
        {/* Google Tag Manager (Noscript) */}
        {config?.googleTagManager?.enabled && config?.googleTagManager?.id && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${config.googleTagManager.id}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {children}
      </body>
    </html>
  );
}
