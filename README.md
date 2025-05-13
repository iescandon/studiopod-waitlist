# StudioPod Waitlist

A mobile-responsive full-stack waitlist application that optimizes access to StudioPod, an automated headshot booth, by eliminating the need to wait in line. Built specifically for an ALPFA event I organized as Director of Corporate Events, the app streamlined StudioPod access without disrupting a concurrent live fireside chat with its founders.

Attendees scanned a QR code to join the virtual waitlist, view real-time queue updates, and receive SMS alerts (via Textbelt). Included a photo booth attendant interface to manage the queue efficiently. Built with Next.js, TypeScript, Tailwind CSS, MUI, MongoDB, and Mongoose.

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

<img width="1709" alt="Screenshot 2025-05-12 at 7 26 56 PM" src="https://github.com/user-attachments/assets/43429c83-2180-40eb-a7e2-35908fb3d11c" />

![IMG_2350](https://github.com/user-attachments/assets/e1f8ebad-c549-4e25-af86-81d22c109827)
