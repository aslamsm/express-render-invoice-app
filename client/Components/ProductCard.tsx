import "./ProductCard.css";
type Product = {
  name: string;
  detailsPage: string;
  description: string;
  price: number;
  image: string;
};

let product: Product = {
  name: "iPhone 15 Pro",
  detailsPage:
    "https://www.apple.com/newsroom/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/",
  description:
    "Apple today debuted iPhone 15 Pro and iPhone 15 Pro Max, designed with aerospace-grade titanium that’s strong yet lightweight to deliver Apple’s lightest Pro models ever. The new design also features contoured edges and a customizable Action button, allowing users to personalize their iPhone experience. Powerful camera upgrades enable the equivalent of seven pro lenses with incredible image quality, including a more advanced 48MP Main camera system.",
  price: 999.99,
  image:
    "https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/article/Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.large_2x.jpg",
};

function ProductCard() {
  return (
    <div className="card">
      <img src={product.image} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h4 className="card-title text-warning">{product.name}</h4>
        <h5 className="card-subtitle text-secondary small mb-2">
          Price: ${product.price}
        </h5>
        <p className="card-text">{product.description}</p>
        <a
          href={product.detailsPage}
          className="btn btn-primary w-100"
          target="_blank"
        >
          View Details
        </a>
      </div>
    </div>
  );
}
export default ProductCard;
