import { Button, Label, Pagination, Select, TextInput } from "flowbite-react";
import { useGetPostsQuery } from "../app/service/postApiSlice";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();

  const [query, setQuery] = useState({
    searchTerm: "",
    sort: "desc",
    category: "",
    limit: 9,
    startIndex: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  console.log(query.startIndex);
  const onPageChange = (page) => {
    setQuery({ ...query, startIndex: (page - 1) * 9 });
    setCurrentPage(page);
  };

  const { searchTerm, sort, category, limit, startIndex } = query;
  const { data, isSuccess } = useGetPostsQuery({
    searchTerm,
    sort,
    category,
    limit,
    startIndex,
  });
  let posts = [];
  if (data) {
    posts = data.posts;
  }
  useEffect(() => {
    const URLParams = new URLSearchParams(location.search);
    setQuery({
      ...query,
      searchTerm: URLParams.get("searchTerm") || "",
      sort: URLParams.get("sort") || "desc",
      category: URLParams.get("category") || "",
    });
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setQuery({
      ...query,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const URLParams = new URLSearchParams();
    URLParams.set("searchTerm", searchTerm || "");
    URLParams.set("sort", sort || "desc");
    URLParams.set("category", category || "");
    const queryString = URLParams.toString();
    navigate(`/search?${queryString}`);
  };
  const totalPages=Math.ceil(data?.totalPosts || 0 / query.limit);
  return (
    <>
   {isSuccess && ( <div>
    <div>
      <form className="flex flex-col gap-4 p-2" onSubmit={handleSubmit}>
        <div className="flex items-center gap-4">
          <Label
            htmlFor="searchTerm"
            value="Search :"
            className="text-md font-semibold flex-1"
          />
          <TextInput
            placeholder="search..."
            id="searchTerm"
            className="flex-1"
            value={searchTerm}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center gap-4">
          <Label
            htmlFor="sort"
            value="Sort :"
            className="text-md font-semibold flex-1"
          />
          <Select
            id="sort"
            className="flex-1"
            value={sort}
            onChange={handleChange}
          >
            <option value="desc">Newest</option>
            <option value="asc">Oldest</option>
          </Select>
        </div>
        <div className="flex items-center gap-4">
          <Label
            htmlFor="category"
            value="Category :"
            className="text-md font-semibold flex-1"
          />
          <Select
            id="category"
            className="flex-1"
            value={category}
            onChange={handleChange}
          >
            <option value="">All</option>
            <option value="uncategorized">Uncategorized</option>
            <option value="reactjs">React JS</option>
            <option value="nodejs">Node JS</option>
            <option value="expressjs">Express JS</option>
          </Select>
        </div>
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Explore Articles
        </Button>
      </form>
    </div>
    <section>
      <h1 className="text-2xl font-semibold">Post Results :</h1>
      <div className="flex flex-wrap gap-4 justify-center lg:gap-8 p-2">
        {posts?.length===0?(<p className="text-center text-gray-500">No posts found.</p>):(posts?.map((post) => (
          <PostCard post={post} key={post._id} />
        )))}
      </div>
      <div className={`flex overflow-x-auto sm:justify-center ${totalPages<2&&"hidden"}`}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          showIcons
        />
      </div>
    </section>
  </div>)}
  </>
  );
}
