import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import TableData from "./pages/TableData";
import { ThemeProvider } from "./ThemeContext";
import Layout from "./components/Layout";
import routes from "./routes";
import ScrollToTop from "./components/ScrollToTop";

function App() {
	return (
		<ThemeProvider>
			<Router>
				<ScrollToTop />
				<Layout>
					<Routes>
						<Route path={routes.dashoard} element={<Home />} />
						<Route path={routes.setting} element={<Settings />} />
						<Route path={routes.Datatable} element={<TableData />} />
					</Routes>
				</Layout>
			</Router>
		</ThemeProvider>
	);
}

export default App;
