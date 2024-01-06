import Card from "./components/Card";
import { productList } from "./data";

// interface IProps {}

const App = () => {
  const renderProductList = productList.map((product) => (
    <Card key={product.id} product={product} />
  ));
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
        {renderProductList}
      </div>
    </div>
  );
};
export default App;
