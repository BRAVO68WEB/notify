import "jsr:@std/dotenv/load";
import { Context, Hono } from 'hono'

const app = new Hono()

app.post('/log', async (c: Context) => {
  try {
    const body = await c.req.json();
    const headers = await c.req.header();

    const DISCORD_WEBHOOK = Deno.env.get('DISCORD_WEBHOOK')
    
    if (!DISCORD_WEBHOOK) {
      throw new Error('Missing Discord webhook URL')
    }

    const current_timestamp = Math.floor(Date.now() / 1000);

    const embed = {
      "content": "New notification Logged at  <t:"+current_timestamp+">",
      "embeds": [
        {
          "title": "Payload Body",
          "description": "```json\n" + JSON.stringify(body) + "\n```",
          "color": 11111111
        },
        {
          "title": "Request Headers",
          "description": "```json\n" + JSON.stringify(headers) + "\n```",
          "color": 1111111
        }
      ],
      "attachments": []
    }


    await fetch(DISCORD_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(embed)
    }).then(response => response.text())

    return c.json({
      message: 'Notification logged successfully'
    }, 200);
  }
  catch (error) {
    console.error(error);
    if(error instanceof Error) {
      return c.json({ error: error.message }, 500);
    }
  }
})

Deno.serve(app.fetch)
