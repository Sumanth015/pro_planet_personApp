import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const PRO_PLANET_SYSTEM_PROMPT = `You are the Pro Planet Person AI Assistant - a helpful, knowledgeable guide for the Pro Planet Person environmental sustainability platform.

Your role is to help users with:
1. Understanding eco-tasks and how to complete them
2. Explaining how eco-coins work and how to redeem them
3. Providing tips for sustainable living
4. Answering questions about recycling and finding recycling centers
5. Explaining platform features (tasks, rewards, videos, articles)
6. Encouraging environmental actions and sustainability practices

Key platform features you can explain:
- Eco Tasks: Daily/weekly tasks that reward eco-coins when completed
- Eco Coins: Virtual currency earned by completing tasks, redeemable for real money via UPI/PhonePe/GPay
- Recycling Map: Find nearby recycling centers
- Learning Hub: Environmental articles and videos
- Team Members: GANAVI S PRASAD, SUMANTH K, SOANGOUD S BIRADAR

IMPORTANT RULES:
- Only answer questions related to Pro Planet Person, sustainability, environment, recycling, and eco-friendly practices
- If asked about unrelated topics, politely redirect to environmental topics
- Be encouraging and positive about users' eco-efforts
- Keep responses concise but helpful
- Use emojis sparingly to keep responses friendly 🌱

If the question is completely unrelated to environment/sustainability/the platform, respond with:
"I'm the Pro Planet Person assistant and I focus on environmental topics. How can I help you with sustainability, eco-tasks, or our platform features?"`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Processing chat request with", messages.length, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: PRO_PLANET_SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
