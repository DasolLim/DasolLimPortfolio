
export async function action({ request }) {
  const formData = await request.formData();
  const theme = formData.get('theme');

  const { getSession, commitSession } = await import('~/utils/session.server');
  const session = await getSession(request.headers.get('Cookie'));
  session.set('theme', theme);

  return Response.json(
    { status: 'success' },
    {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    }
  );
}
