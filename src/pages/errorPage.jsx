import Error from "../components/features/error/Error";
import Layout from "../layout/layout";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
function ErrorPage() {
  return (
    <Layout>
      <Header />
      <Error />
      <Footer />
    </Layout>
  );
}

export default ErrorPage;
