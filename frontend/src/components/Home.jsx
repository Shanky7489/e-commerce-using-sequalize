import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const Home = () => {
  const { products, loading, error } = useContext(AuthContext);
  console.log("str", products);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  // Initial product data
  // const [products, setProducts] = useState([
  //   {
  //     id: 1,
  //     name: "Product 1",
  //     price: 100,
  //     description: "This is a description for Product 1",
  //     image: "https://via.placeholder.com/150",
  //   },
  //   {
  //     id: 2,
  //     name: "Product 2",
  //     price: 150,
  //     description: "This is a description for Product 2",
  //     image: "https://via.placeholder.com/150",
  //   },
  //   {
  //     id: 3,
  //     name: "Product 3",
  //     price: 200,
  //     description: "This is a description for Product 3",
  //     image: "https://via.placeholder.com/150",
  //   },
  //   {
  //     id: 1,
  //     name: "Product 1",
  //     price: 100,
  //     description: "This is a description for Product 1",
  //     image: "https://via.placeholder.com/150",
  //   },
  //   {
  //     id: 2,
  //     name: "Product 2",
  //     price: 150,
  //     description: "This is a description for Product 2",
  //     image: "https://via.placeholder.com/150",
  //   },
  //   {
  //     id: 3,
  //     name: "Product 3",
  //     price: 200,
  //     description: "This is a description for Product 3",
  //     image: "https://via.placeholder.com/150",
  //   },
  //   {
  //     id: 1,
  //     name: "Product 1",
  //     price: 100,
  //     description: "This is a description for Product 1",
  //     image: "https://via.placeholder.com/150",
  //   },
  //   {
  //     id: 2,
  //     name: "Product 2",
  //     price: 150,
  //     description: "This is a description for Product 2",
  //     image: "https://via.placeholder.com/150",
  //   },
  //   {
  //     id: 3,
  //     name: "Product 3",
  //     price: 200,
  //     description: "This is a description for Product 3",
  //     image: "https://via.placeholder.com/150",
  //   },
  // ]);

  // Handle Add to Cart
  const handleAddToCart = (id) => {
    alert(`Product ${id} added to cart`);
  };

  // Handle Update Product Quantity
  // const handleUpdate = (id, newDescription) => {
  //   setProducts((prevProducts) =>
  //     prevProducts.map((product) =>
  //       product.id === id
  //         ? { ...product, description: newDescription }
  //         : product
  //     )
  //   );
  // };

  return (
    <div className="w-full">
      <div className="container mx-auto p-4 w-[90%] m-auto">
        <h1 className="text-2xl font-bold mb-4">Product List</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="p-4 border rounded shadow hover:shadow-lg"
            >
              <img
                src={`http://localhost:4000${product.imageUrl}`}
                // src={product.imageUrl}
                alt={"productIMG"}
                className="w-full h-40 object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-700">Price: ${product.price}</p>
              <p className="text-gray-700">
                Description: {product.description}
              </p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => {
                    // const newDescription = prompt(
                    //   `Update description for ${product.name}`,
                    //   product.description
                    // );
                    // if (newDescription) {
                    //   handleUpdate(product.id, newDescription);
                    // }
                  }}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
