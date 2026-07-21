const {onDocumentUpdated} = require("firebase-functions/v2/firestore");
const {defineSecret} = require("firebase-functions/params");
const {logger} = require("firebase-functions");
const {Resend} = require("resend");

const resendApiKey = defineSecret("RESEND_API_KEY");

const ADMIN_EMAIL = "paradeofelements@gmail.com";
const FROM_EMAIL =
  "Parade of Elements <registration@mail.paradeofelements.org>";
const REPLY_TO_EMAIL = "paradeofelements@gmail.com";

exports.sendElementClaimEmails = onDocumentUpdated(
    {
      document: "elements/{elementId}",
      region: "us-east1",
      secrets: [resendApiKey],
    },
    async (event) => {
      const before = event.data.before.data();
      const after = event.data.after.data();

      // Only send when an element becomes unavailable/claimed.
      if (
        before.status === "unavailable" ||
      after.status !== "unavailable"
      ) {
        logger.info("No new element claim detected.", {
          elementId: event.params.elementId,
          beforeStatus: before.status,
          afterStatus: after.status,
        });

        return;
      }

      const {
        name,
        number,
        symbol,
        family,
        userName,
        userEmail,
      } = after;

      if (
        !name ||
      !number ||
      !symbol ||
      !userName ||
      !userEmail
      ) {
        logger.error("Claimed element is missing required email data.", {
          elementId: event.params.elementId,
        });

        return;
      }

      const resend = new Resend(resendApiKey.value());

      const registrantEmail = {
        from: FROM_EMAIL,
        to: userEmail,
        replyTo: REPLY_TO_EMAIL,
        subject: `You claimed ${name} for the Parade of Elements!`,
        html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
          <h2 style="margin-bottom: 8px;">
            Your element is officially claimed!
          </h2>

          <p>Hi ${escapeHtml(userName)},</p>

          <p>
            Thank you for registering for the Parade of Elements.
            You have successfully claimed:
          </p>

          <div style="
            border: 1px solid #ddd;
            border-radius: 10px;
            padding: 18px;
            margin: 20px 0;
            max-width: 360px;
          ">
            <div style="font-size: 30px; font-weight: bold;">
              ${escapeHtml(symbol)}
            </div>

            <div style="font-size: 20px; font-weight: bold;">
              ${escapeHtml(name)}
            </div>

            <div>Atomic number: ${number}</div>
            ${family ? `<div>Family: ${escapeHtml(family)}</div>` : ""}
          </div>

          <p>
            We’ll contact you closer to the parade with additional
            information.
          </p>

          <p>
            Questions? Reply to this email or contact
            paradeofelements@gmail.com.
          </p>

          <p>
            Thanks for helping bring the periodic table to life!
          </p>

          <p>
            — Parade of Elements
          </p>
        </div>
      `,
      };

      const adminEmail = {
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        replyTo: userEmail,
        subject: `New element claimed: ${name} (${symbol})`,
        html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
          <h2>New Parade of Elements registration</h2>

          <p><strong>Element:</strong> ${escapeHtml(name)} (${escapeHtml(symbol)})</p>
          <p><strong>Atomic number:</strong> ${number}</p>
          ${family ? `<p><strong>Family:</strong> ${escapeHtml(family)}</p>` : ""}

          <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;">

          <p><strong>Registrant:</strong> ${escapeHtml(userName)}</p>
          <p>
            <strong>Email:</strong>
            <a href="mailto:${escapeHtml(userEmail)}">
              ${escapeHtml(userEmail)}
            </a>
          </p>
        </div>
      `,
      };

      const registrantResult = await resend.emails.send(
          registrantEmail,
          {
            idempotencyKey: `${event.id}-registrant`,
          },
      );

      if (registrantResult.error) {
        logger.error("Registrant email failed.", {
          error: registrantResult.error,
          elementId: event.params.elementId,
        });

        throw new Error("Unable to send registrant email.");
      }

      const adminResult = await resend.emails.send(adminEmail, {
        idempotencyKey: `${event.id}-admin`,
      });

      if (adminResult.error) {
        logger.error("Admin email failed.", {
          error: adminResult.error,
          elementId: event.params.elementId,
        });

        throw new Error("Unable to send admin email.");
      }

      logger.info("Element claim emails sent.", {
        elementId: event.params.elementId,
        element: name,
        registrantEmailId: registrantResult.data?.id,
        adminEmailId: adminResult.data?.id,
      });
    },
);

function escapeHtml(value) {
  return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll("\"", "&quot;")
      .replaceAll("'", "&#039;");
}
