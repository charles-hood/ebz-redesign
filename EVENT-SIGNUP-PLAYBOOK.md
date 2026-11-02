# Event Signup Playbook

How ebzchurch.org handled the Women's Retreat signup (Aug to Nov 2026), written down
on Nov 1, 2026 when the retreat came off the site, so the next event that needs
registration can reuse the pattern instead of rediscovering it. The retreat is the
worked example throughout; swap in the new event's facts.

Companion material:

- `/Users/charles/Projects/retreat` (own git repo): the Node microservice behind
  `/api/retreat/*`, its runbook, deploy artifacts, the OCS API notes, and the
  retreat art masters. Read its `CLAUDE.md` first for OCS behavior gotchas.
- This repo's git history before Nov 1, 2026: `git show 3813528:site/womens-retreat.html`
  is the last live version of the signup page, and
  `git show 3813528:site/retreat-signup-test-9f3a2c.html` is the unlisted
  direct-form test page. `git log -- site/womens-retreat.html` walks the evolution.

## The pattern in one paragraph

One Church Software (OCS) is the system of record for signup and payment. The church
site provides a dedicated event page (facts, art, contact, "Register" button), a
homepage "Coming Up" card linking to it, and a ministries-page button. The Register
button opens the OCS public event page, where the visitor clicks the blue **Sign Up**
button to reveal the form and pay. An optional aggregate counter ("17 of 50 spots
filled") on the site page is fed by a small VPS service that reads the OCS guest list
with a read-only API key and publishes counts only, never names.

## Step by step for a new event

1. **Create the event in OCS admin** with a registration form and, if there is a fee,
   a fee item. Note the event ID from the URL (the retreat was 11071). Public URL:
   `https://ebz.onechurchsoftware.com/public/events/{EVENT_ID}`.
   - OCS does not enforce capacity unless the event carries a limit; the retreat's
     "50" was a display denominator only. The signup deadline IS enforced.
   - The Sign Up button on the event page is a JS handler, not a link: there is no
     deep link to the form. The event's `signupUrl`
     (`https://ebz.onechurchsoftware.com/embed/form?ocs.id={FORM_ID}&ocs.event={EVENT_ID}`)
     does render the form directly, but production deliberately used the event page
     (deadline banner, Add to Calendar, payment edge cases stay OCS's problem).
   - A fee item's minimum quantity is a client-side hint; a visitor can zero it and
     submit unpaid. Say "your spot is confirmed once the fee is paid" in the OCS
     confirmation message and audit Forms -> Entries for blank Payments.
   - Removing a registrant takes two deletions in OCS: Events -> Signups AND
     Forms -> Entries. Delete only one and the two disagree forever.

2. **Build the site page** by copying the last live retreat page from git history
   (see above) to `site/{event}.html`. It is self-contained: shared nav and footer,
   its own `<style>` block (two-column `.retreat-layout`, `.retreat-facts` list,
   `.retreat-form-wrap` call-to-action box), facts list, art image, and a
   `btn btn-primary btn-lg` Register link to the OCS event URL. Keep:
   - the sentence telling visitors to click the blue **Sign Up** button on the OCS page
   - a "trouble signing up?" line pointing at the church office (770-640-7287,
     office@ebzchurch.org), not the volunteer organizer
   - `<link rel="canonical" href="https://ebzchurch.org/{event}">` (extensionless;
     Caddy `try_files {path}.html` resolves it) and `robots index, follow`
   - a sitemap.xml `<url>` entry with `changefreq weekly`, `priority 0.7`

3. **Promote it.** Uncomment the homepage "Coming Up" section in `site/index.html`
   (template card and notes are inside the HTML comment; see CLAUDE.md, Featured
   Event Update Pattern) and add a button to the relevant card on `ministries.html`.
   Card art: a WebP sized for the card (the retreat used `images/womens-retreat-card.webp`
   on the homepage and `images/womens-retreat-2026.webp` at 1400x933 on the page;
   masters and prompts are in the retreat repo's `art/`). Media is cached immutable,
   so a replaced image under the same name needs a new `?v=`.

4. **Optional live counter.** The retreat page had
   `<p class="availability" id="availability" aria-live="polite" hidden></p>` under the
   facts list and this script before `</body>`:

   ```html
   <script>
   (function () {
     var availEl = document.getElementById('availability');
     fetch('/api/retreat/availability')
       .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
       .then(function (a) {
         if (a.source !== 'ocs' || typeof a.confirmed !== 'number') return;
         availEl.hidden = false;
         if (a.remaining > 0) {
           availEl.classList.remove('is-full');
           availEl.innerHTML = '<strong>' + a.confirmed + ' of ' + a.capacity +
             ' spots filled</strong>, ' + a.remaining +
             (a.remaining === 1 ? ' spot' : ' spots') + ' remaining.';
         } else {
           availEl.classList.add('is-full');
           availEl.innerHTML = '<strong>The event is full</strong> (' + a.capacity +
             ' of ' + a.capacity + ' spots filled). Contact the organizer about openings.';
         }
       })
       .catch(function () {});
   })();
   </script>
   ```

   The strip renders only when the API answers with `source: "ocs"`, so an outage or
   a missing key shows nothing rather than a wrong number. The `.availability` CSS is
   in the old page's `<style>` block.

   Server side: `retreat.service` on the VPS (port 3006, Node 22, no dependencies)
   is still running and Caddy still proxies `/api/retreat/*` to it. It reads
   `GET /api/events/{EVENT_ID}/guests` with the `Ocs-Api-Key` header, caches 60 s,
   serves the last good count if OCS is down, and excludes declined/cancelled guests.
   To point it at a new event, change the event ID and `CAPACITY` in `/etc/retreat.env`
   and restart. The OCS key (`retreat-counter`, access level Custom, exactly one
   permission: Events -> Full Read Events) can read every event's guest list, so it
   stays in the mode-600 env file on the VPS, never in git or the browser.

5. **Before launch, test with a real signup** on the live OCS page (the retreat used
   a real charge, then refunded/recorded it) and check that the organizer receives
   OCS's notification. Tell the organizer about the two-deletion rule.

6. **Takedown after the event** (what was done Nov 1, 2026): comment out the homepage
   section again, remove the ministries button, convert the page to a past-event
   record (past tense intro, drop the deadline/lodging facts, replace the Register
   box with a "This Event Has Concluded" box, remove the counter markup and script,
   `robots noindex, follow`), remove its sitemap entry, delete any unlisted test page.
   Keep the page live so printed QR codes and flyers land somewhere friendly, and keep
   the images on disk. The VPS service stays up but idle.

## What the retreat did NOT do, and why

- **No self-hosted form.** The first version (Aug 2026) posted to the VPS service,
  stored a JSONL roster, emailed organizers through Resend, and had a waitlist. It
  worked, but payment still had to happen in OCS, so the two systems disagreed. The
  Aug 21 cutover made OCS the single source of record; the self-hosted form is
  flag-gated (`OCS_CUTOVER=1`) in the retreat repo, not deleted, if an event ever needs
  a free signup with no OCS event.
- **No OCS embed on the site.** Embedding the OCS form (`data-ocs-embed="form"`) was
  rejected for the same reasons giving is a link-out: OCS owns validation, payment,
  and mobile quirks, and a link is more reliable than an iframe-in-a-div.
- **No names on the public page.** Counts only. The guest list is personal data.
