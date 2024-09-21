import { Container, Typography } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import AppToolbar from "./UI/AppToolbar/AppToolbar";
import Posts from "./features/posts/Posts";
import FullPost from "./features/posts/Components/FullPost";
import CreatePost from "./features/posts/CreatePost";
import Register from "./features/users/Register";
import Login from "./features/users/Login";

const App = () => {

  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <Container maxWidth="xl" component="main">
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/addNew" element={<CreatePost />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={<Typography variant="h1">Not found</Typography>}
          />
        </Routes>
      </Container>
    </>
  );
}

export default App
