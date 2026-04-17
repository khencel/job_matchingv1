// Japanese translations aggregator
// This file imports all modular translation files and combines them
// Common translations (auth) are spread into the root, while component-specific
// translations are kept as namespaces

import auth from "./auth.json";
import navbar from "./navbar.json";
import banner from "./banner.json";
import bannerExtended from "./bannerExtended.json";
import about from "./about.json";
import contactUs from "./contactUs.json";
import jobSearchFilter from "./jobSearchFilter.json";
import jobSearchFilterExtended from "./jobSearchFilterExtended.json";
import serviceContent from "./serviceContent.json";
import registerButton from "./registerButton.json";
import registrationModal from "./registrationModal.json";
import registerEmployer from "./registerEmployer.json";
import registerEmployerStep2 from "./registerEmployerStep2.json";
import registerEmployerStep2Extended from "./registerEmployerStep2Extended.json";
import registerEmployerStep3 from "./registerEmployerStep3.json";
import registerJobSeeker from "./registerJobSeeker.json";
import registerJobSeekerStep2 from "./registerJobSeekerStep2.json";
import registerJobSeekerStep3 from "./registerJobSeekerStep3.json";
import registerEmployerStep4 from "./registerEmployerStep4.json";
import registerSupervisory from "./registerSupervisory.json";
import registerSupervisoryStep2 from "./registerSupervisoryStep2.json";
import registerSupervisoryStep3 from "./registerSupervisoryStep3.json";
import registerSupervisoryStep4 from "./registerSupervisoryStep4.json";
import jobDescriptionPage from "./jobDescriptionPage.json";
import jobSeekerProfile from "./jobSeekerProfile.json";
import companyProfile from "./companyProfile.json";
import employerJobDescription from "./employerJobDescription.json";

// 新しい翻訳
import footer from "./footer.json";
import registration from "./registration.json";
import step1Register from "./step1Register.json";
import verifyEmailModal from "./verifyEmailModal.json";
import filterJobs from "./filterJobs.json";
import jobCard from "./jobCard.json";
import loginPage from "./loginPage.json";
import displayDocuments from "./displayDocuments.json";
import displayResume from "./displayResume.json";
import previewFile from "./previewFile.json";
import publicProfileJobSeeker from "./publicProfileJobSeeker.json";
import jobSupportFeatures from "./jobSupportFeatures.json";
import qAndA from "./qAndA.json";
import contactUsModal from "./contactUsModal.json";
import employerPostJobHeader from "./employerPostJobHeader.json";
import employerProfileHeader from "./employerProfileHeader.json";
import employerProfileBody from "./employerProfileBody.json";
import addSkill from "./addSkill.json";
import jobListCard from "./jobListCard.json";
import adminSidebar from "./adminSidebar.json";
import jobSeekerDashboard from "./jobSeekerDashboard.json";
import jobSeekerLayout from "./jobSeekerLayout.json";
import employerSidebar from "./employerSidebar.json";
import spinner from "./spinner.json";

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
import adminSettings from "./adminSettings.json";
import supervisoryOverview from "./supervisoryOverview.json";
import supervisoryApplicants from "./supervisoryApplicants.json";
import supervisoryProfile from "./supervisoryProfile.json";
import supervisoryLayout from "./supervisoryLayout.json";
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
import employerJobInformation from "./employerJobInformation.json";
import changePasswordModal from "./changePasswordModal.json";
import jobListFilter from "./jobListFilter.json";
import registrationEmployerPage from "./registrationEmployerPage.json";
import registrationJobSeekerPage from "./registrationJobSeekerPage.json";
import registerPage from "./registerPage.json";
import forgotPassword from "./forgotPassword.json";
import pagination from "./pagination.json";
import list from "./list.json";





export default {
  // 共通/認証翻訳をルートに展開
  ...auth,

  // コンポーネント固有のネームスペース
  navbar,
  banner,
  bannerExtended,
  about,
  contactUs,
  jobSearchFilter,
  jobSearchFilterExtended,
  serviceContent,
  registerButton,
  registrationModal,
  registerEmployer,
  registerEmployerStep2,
  registerEmployerStep2Extended,
  registerEmployerStep3,
  registerJobSeeker,
  registerJobSeekerStep2,
  registerJobSeekerStep3,
  registerEmployerStep4,
  registerSupervisory,
  registerSupervisoryStep2,
  registerSupervisoryStep3,
  registerSupervisoryStep4,
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
  displayDocuments,
  displayResume,
  previewFile,
  publicProfileJobSeeker,
  jobSupportFeatures,
  qAndA,
  contactUsModal,
  employerPostJobHeader,
  employerProfileHeader,
  employerProfileBody,
  addSkill,
  jobListCard,
  adminSidebar,
  jobSeekerDashboard,
  jobSeekerLayout,
  employerSidebar,
  spinner,

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
  adminSettings,
  supervisoryOverview,
  supervisoryApplicants,
  supervisoryProfile,
  supervisoryLayout,
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
  employerJobInformation,
  changePasswordModal,
  jobListFilter,
  registrationEmployerPage,
  registrationJobSeekerPage,
  registerPage,
  forgotPassword,
  pagination,
  list,
  employerJobDescription
};
