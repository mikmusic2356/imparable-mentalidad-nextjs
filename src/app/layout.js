import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Onboarding - Imparable Mentalidad",
  description: "Diagnóstico de patrones de mentalidad",
};

const SUPABASE_URL = process.env.SUPABASE_URL || "https://hmjgcgzabuwdvoijzivp.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtamdjZ3phYnV3ZHZvaWp6aXZwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDg2MTkxNiwiZXhwIjoyMDk2NDM3OTE2fQ.CPjs5I0kBE0i6R0kbo8-oOYmgFyZx1IgNtPxbYYYZcM";

// Helper function to read config from Supabase dynamically on server rendering
async function getMarketingConfig() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/marketing_config?id=eq.1`, {
      headers: {
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`
      },
      next: { revalidate: 0 } // Always load fresh pixels
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.length > 0) {
        const row = data[0];
        return {
          facebookPixel: { id: row.facebook_pixel_id || "", enabled: !!row.facebook_pixel_enabled },
          googleTagManager: { id: row.gtm_id || "", enabled: !!row.gtm_enabled },
          googleAnalytics: { id: row.ga_id || "", enabled: !!row.ga_enabled },
          microsoftClarity: { id: row.microsoft_clarity_id || "", enabled: !!row.microsoft_clarity_enabled }
        };
      }
    }
  } catch (error) {
    if (error && (error.message?.includes("Dynamic server usage") || error.digest === "DYNAMIC_SERVER_USAGE")) {
      throw error;
    }
    console.error("Error reading config in layout:", error);
  }
  return null;
}

export default async function RootLayout({ children }) {
  const config = await getMarketingConfig();

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

        {/* Microsoft Clarity Code */}
        {config?.microsoftClarity?.enabled && config?.microsoftClarity?.id && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${config.microsoftClarity.id}");
              `
            }}
          />
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
