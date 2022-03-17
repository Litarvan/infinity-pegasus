import { getMatch } from '.';

export function isLogged()
{
    return !!getLogoutURL();
}

export function getName()
{
    return getMatch(
        /<td class="text hidden-phone " ?>([^<]*)<\/td>/,
        1,
        n => n.replace('&nbsp;', ' ')
    );
}

export function getLogoutURL()
{
    return getMatch(/index\.php\?com=login&job=disconnect-user&token=[^"]*/);
}
