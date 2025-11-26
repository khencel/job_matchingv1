import Banner from './components/Banner';
import JobSearchFiler from './components/JobSearchFilter';
import Registration from './components/Registration';

export default function HomePage() {
  return (
    <>
      <JobSearchFiler />
      <Banner />
      <hr className="mt-5 w-75 mx-auto" />
      <Registration />
      <hr className="mt-5 w-75 mx-auto" />
    </>
  );
}                                                     