import Head from 'next/head'
import ReactMarkdown from "react-markdown";
import { BiLinkExternal } from "react-icons/bi";
export const getStaticPaths = async () => {
  const res = await fetch("https://enigmatic-shelf-44944.herokuapp.com/api/jobs");
  const data = await res.json();
  const paths = data.data.map((job) => {
    return {
      params: { job: job.attributes.Slug.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
};
export const getStaticProps = async (context) => {
  const slug = context.params.job;
  const res = await fetch(
    "https://enigmatic-shelf-44944.herokuapp.com/api/jobs?filters[Slug]=" + slug
  );
  const data = await res.json();

  return {
    props: { job: data },
  };
};

import Header from "../Header";

const Job = ({ job }) => {
  console.log(job);
  const singleJob = job.data[0].attributes;
  return (
    <>
      <Header />
      <Head>
        <title>{singleJob.Title}</title>
        <meta name='description' content={singleJob.Contents}/>
      </Head>
      {/* <status-indicator negative pulse  /> */}
      <div className="jobs">
        <h1>{singleJob.Title}</h1>
        <div className="content">
          <ul className="meta">
            <li>Salary: {singleJob.Salary}</li>
            <li>Last date to apply: {singleJob.Last_date}</li>
            <li>Eligibility: {singleJob.Eligibility}</li>
            <li>Vacancies: {singleJob.Vacancies}</li>
          </ul>
          <div>{<ReactMarkdown>{singleJob.Contents}</ReactMarkdown>}</div>
          <a className="apply" href={singleJob.ApplyLink} rel="noreferrer" target="_blank">
            <BiLinkExternal />
            Apply
          </a>
        </div>
      </div>
    </>
  );
};

export default Job;
