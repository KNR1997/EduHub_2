import Home from "./pages/home/Home";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Users from "./pages/users/Users";
import Products from "./pages/products/Products";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import "./styles/global.scss";
import User from "./pages/user/User";
import Product from "./pages/product/Product";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Students from "./pages/students/Students";
import { createTheme, ThemeProvider, Theme, useTheme } from '@mui/material/styles';
const queryClient = new QueryClient();

const customTheme = (outerTheme: Theme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '--TextField-brandBorderColor': '#bf6fc9',
            '--TextField-brandBorderHoverColor': '#bf6fc9',
            '--TextField-brandBorderFocusedColor': '#6F7E8C',
            '& label.Mui-focused': {
              color: 'var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            'color': '#white'
          },
        },
      },
      // MuiOutlinedInput: {
      //   styleOverrides: {
      //     notchedOutline: {
      //       borderColor: 'var(--TextField-brandBorderColor)',
      //     },
      //     root: {
      //       [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
      //         borderColor: 'var(--TextField-brandBorderHoverColor)',
      //       },
      //       [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
      //         borderColor: 'var(--TextField-brandBorderFocusedColor)',
      //       },
      //     },
      //   },
      // },
      // MuiFilledInput: {
      //   styleOverrides: {
      //     root: {
      //       '&::before, &::after': {
      //         borderBottom: '2px solid var(--TextField-brandBorderColor)',
      //       },
      //       '&:hover:not(.Mui-disabled, .Mui-error):before': {
      //         borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
      //       },
      //       '&.Mui-focused:after': {
      //         borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
      //       },
      //     },
      //   },
      // },
      // MuiInput: {
      //   styleOverrides: {
      //     root: {
      //       '&::before': {
      //         borderBottom: '2px solid var(--TextField-brandBorderColor)',
      //       },
      //       '&:hover:not(.Mui-disabled, .Mui-error):before': {
      //         borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
      //       },
      //       '&.Mui-focused:after': {
      //         borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
      //       },
      //     },
      //   },
      // },
    },
  });
  
function App() {
  const Layout = () => {
    const outerTheme = useTheme();
    
    return (
      <div className="main">
        <ThemeProvider theme={customTheme(outerTheme)}>
          <Navbar />
          <div className="container">
            <div className="menuContainer">
              <Menu />
            </div>
            <div className="contentContainer">
              <QueryClientProvider client={queryClient}>
                <Outlet />
              </QueryClientProvider>
            </div>
          </div>
          <Footer />
        </ThemeProvider>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/users/:id",
          element: <User />,
        },
        {
          path: "/products/:id",
          element: <Product />,
        },
        {
          path: "/students",
          element: <Students />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
