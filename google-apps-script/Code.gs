/**
 * SBCPS website backend. Bound to the Google Sheet owned by sribhavani.cocosociety@gmail.com.
 * Receives JSON POSTs from the website, appends a row, and emails the society.
 * See README.md for deploy steps.
 */

var NOTIFY_TO = 'sribhavani.cocosociety@gmail.com';
var NOTIFY_CC = 'diliprajkumar@gmail.com';
var PRIORITY_TREES = 100;
var MIN_TREES = 10;
var TALUKS = ['Erode', 'Modakkurichi', 'Kodumudi', 'Perundurai', 'Bhavani', 'Anthiyur',
  'Gobichettipalayam', 'Sathyamangalam', 'Thalavadi', 'Nambiyur'];
var ROLES = { agri: 'Coconut Farm Agri Expert', sales: 'Sales & Marketing Expert', harvest: 'Harvesting Engineer / Manager' };

var MEMBER_HEADERS = ['Timestamp', 'Tier', 'Name', 'Phone (WhatsApp)', 'Village/Panchayat', 'Town', 'Taluk',
  'District', 'PIN', 'Trees', 'Acres', 'Farm map link', 'AMC interest', 'Language', 'Age', 'Founding/Board interest'];
var VOLUNTEER_HEADERS = ['Timestamp', 'Name', 'Phone (WhatsApp)', 'Email', 'District/City', 'Roles',
  'Experience (yrs)', 'Note', 'Language', 'LinkedIn', 'Age', 'Founding/Board interest'];

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return json_({ ok: true, service: 'sbcps-form' });
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    var d = JSON.parse(e.postData.contents);
    if (d.website) return json_({ ok: true }); // honeypot: pretend success
    if (!verifyTurnstile_(d.turnstileToken)) return json_({ ok: false, error: 'captcha' });

    lock.waitLock(20000);
    if (d.type === 'member') return json_(handleMember_(d));
    if (d.type === 'volunteer') return json_(handleVolunteer_(d));
    return json_({ ok: false, error: 'bad type' });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (x) {}
  }
}

function s_(v, max) { return String(v == null ? '' : v).trim().substring(0, max || 200); }
function cell_(v) { // neutralise spreadsheet formula injection
  v = String(v);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}
function phone_(v) { return s_(v, 20).replace(/[\s-]/g, '').replace(/^(\+91|91|0)(?=\d{10}$)/, ''); }

// Age 18-100, or '' when not sent (older site versions); null when sent but invalid.
function age_(v) {
  if (v === undefined || v === null || v === '') return '';
  var n = Number(v);
  return n >= 18 && n <= 100 && n === Math.floor(n) ? n : null;
}

// 'Yes' / 'No', or '' when not sent (older site versions)
function yn_(v) { v = s_(v, 3); return v === 'Yes' || v === 'No' ? v : ''; }

function sheet_(name, headers) {
  var ss = SpreadsheetApp.getActive();
  var sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(headers);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  } else {
    // keep the header row in sync with this version (new or renamed columns)
    var current = sh.getRange(1, 1, 1, Math.max(sh.getLastColumn(), headers.length)).getValues()[0];
    if (headers.some(function (h, i) { return current[i] !== h; })) {
      sh.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
    }
  }
  return sh;
}

function handleMember_(d) {
  var phone = phone_(d.phone);
  var age = age_(d.age);
  if (age === null) return { ok: false, error: 'age' };
  var trees = Number(d.trees);
  var acres = Number(d.acres);
  var taluk = s_(d.taluk);
  var pin = s_(d.pin, 6);
  if (!/^[6-9]\d{9}$/.test(phone)) return { ok: false, error: 'phone' };
  if (!(trees >= MIN_TREES)) return { ok: false, error: 'trees' };
  if (!(acres > 0)) return { ok: false, error: 'acres' };
  if (TALUKS.indexOf(taluk) < 0) return { ok: false, error: 'taluk (Erode district only)' };
  if (!/^\d{6}$/.test(pin)) return { ok: false, error: 'pin' };
  if (!s_(d.name) || !s_(d.village) || !s_(d.town)) return { ok: false, error: 'required' };

  var tier = trees >= PRIORITY_TREES ? 'Priority' : 'Standard';
  var row = [new Date(), tier, s_(d.name), phone, s_(d.village), s_(d.town), taluk, 'Erode', pin, trees, acres,
    s_(d.mapLink, 500), s_(d.amc, 3), s_(d.lang, 2), age, yn_(d.board)].map(function (v, i) { return typeof v === 'string' ? cell_(v) : v; });
  sheet_('Members', MEMBER_HEADERS).appendRow(row);

  MailApp.sendEmail({
    to: NOTIFY_TO, cc: NOTIFY_CC,
    subject: 'New member application (' + tier + '): ' + s_(d.name) + ', ' + taluk,
    body: MEMBER_HEADERS.map(function (h, i) { return h + ': ' + row[i]; }).join('\n')
  });
  return { ok: true };
}

function handleVolunteer_(d) {
  var phone = phone_(d.phone);
  var age = age_(d.age);
  if (age === null) return { ok: false, error: 'age' };
  if (!/^[6-9]\d{9}$/.test(phone)) return { ok: false, error: 'phone' };
  if (!s_(d.name) || !s_(d.place)) return { ok: false, error: 'required' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s_(d.email))) return { ok: false, error: 'email' };
  if (!/^\d{1,2}$/.test(s_(d.experience, 3))) return { ok: false, error: 'experience' };
  if (!s_(d.note)) return { ok: false, error: 'note' };
  // LinkedIn is optional, but must look like a LinkedIn link when given
  if (s_(d.linkedin) && !/linkedin\.com\/(in|pub|company)\//i.test(s_(d.linkedin, 300))) return { ok: false, error: 'linkedin' };
  var roles = (d.roles || []).map(function (r) { return ROLES[r]; }).filter(Boolean);
  if (!roles.length) return { ok: false, error: 'roles' };

  var row = [new Date(), s_(d.name), phone, s_(d.email), s_(d.place), roles.join(', '), s_(d.experience, 20),
    s_(d.note, 1000), s_(d.lang, 2), s_(d.linkedin, 300), age, yn_(d.board)].map(function (v) { return typeof v === 'string' ? cell_(v) : v; });
  sheet_('Volunteers', VOLUNTEER_HEADERS).appendRow(row);

  MailApp.sendEmail({
    to: NOTIFY_TO, cc: NOTIFY_CC,
    subject: 'New volunteer: ' + s_(d.name) + ' (' + roles.join(', ') + ')',
    body: VOLUNTEER_HEADERS.map(function (h, i) { return h + ': ' + row[i]; }).join('\n')
  });
  return { ok: true };
}

/** Verifies the Cloudflare Turnstile token when TURNSTILE_SECRET is set in Script Properties. */
function verifyTurnstile_(token) {
  var secret = PropertiesService.getScriptProperties().getProperty('TURNSTILE_SECRET');
  if (!secret) return true; // not configured yet
  if (!token) return false;
  var res = UrlFetchApp.fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'post', payload: { secret: secret, response: token }, muteHttpExceptions: true
  });
  return JSON.parse(res.getContentText()).success === true;
}

/**
 * Run once from the editor: creates the Members/Volunteers tabs and an internal Summary tab
 * (total interested, Priority vs Standard, count per taluk, volunteers).
 */
function setup() {
  sheet_('Members', MEMBER_HEADERS);
  sheet_('Volunteers', VOLUNTEER_HEADERS);
  var ss = SpreadsheetApp.getActive();
  var sum = ss.getSheetByName('Summary') || ss.insertSheet('Summary');
  sum.clear();
  sum.getRange('A1:B6').setValues([
    ['Interested farmers (total)', '=COUNTA(Members!C2:C)'],
    ['Priority (100+ trees)', '=COUNTIF(Members!B2:B,"Priority")'],
    ['Standard (10-99 trees)', '=COUNTIF(Members!B2:B,"Standard")'],
    ['Founding seats', 40],
    ['Beyond first 40 (new societies)', '=MAX(0,B1-B4)'],
    ['Volunteers (total)', '=COUNTA(Volunteers!B2:B)'],
  ]);
  sum.getRange('A8').setValue('Applicants per taluk').setFontWeight('bold');
  var rows = TALUKS.map(function (t, i) { return [t, '=COUNTIF(Members!G2:G,A' + (9 + i) + ')']; });
  sum.getRange(9, 1, rows.length, 2).setValues(rows);
  sum.getRange('A1:A6').setFontWeight('bold');
  sum.autoResizeColumn(1);
}
