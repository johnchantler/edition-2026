/**
 * Handlers for content nodes the SDK's renderer does not draw itself.
 *
 * Without one, the renderer drops the node and leaves a gap where the author
 * put it. Pass this to VenueContent's `components` wherever `renderedStyles`
 * goes to `contentStyles`, so a content body renders the same blocks everywhere.
 *
 * Kept out of the `utils` barrel so modules that only need styles or helpers
 * don't pull in the signup form.
 */
import type { NodeHandlers } from "@venuecms/sdk-next";

import { EmailListSignupBlock } from "@/components/EmailSignup";

export const contentHandlers: NodeHandlers = {
  emailListSignup: EmailListSignupBlock,
};
