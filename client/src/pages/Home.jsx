import { Button } from "flowbite-react";
import CallToAction from "../components/CallToAction";
import RecentPosts from "../components/RecentPosts";

export default function Home() {
  return (
    <section>
      <div className="max-w-6xl mx-auto py-36 px-2 sm:p-36">
        <h1 className="text-2xl lg:text-6xl font-bold">WELCOME TO MY BLOG</h1>
        <p className="text-sm text-gray-600 dark:text-gray-500 text-justify leading-9">Here you&apos;ll find a variety of articles and tutorials on topics such as web development, software engineering, and programming languages.</p>
      </div>
      <div className="bg-amber-200 dark:bg-gray-900 lg:py-8">
      <CallToAction />
      </div>
      <div className="my-8">
        <RecentPosts limit={9} />
        
        <Button className="mx-auto">Show All Posts</Button>
      </div>

    </section>
  )
}
