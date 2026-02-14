// English translations aggregator
// This file imports all modular translation files and combines them
// Common translations (auth) are spread into the root, while component-specific
// translations are kept as namespaces

import auth from "./auth.json";
import navbar from "./navbar.json";
import banner from "./banner.json";
import jobSearchFilter from "./jobSearchFilter.json";
import registerButton from "./registerButton.json";
import registrationModal from "./registrationModal.json";
import registerEmployer from "./registerEmployer.json";
import registerJobSeeker from "./registerJobSeeker.json";
import registerSupervisory from "./registerSupervisory.json";
import jobDescriptionPage from "./jobDescriptionPage.json";
import jobSeekerProfile from "./jobSeekerProfile.json";
import companyProfile from "./companyProfile.json";

export default {
  // Spread common/auth translations into root
  ...auth,

  // Component-specific namespaces
  navbar,
  banner,
  jobSearchFilter,
  registerButton,
  registrationModal,
  registerEmployer,
  registerJobSeeker,
  registerSupervisory,
  jobDescriptionPage,
  jobSeekerProfile,
  companyProfile,
};
