import Link from "next/link";

const Card = ({ problem }) => {
  const { title, name, _id } = problem;
  const tags = problem.tag || [];

  return (
    <Link
      href={`/question/${_id}`}
      className="flex flex-col md:flex-row items-start w-full border rounded-xl shadow-sm bg-white hover:bg-[#EAE4D5] transition duration-200 my-2"
      style={{ borderColor: "#B6B09F" }}
    >
      <div className="flex flex-col justify-between w-full p-4">
        <h6 className="text-xl font-semibold text-black mb-2">{title}</h6>

        <div className="flex flex-wrap gap-2 mt-1">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs px-3 py-1 rounded-full font-medium uppercase"
              style={{ backgroundColor: "#B6B09F", color: "#FFFFFF" }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center mt-4 text-sm text-gray-700">
          <span className="font-medium text-black">{name}</span>
        </div>
      </div>
    </Link>
  );
};

export default Card;
