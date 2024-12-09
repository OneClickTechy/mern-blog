import { Button, Label, Pagination, Select, TextInput } from "flowbite-react";
import PostCard from "../components/PostCard";
import { useGetPostsQuery } from "../app/service/postApiSlice";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();
  const {search} = useLocation();
  const searchParams = new URLSearchParams(search);
  const [startIndex, setStartIndex]=useState(0);
  const [searchData, setSearchData]=useState({
    searchTerm: searchParams.get("searchTerm") || "",
    sort: searchParams.get("sort") || "desc",
    category: searchParams.get("category") || "",
  })
  useEffect(() => {
    const searchParams = new URLSearchParams(search);
    const searchDataFromUrl= {
      searchTerm: searchParams.get("searchTerm") || "",
      sort: searchParams.get("sort") || "desc",
      category: searchParams.get("category") || "",
    }
    if(searchDataFromUrl.searchTerm !== searchData.searchTerm || searchDataFromUrl.sort !== searchData.sort || searchDataFromUrl.category !== searchData.category){
      console.log("changed")
      setSearchData(searchDataFromUrl)
    }
  },[search])
  const [currentPage, setCurrentPage] = useState(1);
  const handleChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.id]: e.target.value,
    })
  }
  const {data}=useGetPostsQuery({
    startIndex,
    limit:9,
    ...searchData,
  });
  let posts;
  if(data){
    posts = data.posts;
  }
  

  const onPageChange = (page) => {
    setCurrentPage(page);
    setStartIndex((page-1)*9);
    window.scrollTo(0,0)
  };
  const totalPages = data?.totalPosts ? Math.ceil(data.totalPosts / 9) : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1)
    setStartIndex(0);
    const searchParams = new URLSearchParams(search);
    searchParams.set("searchTerm", searchData.searchTerm);
    searchParams.set("sort", searchData.sort);
    searchParams.set("category", searchData.category);
    const searchParamsQuery = searchParams.toString();
    navigate(`/search?${searchParamsQuery}`)
  }
  return (
    <>
        <div className="flex flex-col sm:flex-row divide-gray-500 dark:divide-gray-700 divide-y sm:divide-y-0 sm:divide-x gap-2">
          <form className="min-w-72 flex flex-col gap-4 p-2" onSubmit={handleSubmit}>
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
                value={searchData.searchTerm}
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
                value={searchData.sort}
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
                value={searchData.category}
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
          <section className="p-2">
            <h1 className="text-2xl font-semibold">Post Results :</h1>
            <div className="flex flex-wrap gap-4 justify-center lg:gap-8">
              {posts?.length === 0 ? (
                <p className="text-center text-gray-500">No posts found.</p>
              ) : (
                posts?.map((post) => <PostCard post={post} key={post._id} />)
              )}
            </div>
            <div
              className={`flex overflow-x-auto sm:justify-center ${
                totalPages <=1 && "hidden"
              }`}
            >
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                showIcons
              />
            </div>
          </section>
        </div>
    </>
  );
}
