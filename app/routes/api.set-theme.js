import { createThemeCookie } from '~/utils/theme-cookie';
import { json } from '@remix-run/node';

export async function action({ request }) {
  const formData = await request.formData();
  const theme = String(formData.get('theme'));

  return json(
    { status: 'success' },
    {
      headers: {
        'Set-Cookie': createThemeCookie(theme),
      },
    }
  );
}
