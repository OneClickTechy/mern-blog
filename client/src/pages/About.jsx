import { Button, Card, List } from "flowbite-react";

export default function About() {
  return (
    <section className="min-h-screen max-w-3xl mx-auto p-2 my-8">
      <h1 className="text-4xl font-bold text-center my-8">ABOUT US</h1>
      <article className="leading-loose text-justify flex flex-col gap-8 sm:gap-32 sm:p-4">
        <div>
          <h2 className="sm:text-3xl text-lg font-semibold my-4 text-center">
            Welcome to Mr.JP&apos;s BLOG Site
          </h2>
          <p className="text-sm sm:text-base text-gray-500">
            your one-stop destination for insightful articles, tips, and stories
            across various topics! Our mission is to create a space where
            knowledge meets creativity, empowering readers to explore new ideas,
            perspectives, and skills.
          </p>
        </div>
        <div>
          <h3 className="sm:text-3xl text-lg font-semibold my-2 text-right">
            Who We Are
          </h3>
          <p className="text-sm sm:text-base text-gray-500">
            We are a passionate team of writers, developers, and creators who
            believe in the power of storytelling and shared learning. Whether
            you&apos;re here to read about technology, lifestyle, travel, or
            personal development, we aim to provide content that resonates with
            you.
          </p>
        </div>
        <div>
          <h3 className="sm:text-3xl text-lg font-semibold my-2">
            Why We Created This Blog
          </h3>
          <p className="text-sm sm:text-base text-gray-500">
            In a fast-paced digital world, we wanted to build a platform that
            fosters meaningful connections and engages readers with fresh,
            authentic, and well-researched content. Our goal is to inspire and
            inform, helping you grow along your personal or professional
            journey.
          </p>
        </div>
        <div>
          <h3 className="sm:text-3xl text-lg font-semibold my-2 text-right">
            What We Offer
          </h3>
          <List className="sm:ml-4 text-sm sm:text-base">
            <List.Item>
              Engaging Content: From tutorials and how-tos to thought-provoking
              opinion pieces.
            </List.Item>
            <List.Item>
              Interactive Features: Share your thoughts in the comments or join
              discussions to connect with like-minded individuals.
            </List.Item>
            <List.Item>
              Customizable Experience: Save your favorite articles and
              personalize your reading list.
            </List.Item>
          </List>
        </div>
        <div>
          <h3 className="sm:text-3xl text-lg font-semibold my-2">
            Meet the Developer
          </h3>
          <div className="max-w-sm h-auto bg-sky-100 dark:bg-gray-800 py-4 rounded-lg border dark:border-gray-500 drop-shadow-xl mx-auto border-teal-950">
            <img
              height={96}
              width={96}
              alt="Developer Profile"
              src="https://res.cloudinary.com/dj3ckhyfk/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1733365714/gitHub_Profile_rdvz3p.png"
              className="my-4 rounded-full shadow-lg mx-auto"
            />
            <p className="text-center font-semibold">JEYAPANDI</p>
            <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
              FullStack Developer
            </p>
            <div className="flex justify-around flex-nowrap my-8">
              <Button outline>
                <a
                  href="https://github.com/OneClickTechy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Profile
                </a>
              </Button>
              <Button outline>
                <a>Contact</a>
              </Button>
            </div>
            <p className="font-mono p-4">
              Hi! I&apos;m Jeyapandi R, the creator of this blog. As a MERN
              stack developer, I&apos;ve built this platform from the ground up
              with love and dedication. Combining my passion for coding and
              storytelling, this site is a reflection of my vision for a better,
              more connected digital world.
            </p>
          </div>
        </div>
        <div>
          <h3 className="sm:text-3xl text-lg font-semibold my-2 text-right">
            Join Us
          </h3>
          <p className="text-sm sm:text-base text-gray-500">
            We&apos;d love for you to be part of our community! Explore our
            blog, share your feedback, and let us know what inspires you. If you
            have ideas for topics or collaborations, don&apos;t hesitate to
            reach out. Together, let&apos;s make this space an inspiring corner
            of the web.
          </p>
        </div>
      </article>
    </section>
  );
}
