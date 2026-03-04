import { createThemeCookie } from '~/utils/theme-cookie';

export async function action({ request }) {
  const formData = await request.formData();
  const theme = String(formData.get('theme'));

  return Response.json(
    { status: 'success' },
    {
      headers: {
        'Set-Cookie': createThemeCookie(theme),
      },
    }
  );
}
