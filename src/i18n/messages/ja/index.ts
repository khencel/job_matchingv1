// Japanese translations aggregator
// This file imports all modular translation files and combines them
// Common translations (auth) are spread into the root, while component-specific
// translations are kept as namespaces

import auth from "./auth.json";
import navbar from "./navbar.json";
import banner from "./banner.json";
import bannerExtended from "./bannerExtended.json";
import jobSearchFilter from "./jobSearchFilter.json";
import jobSearchFilterExtended from "./jobSearchFilterExtended.json";
import registerButton from "./registerButton.json";
import registrationModal from "./registrationModal.json";
import registerEmployer from "./registerEmployer.json";
import registerEmployerStep2Extended from "./registerEmployerStep2Extended.json";
import registerJobSeeker from "./registerJobSeeker.json";
import registerSupervisory from "./registerSupervisory.json";
import jobDescriptionPage from "./jobDescriptionPage.json";
import jobSeekerProfile from "./jobSeekerProfile.json";
import companyProfile from "./companyProfile.json";

// 新しい翻訳
import footer from "./footer.json";
import registration from "./registration.json";
import step1Register from "./step1Register.json";
import verifyEmailModal from "./verifyEmailModal.json";
import filterJobs from "./filterJobs.json";
import jobCard from "./jobCard.json";
import loginPage from "./loginPage.json";
import jobSupportFeatures from "./jobSupportFeatures.json";
import qAndA from "./qAndA.json";
import contactUsModal from "./contactUsModal.json";
import employerPostJobHeader from "./employerPostJobHeader.json";
import employerProfileHeader from "./employerProfileHeader.json";
import employerProfileBody from "./employerProfileBody.json";
import addSkill from "./addSkill.json";
import adminSidebar from "./adminSidebar.json";
import jobSeekerDashboard from "./jobSeekerDashboard.json";
import employerSidebar from "./employerSidebar.json";

// アプリフォルダーの翻訳
import notFound from "./notFound.json";
import metadata from "./metadata.json";
import legalNotice from "./legalNotice.json";
import findJobsPage from "./findJobsPage.json";
import jobDescriptionPageExtended from "./jobDescriptionPageExtended.json";
import companyProfilePage from "./companyProfilePage.json";
import adminUsers from "./adminUsers.json";
import adminApplicants from "./adminApplicants.json";
import adminApplicantsFilter from "./adminApplicantsFilter.json";
import supervisoryOverview from "./supervisoryOverview.json";
import supervisoryApplicants from "./supervisoryApplicants.json";
import supervisoryProfile from "./supervisoryProfile.json";
import jobSeekerAppliedJobs from "./jobSeekerAppliedJobs.json";
import jobSeekerDocuments from "./jobSeekerDocuments.json";
import jobSeekerProfileExtended from "./jobSeekerProfileExtended.json";
import jobSeekerResumeBuilder from "./jobSeekerResumeBuilder.json";
import jobSeekerResumeForm from "./jobSeekerResumeForm.json";
import jobSeekerResumeTemplate from "./jobSeekerResumeTemplate.json";
import employerOverview from "./employerOverview.json";
import employerJobListing from "./employerJobListing.json";
import employerJobListingEditModal from "./employerJobListingEditModal.json";
import employerApplicants from "./employerApplicants.json";
import employerPerksBenefits from "./employerPerksBenefits.json";
import employerPostJobPerksBenefit from "./employerPostJobPerksBenefit.json";
import changePasswordModal from "./changePasswordModal.json";
import jobListFilter from "./jobListFilter.json";
import registrationEmployerPage from "./registrationEmployerPage.json";
import registrationJobSeekerPage from "./registrationJobSeekerPage.json";

export default {
  // 共通/認証翻訳をルートに展開
  ...auth,

  // コンポーネント固有のネームスペース
  navbar,
  banner,
  bannerExtended,
  jobSearchFilter,
  jobSearchFilterExtended,
  registerButton,
  registrationModal,
  registerEmployer,
  registerEmployerStep2Extended,
  registerJobSeeker,
  registerSupervisory,
  jobDescriptionPage,
  jobSeekerProfile,
  companyProfile,
  footer,
  registration,
  step1Register,
  verifyEmailModal,
  filterJobs,
  jobCard,
  loginPage,
  jobSupportFeatures,
  qAndA,
  contactUsModal,
  employerPostJobHeader,
  employerProfileHeader,
  employerProfileBody,
  addSkill,
  adminSidebar,
  jobSeekerDashboard,
  employerSidebar,

  // アプリフォルダーのネームスペース
  notFound,
  metadata,
  legalNotice,
  findJobsPage,
  jobDescriptionPageExtended,
  companyProfilePage,
  adminUsers,
  adminApplicants,
  adminApplicantsFilter,
  supervisoryOverview,
  supervisoryApplicants,
  supervisoryProfile,
  jobSeekerAppliedJobs,
  jobSeekerDocuments,
  jobSeekerProfileExtended,
  jobSeekerResumeBuilder,
  jobSeekerResumeForm,
  jobSeekerResumeTemplate,
  employerOverview,
  employerJobListing,
  employerJobListingEditModal,
  employerApplicants,
  employerPerksBenefits,
  employerPostJobPerksBenefit,
  changePasswordModal,
  jobListFilter,
  registrationEmployerPage,
  registrationJobSeekerPage,
};
