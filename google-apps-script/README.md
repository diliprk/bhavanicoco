# Deploying the form backend

Do this while signed in as **sribhavani.cocosociety@gmail.com**.

1. Create a new Google Sheet named "SBCPS Applications".
2. Extensions > Apps Script. Delete the sample code and paste in `Code.gs`.
3. Project Settings > tick "Show appsscript.json manifest file" and replace its contents with `appsscript.json` from this folder.
4. Select the `setup` function and click Run. Approve the permissions (Sheets, Gmail send, external requests). This creates the **Members**, **Volunteers** and **Summary** tabs.
5. Deploy > New deployment > type **Web app**. Execute as: **Me**. Who has access: **Anyone**. Copy the Web app URL (ends in `/exec`).
6. In Cloudflare Pages (Settings > Environment variables), set `NEXT_PUBLIC_APPS_SCRIPT_URL` to that URL, then redeploy.
7. Test: open the live site, submit a test application, and check the Sheet row and the email (to sribhavani.cocosociety@gmail.com, cc diliprajkumar@gmail.com).

## Spam protection (Cloudflare Turnstile, optional but recommended)
1. Cloudflare dashboard > Turnstile > Add widget, with your site's domain. Copy the site key and secret key.
2. Pages env var `NEXT_PUBLIC_TURNSTILE_SITE_KEY` = site key.
3. Apps Script > Project Settings > Script properties > add `TURNSTILE_SECRET` = secret key.

## Updating the script later
Deploy > Manage deployments > edit (pencil) > Version: New version > Deploy. The URL stays the same.

## Founding members group notification
`NOTIFY_GROUP` in `Code.gs` is the founding members' Google Group. On every application it gets a short email with only the tier and taluk (members) or roles and experience (volunteers), never names, phone numbers or map links. The full-detail email still goes only to `NOTIFY_TO` and `NOTIFY_CC`. In the group settings, set "Who can post" to group managers or members, and make sure the sending account is a manager.

## What the Summary tab shows
Total interested farmers, Priority (100+ trees) vs Standard (10-99), how many are beyond the first 40 (to form additional societies), count per taluk, and total volunteers. It is internal only; nothing is shown on the public site.
