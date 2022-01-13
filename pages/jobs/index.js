import Header from "../Header";
import Link from "next/link";
import { AiFillCalendar } from "react-icons/ai";
const jobs = ({ date, jobs }) => {
  return (
    <div>
      <Header />
      <h1 className="text-center">
        <AiFillCalendar /> {date}
      </h1>
      <div className="jobs">
        {jobs.data.map((job, id) => {
          const { Last_date, Title, Salary, Eligibility, Slug } =
            job.attributes;
          const formatSalary = Salary.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
          });
          const last_date_to_apply = new Date(Last_date).toLocaleDateString();

          return (
            <div className="job" key={id}>
              <Link href={"/jobs/" + Slug}>
                <a>
                  <h2>{Title}</h2>
                </a>
              </Link>
              <p className="salary">{formatSalary}/mo.</p>
              {Eligibility ? <p>Eligibity: {Eligibility}</p> : ""}
              {Last_date ? <p>Last Date: {last_date_to_apply}</p> : ""}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const d = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const res = await fetch(
    "https://enigmatic-shelf-44944.herokuapp.com/api/jobs"
  );
  const data = await res.json();

  return {
    props: { date: d, jobs: data }, // will be passed to the page component as props
  };
}
export default jobs;
