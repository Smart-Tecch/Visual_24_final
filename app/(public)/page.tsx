import ExploreButton from "@/components/ExploreButton";
const projects = [1, 2, 3, 4];
import { Card } from "@/components/ui/card";

const page = () => {
  return (
    <section>
      <h1 className="text-center">
        <span className="text-blue-500">{`"Visual 24"`}</span> Your Talent{" "}
        <br /> Our Training
      </h1>
      <p className="text-center mt-5">
        Empowering creative minds with practical skills, industry experience and
        modern technology to build successful careers.
      </p>

      <ExploreButton />

      <div className="mt-20 space-y-7">
        <h3>Featured Courses</h3>

        <ul className="events">
          {projects.map((course, i) => (
            <Card key={i}>{}course</Card>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default page;
