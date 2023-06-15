import React, { useState, lazy } from "react";
import { ThemeProvider } from "@emotion/react";
import "./App.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import theme from "./theme/Theme";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import NotResponsive from "./pages/NotResponsive";
import { Box } from "@mui/system";
import { Fab } from "@mui/material";
import AlertPopUp from "./components/Alert/AlertPopUp";
import SideBarResponsive from "./components/SideBarResponsive";
import Dialogue from "./components/Dialogbox/Dialogue";
import ReportABug from "./components/ReportABug/ReportABug";
import ProtechtedRoute from "./Routes/ProtechtedRoute";
import PrivateRoute from "./Routes/PrivateRoute";
import BigLoader from "./components/Skeleton/BigLoader";
import ContactSupport from "./pages/ContactSupport/ContactSupport";
import CourseUnderReview from "./pages/Courses/CourseUnderReview";
import AdminTask from "./pages/Task/AdminTask/index";
import CreateTask from "./pages/Task/AdminTask/CreateTask";
import UserTask from "./pages/Task/UserTask";
import DynamicRoute from "./Routes/DynamicRoute";
import CourseStatusUpdate from "./pages/Courses/CourseStatusUpdate";
import ViewTask from "./pages/Task/ViewTask";
const LazyCart = React.lazy(() => import("./pages/Courses/Cart"));
const LazyContest = React.lazy(() => import("./pages/Contest/ContestHome"));
const LazyCourseVideo = React.lazy(() =>
  import("./pages/Coursevideo/Coursevideo")
);
const LazyHome = React.lazy(() => import("./pages/Courses/Home"));
const LazyUserProfile2 = lazy(() => import("./pages/Contest/UserProfile2"));
const LazyMyCourses = lazy(() => import("./pages/Courses/MyCourses"));
const LazyWishList = lazy(() => import("./pages/Courses/Wishlist"));
const LazyCheckOut = lazy(() => import("./pages/Courses/CheckOut"));
const LazyCreateCourse = lazy(() => import("./pages/Courses/CreateCourse"));
const LazyCourseUpdate = lazy(() => import("./pages/Courses/CourseUpdate"));
const LazyCreateContest = lazy(() =>
  import("./components/Admin/Pages/CreateContest")
);
const LazyEditContest = lazy(() =>
  import("./components/Admin/Pages/EditContest")
);
const LazyEditProblem = lazy(() =>
  import("./components/Admin/Pages/EditProblem")
);
const LazyCreateProblem = lazy(() =>
  import("./components/Admin/Pages/CreateProblem")
);
const LazyViewAll = lazy(() =>
  import("./components/CodingContests/ContestHome/ViewAll")
);
const LazyContestDetail = lazy(() => import("./pages/Contest/ContestDetail"));
const LazyContestRanking = lazy(() => import("./pages/Contest/ContestRanking"));
const LazyContestProbleme = lazy(() =>
  import("./pages/Contest/ContestProblem")
);
const LazyExplanation = lazy(() =>
  import("./components/CodingContests/ContestProblem/Explanation")
);
const LazyUploadCodeLink = lazy(() =>
  import("./components/CodingContests/ContestProblem/UploadCodeLink")
);
const LazyProblemMySubmissions = lazy(() =>
  import("./components/CodingContests/ContestProblem/ProblemMySubmissions")
);
const LazyDiscussion = lazy(() =>
  import("./components/CodingContests/ContestProblem/Discussion")
);
const LazyCourseupload = lazy(() =>
  import("./pages/Courseupload/Courseupload")
);
const LazySignIn = lazy(() => import("./pages/SignInSignUp/SignIn"));
const LazySignUp = lazy(() => import("./pages/SignInSignUp/SignUp"));
const LazyPageNotFound = lazy(() =>
  import("./pages/PageNotFound/PageNotFound")
);
const LazyVerifyuser = lazy(() => import("./pages/SignInSignUp/Verifyuser"));
const LazyUserWithoutLogin = lazy(() =>
  import("./pages/Courses/UserWithoutLogin")
);
const LazyForgotPassword = lazy(() =>
  import("./pages/ForgotPassword/ForgotPasswordEmail")
);
const LazyResetPassword = lazy(() =>
  import("./pages/ForgotPassword/ConfirmPassword")
);

const LazySessionTimedOut = lazy(() =>
  import("./pages/SessionTimedOut/SessionTimedOut")
);

const LazyInternalServerError = lazy(() =>
  import("./pages/InternalServerError/InternalServerError")
);
// const LazyContactSupport=lazy(()=> import("./pages/Courses/ContactSupport"))

function App() {
  const matches = useMediaQuery("(max-width:1000px)");
  const Token = localStorage.getItem("Token");
  const [openDialog, setOpenDialog] = useState(false);

  const Layout = () => {
    return (
      <>
        <SideBarResponsive />
        <Outlet />
      </>
    );
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Box
            sx={{
              flexGrow: 1,
              width: { lg: `calc(100%)` },
              minWidth: { lg: "978px" },
              margin: "auto!important",
              maxWidth: { xl: "1640px" },
            }}
          >
            <Box>
              <Fab
                variant="extended"
                size={"medium"}
                color="primary"
                aria-label="add"
                sx={{
                  p: 2,
                  position: "fixed",
                  bottom: { xs: "48px", sm: "24px" },
                  right: { xs: "16px", sm: "24px" },
                  zIndex: 1200,
                }}
                onClick={() => setOpenDialog(true)}
              >
                Report a Bug
              </Fab>
            </Box>
            <Dialogue
              opendia={openDialog}
              setOpendia={setOpenDialog}
              title={"Report a Bug"}
              children={<ReportABug setOpendia={setOpenDialog} />}
              maxWidth="500px"
            />

            <AlertPopUp />
            {/* {matches === false ? ( */}
            <>
              <React.Suspense fallback={<BigLoader />}>
                <Routes>
                  <Route element={<ProtechtedRoute />}>
                    <Route path="/" element={<Layout />}>
                      <Route path="/" element={<LazyHome />} />
                      <Route
                        path="/user-profile"
                        element={<LazyUserProfile2 />}
                      />
                      <Route path="/my-cart" element={<LazyCart />} />
                      <Route path="/my-courses" element={<LazyMyCourses />} />
                      <Route path="/wishlist" element={<LazyWishList />} />
                      <Route path="/check-out" element={<LazyCheckOut />} />
                      <Route
                        path="/create-course"
                        element={<LazyCreateCourse />}
                      />
                      <Route
                        path="/course-update/:id"
                        element={<LazyCourseUpdate />}
                      />

                      <Route path="/contest" element={<LazyContest />} />
                      <Route
                        path="/admin/contest"
                        element={<LazyCreateContest />}
                      />
                      <Route
                        path="/admin/:contestId"
                        element={<LazyCreateProblem />}
                      />
                      <Route
                        path="/contest/all/rankings"
                        element={<LazyViewAll />}
                      />
                      <Route
                        path="/contest/:contestId"
                        element={<LazyContestDetail />}
                      />
                      <Route
                        path="/contest/:contestId/:time/:contest_code/ranking"
                        element={<LazyContestRanking />}
                      />
                      <Route
                        path="/problem/:problemId"
                        element={<LazyContestProbleme />}
                      >
                        <Route
                          path="/problem/:problemId"
                          element={<LazyExplanation />}
                        />
                        <Route
                          path="/problem/:problemId/explanation"
                          element={<LazyExplanation />}
                        />
                        <Route
                          path="/problem/:problemId/submit"
                          element={<LazyUploadCodeLink />}
                        />
                        <Route
                          path="/problem/:problemId/submissions"
                          element={<LazyProblemMySubmissions />}
                        />
                        <Route
                          path="/problem/:problemId/discussion"
                          element={<LazyDiscussion />}
                        />
                      </Route>
                      <Route
                        path="/userProfile"
                        element={<LazyUserProfile2 />}
                      />
                      <Route
                        path="/admin/contest/:contestId/edit"
                        element={<LazyEditContest />}
                      />
                      <Route
                        path="/admin/:problem/edit/"
                        element={<LazyEditProblem />}
                      />
                      <Route
                        path="/coursevideos/:id"
                        element={<LazyCourseVideo />}
                      />
                      {/* <Route
                        path="/task"
                        element={
                          <DynamicRoute
                            adminPage={<AdminTask />}
                            userPage={<UserTask />}
                          />
                        }
                      ></Route>
                      <Route
                        path="/task/:id"
                        element={
                          <DynamicRoute
                            // adminPage={<ViewTask />}
                            userPage={<UserTask />}
                          />
                        }
                      ></Route>
                      <Route
                        path="/create-task"
                        element={
                          <DynamicRoute
                            adminPage={<CreateTask />}
                            userPage={<UserTask />}
                          />
                        }
                      ></Route> */}
                    </Route>

                    <Route
                      path="/user-without-login"
                      element={<LazyUserWithoutLogin />}
                    />
                    {/* <Route path="/userProfile" element={<UserProfile />} /> */}
                  </Route>
                  <Route path="/sign-in" element={<LazySignIn />} />
                  <Route path="/sign-up" element={<LazySignUp />} />
                  <Route
                    path="/forgot-password"
                    element={<LazyForgotPassword />}
                  />
                  <Route
                    path="/courseupload/:id"
                    element={<LazyCourseupload />}
                  />
                  <Route
                    path="/resetpassword/:id"
                    element={<LazyResetPassword />}
                  />
                  <Route
                    path="/session-expired"
                    element={<LazySessionTimedOut />}
                  />
                  <Route
                    path="/internal-server-error"
                    element={<LazyInternalServerError />}
                  />
                  <Route path="*" element={<LazyPageNotFound />} />
                  <Route path="/verifyuser/:id" element={<LazyVerifyuser />} />
                  <Route element={<ProtechtedRoute />}>
                    <Route
                      path="/update-course-status/:id"
                      element={
                        <PrivateRoute>
                          <CourseStatusUpdate />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/contact-support"
                      element={<ContactSupport />}
                    />
                  </Route>
                  <Route
                    path="/under-review"
                    element={<CourseUnderReview />}
                  ></Route>
                </Routes>
              </React.Suspense>
            </>
            {/* ) : (
             <NotResponsive />
             )}  */}
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
