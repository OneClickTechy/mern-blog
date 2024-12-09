import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoadingPage from "./components/LoadingPage";
// Lazy load components
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Signin = lazy(() => import("./pages/Signin"));
const Signup = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Header = lazy(() => import("./components/Header"));
const Footercom = lazy(() => import("./components/Footer"));
const PrivateRoutes = lazy(() => import("./components/PrivateRoutes"));
const OnlyAdminPrivateRoutes = lazy(() => import("./components/OnlyAdminPrivateRoutes"));
const CreatePost = lazy(() => import("./pages/CreatePost"));
const UpdatePost = lazy(() => import("./pages/UpdatePost"));
const Post = lazy(() => import("./pages/Post"));
const ScrollToTop = lazy(() => import("./components/ScrollToTop"));
const Search = lazy(() => import("./pages/Search"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-black dark:bg-slate-950 dark:text-white">
        <ScrollToTop />
        <Header />
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            {/* Error Handle Route */}
            <Route path="*" element={<ErrorPage />} />
            
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/post/:slug" element={<Post />} />
            <Route path="/search" element={<Search />} />
            
            {/* Auth Routes */}
            <Route path="/sign-in" element={<Signin />} />
            <Route path="/sign-up" element={<Signup />} />
            
            {/* User Routes */}
            <Route element={<PrivateRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<OnlyAdminPrivateRoutes />}>
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/update-post/:postId" element={<UpdatePost />} />
            </Route>
          </Routes>
        </Suspense>
        <Footercom />
      </div>
    </BrowserRouter>
  );
}
