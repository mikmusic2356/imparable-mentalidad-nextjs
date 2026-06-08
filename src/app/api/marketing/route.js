import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.SUPABASE_URL || "https://hmjgcgzabuwdvoijzivp.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtamdjZ3phYnV3ZHZvaWp6aXZwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDg2MTkxNiwiZXhwIjoyMDk2NDM3OTE2fQ.CPjs5I0kBE0i6R0kbo8-oOYmgFyZx1IgNtPxbYYYZcM";

// Helper function to read from Supabase REST API
async function readConfigFromSupabase() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/marketing_config?id=eq.1`, {
      headers: {
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`
      },
      next: { revalidate: 0 } // Bypass Next.js fetch caching
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
    } else {
      console.error("Failed to read from Supabase:", res.statusText);
    }
  } catch (error) {
    console.error("Error connecting to Supabase in readConfig:", error);
  }
  
  // Fallback defaults
  return {
    facebookPixel: { id: "", enabled: false },
    googleTagManager: { id: "", enabled: false },
    googleAnalytics: { id: "", enabled: false },
    microsoftClarity: { id: "", enabled: false }
  };
}

export async function GET() {
  const config = await readConfigFromSupabase();
  return NextResponse.json(config);
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    const payload = {
      facebook_pixel_id: body.facebookPixel?.id || "",
      facebook_pixel_enabled: !!body.facebookPixel?.enabled,
      gtm_id: body.googleTagManager?.id || "",
      gtm_enabled: !!body.googleTagManager?.enabled,
      ga_id: body.googleAnalytics?.id || "",
      ga_enabled: !!body.googleAnalytics?.enabled,
      microsoft_clarity_id: body.microsoftClarity?.id || "",
      microsoft_clarity_enabled: !!body.microsoftClarity?.enabled
    };

    const res = await fetch(`${SUPABASE_URL}/rest/v1/marketing_config?id=eq.1`, {
      method: "PATCH",
      headers: {
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation"
      },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      const data = await res.json();
      const updatedRow = data[0];
      return NextResponse.json({
        success: true,
        config: {
          facebookPixel: { id: updatedRow.facebook_pixel_id || "", enabled: !!updatedRow.facebook_pixel_enabled },
          googleTagManager: { id: updatedRow.gtm_id || "", enabled: !!updatedRow.gtm_enabled },
          googleAnalytics: { id: updatedRow.ga_id || "", enabled: !!updatedRow.ga_enabled },
          microsoftClarity: { id: updatedRow.microsoft_clarity_id || "", enabled: !!updatedRow.microsoft_clarity_enabled }
        }
      });
    } else {
      console.error("Failed to update Supabase row:", res.statusText);
      return NextResponse.json({ error: "Failed to save configuration to database" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error saving config to Supabase:", error);
    return NextResponse.json({ error: "Failed to save configuration" }, { status: 500 });
  }
}
