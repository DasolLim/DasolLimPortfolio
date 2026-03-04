import { RemixServer } from '@remix-run/react';
import { isbot } from 'isbot';
import ReactDOMServer from 'react-dom/server';

const { renderToPipeableStream } = ReactDOMServer;

const ABORT_DELAY = 5000;

export default async function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
) {
  if (typeof renderToReadableStream === 'function') {
    return handleWebStreamRequest(request, responseStatusCode, responseHeaders, remixContext);
  }

  return isbot(request.headers.get('user-agent') || '')
    ? handleBotRequest(request, responseStatusCode, responseHeaders, remixContext)
    : handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext);
}

async function handleWebStreamRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
) {
  const body = await renderToReadableStream(
    <RemixServer context={remixContext} url={request.url} abortDelay={ABORT_DELAY} />,
    {
      onError(error) {
        responseStatusCode = 500;
        console.error(error);
      },
    }
  );

  if (isbot(request.headers.get('user-agent') || '')) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}

async function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return handleNodeStreamRequest({
    request,
    responseStatusCode,
    responseHeaders,
    remixContext,
    ready: 'onAllReady',
  });
}

async function handleBrowserRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
) {
  return handleNodeStreamRequest({
    request,
    responseStatusCode,
    responseHeaders,
    remixContext,
    ready: 'onShellReady',
  });
}

async function handleNodeStreamRequest({
  request,
  responseStatusCode,
  responseHeaders,
  remixContext,
  ready,
}) {
  const [{ createReadableStreamFromReadable }, StreamModule] = await Promise.all([
    import('@remix-run/node'),
    import('node:stream'),
  ]);

  const PassThrough = StreamModule.PassThrough;

  return new Promise((resolve, reject) => {
    const callbacks = {
      onShellError(error) {
        reject(error);
      },
      onError(error) {
        responseStatusCode = 500;
        console.error(error);
      },
    };

    callbacks[ready] = () => {
      const body = new PassThrough();
      const stream = createReadableStreamFromReadable(body);

      responseHeaders.set('Content-Type', 'text/html');

      resolve(
        new Response(stream, {
          headers: responseHeaders,
          status: responseStatusCode,
        })
      );

      pipe(body);
    };

    const { pipe, abort } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} abortDelay={ABORT_DELAY} />,
      callbacks
    );

    setTimeout(abort, ABORT_DELAY);
  });
}
