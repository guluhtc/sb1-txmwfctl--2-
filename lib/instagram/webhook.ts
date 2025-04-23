import { instagramConfig } from './config'

const GRAPH_API_URL = `${instagramConfig.graphApiPublishUrl}/${instagramConfig.apiVersion}`
const ACCESS_TOKEN = instagramConfig.accessToken
const WEBHOOK_URL = `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/instagram`

interface WebhookEvent {
  object: string;
  entry: Array<{
    id: string;
    time: number;
    changes: Array<{
      field: string;
      value: {
        media_id: string;
        comment_id?: string;
        text?: string;
      };
    }>;
  }>;
}

interface WebhookError {
  error: {
    message: string;
    type: string;
    code: number;
  };
}

export async function subscribe(fields: string[]) {
  try {
    const response = await fetch(
      `${GRAPH_API_URL}/instagram/subscriptions`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_token: ACCESS_TOKEN,
          callback_url: WEBHOOK_URL,
          fields: fields.join(','),
          verify_token: process.env.WEBHOOK_VERIFY_TOKEN,
          object: 'instagram',
        }),
      }
    )

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Failed to subscribe to webhook: ${error}`)
    }

    return await response.json()
  } catch (error: any) {
    console.error(`Error subscribing to webhook: ${error?.message || error}`)
    throw new Error('Failed to subscribe to webhook')
  }
}

export async function listSubscriptions() {
  try {
    const response = await fetch(
      `${GRAPH_API_URL}/instagram/subscriptions?access_token=${ACCESS_TOKEN}`
    )

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Failed to list subscriptions: ${error}`)
    }

    return await response.json()
  } catch (error: any) {
    console.error(`Error listing subscriptions: ${error?.message || error}`)
    throw new Error('Failed to list subscriptions')
  }
}

export async function deleteSubscription(subscriptionId: string) {
  try {
    const response = await fetch(
      `${GRAPH_API_URL}/instagram/subscriptions`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_token: ACCESS_TOKEN,
          object: 'instagram',
          subscription_id: subscriptionId,
        }),
      }
    )

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Failed to delete subscription: ${error}`)
    }

    return await response.json()
  } catch (error: any) {
    console.error(`Error deleting subscription: ${error?.message || error}`)
    throw new Error('Failed to delete subscription')
  }
}

export async function handleWebhook(req: Request): Promise<Response> {
  try {
    const body: WebhookEvent = await req.json();
    
    if (!body.object || !body.entry) {
      throw new Error('Invalid webhook payload');
    }
    
    // Process webhook events
    for (const entry of body.entry) {
      for (const change of entry.changes) {
        // Handle different types of changes
        if (change.field === 'media') {
          // Handle media changes
          console.log('Media changed:', change.value.media_id);
        } else if (change.field === 'comments') {
          // Handle comment changes
          console.log('Comment:', change.value.comment_id, change.value.text);
        }
      }
    }
    
    return new Response('EVENT_RECEIVED', { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Webhook error:', error.message);
      return new Response(error.message, { status: 400 });
    }
    return new Response('Internal Server Error', { status: 500 });
  }
}