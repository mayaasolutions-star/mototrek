import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';

async function handleProxy(req, { params }) {
  const pathArr = params?.path || [];
  const subPath = pathArr.join('/');
  const searchParams = req.nextUrl.search || '';
  
  const targetBase = BACKEND_URL.replace(/\/$/, '');
  const targetUrl = targetBase.endsWith('/api/v1')
    ? `${targetBase}/${subPath}${searchParams}`
    : `${targetBase}/api/v1/${subPath}${searchParams}`;

  try {
    const headers = new Headers(req.headers);
    headers.delete('host');

    const fetchOptions = {
      method: req.method,
      headers: headers,
    };

    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      const bodyText = await req.text();
      if (bodyText) {
        fetchOptions.body = bodyText;
      }
    }

    const res = await fetch(targetUrl, fetchOptions);
    const data = await res.arrayBuffer();

    const responseHeaders = new Headers();
    res.headers.forEach((value, key) => {
      if (key.toLowerCase() !== 'content-encoding') {
        responseHeaders.set(key, value);
      }
    });

    // Enforce CORS for Vercel deployment
    const origin = req.headers.get('origin') || 'https://mototrek-website.vercel.app';
    responseHeaders.set('Access-Control-Allow-Origin', origin);
    responseHeaders.set('Access-Control-Allow-Credentials', 'true');
    responseHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    responseHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, X-Admin-Key');

    return new NextResponse(data, {
      status: res.status,
      headers: responseHeaders,
    });
  } catch (err) {
    console.error(`API Proxy Error for ${targetUrl}:`, err);
    return NextResponse.json(
      { success: false, error: 'Unable to connect to the Mototrek backend server.' },
      { status: 502 }
    );
  }
}

export async function GET(req, ctx) {
  return handleProxy(req, ctx);
}

export async function POST(req, ctx) {
  return handleProxy(req, ctx);
}

export async function PUT(req, ctx) {
  return handleProxy(req, ctx);
}

export async function PATCH(req, ctx) {
  return handleProxy(req, ctx);
}

export async function DELETE(req, ctx) {
  return handleProxy(req, ctx);
}

export async function OPTIONS(req) {
  const origin = req.headers.get('origin') || 'https://mototrek-website.vercel.app';
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, X-Admin-Key',
      'Access-Control-Max-Age': '86400',
    },
  });
}
