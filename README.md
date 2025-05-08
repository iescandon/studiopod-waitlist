# StudioPod Waitlist

A queue management app built with Next.js, TypeScript, MongoDB, Mongoose, MUI, and Tailwind CSS, created for an ALPFA Houston event I helped lead as a board member. Designed to streamline access to the automated headshot booth during a live fireside chat with StudioPod’s founders. Attendees scanned a QR code to join the virtual waitlist, view real-time queue updates, and receive SMS alerts (via Textbelt). Included an admin interface for booth attendants to manage the queue efficiently without disrupting the main event. 

https://studiopod-waitlist.vercel.app/

## To Test the Waitlist
1. Join the [test queue](https://studiopod-waitlist.vercel.app/93567111-eda7-4845-94b9-e7c64770bd5a/join)
2. [Normal view](https://studiopod-waitlist.vercel.app/93567111-eda7-4845-94b9-e7c64770bd5a) of waitlist
3. [Photo booth attendant view](https://studiopod-waitlist.vercel.app/93567111-eda7-4845-94b9-e7c64770bd5a?accessCode=testeventaccesscode) of the waitlist
   - The chat icon triggers a text message notifying the attendee they are next in line.
   - The camera icon marks the attendee as currently inside the StudioPod.
   - The checkmark icon indicates the session is complete and the attendee can be removed from the list.
   - The trash icon marks a no-show, removing the attendee from the list and sending a notification that they have been skipped.
4. Click on icons and see the status changes and receive text messages. If you don’t receive messages it’s possibly because I ran out of textbelt credits.
