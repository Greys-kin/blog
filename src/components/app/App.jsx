import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import styles from "./App.module.scss";
import ArticlePage from "../../components/article-page";
import Articles from "../../components/articles";
import CreateArticle from "../../components/create-article";
import ErrorPage from "../../components/error-page";
import Header from "../../components/header";
import PageNotFound from "../../components/page-not-found";
import PrivateRoute from "../../components/routes/PrivateRoute";
import PublicRoute from "../../components/routes/PublicRoute";
import SignIn from "../../components/sign-in";
import SignUp from "../../components/sign-up";
import SuccessfulMessage from "../../components/successful-message";
import UserProfile from "../../components/user-profile";
import { checkUserAuth } from "../../store/user-slice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Header />
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route element={<PublicRoute />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
        <Route path="/article/:slug" element={<ArticlePage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/new-article" element={<CreateArticle />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/article/:slug/edit" element={<CreateArticle />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
        <Route path="/error-message" element={<ErrorPage />} />
        <Route path="/successful-message" element={<SuccessfulMessage />} />
      </Routes>
    </div>
  );
}

export default App;
