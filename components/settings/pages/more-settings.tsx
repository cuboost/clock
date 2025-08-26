import { CustomCSSSection } from "../sections/custom-css-section";
import { LinkSharingSection } from "../sections/link-sharing-section";
import { PersistentStorageSection } from "../sections/persistent-storage-section";
import { ResetSection } from "../sections/reset-section";

export function MoreSettings() {
  return (
    <>
      <CustomCSSSection />
      <LinkSharingSection />
      <PersistentStorageSection />
      <ResetSection />
    </>
  );
}
