import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const configPath = path.join(process.cwd(), "marketing-config.json");

// Helper function to read config
function readConfig() {
  try {
    if (fs.existsSync(configPath)) {
      const data = fs.readFileSync(configPath, "utf8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading marketing-config.json:", error);
  }
  return {
    facebookPixel: { id: "", enabled: false },
    googleTagManager: { id: "", enabled: false },
    googleAnalytics: { id: "", enabled: false }
  };
}

export async function GET() {
  const config = readConfig();
  return NextResponse.json(config);
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Simple validation of structure
    const newConfig = {
      facebookPixel: {
        id: body.facebookPixel?.id || "",
        enabled: !!body.facebookPixel?.enabled
      },
      googleTagManager: {
        id: body.googleTagManager?.id || "",
        enabled: !!body.googleTagManager?.enabled
      },
      googleAnalytics: {
        id: body.googleAnalytics?.id || "",
        enabled: !!body.googleAnalytics?.enabled
      }
    };
    
    fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 2), "utf8");
    return NextResponse.json({ success: true, config: newConfig });
  } catch (error) {
    console.error("Error saving marketing-config.json:", error);
    return NextResponse.json({ error: "Failed to save configuration" }, { status: 500 });
  }
}
