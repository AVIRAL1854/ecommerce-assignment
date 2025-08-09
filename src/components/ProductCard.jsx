import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

const ProductCard = ({ product, addProduct }) => {
  const { id, title, image, price, description, category, rating } = product;

  // Simulate stock based on rating count (low count = out of stock)
  const inStock = rating.count > 150;

  // Generate variants based on category
  const getVariants = (category) => {
    switch (category) {
      case "men's clothing":
      case "women's clothing":
        return ["Small", "Medium", "Large", "Extra Large"];
      case "jewelery":
        return ["Gold", "Silver", "Rose Gold"];
      case "electronics":
        return ["Standard", "Premium"];
      default:
        return ["Default"];
    }
  };

  const variants = getVariants(category);

  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [showVariants, setShowVariants] = useState(false);

  const handleAddToCart = () => {
    if (!inStock) return;
    toast.success(`${title} (${selectedVariant}) added to cart!`);
    addProduct({ ...product, variant: selectedVariant });
  };

  // const handleVariantSelect = (variant) => {
  //   setSelectedVariant(variant);
  //   setShowVariants(false);
  // };

  return (
    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 ">
      <div
        className={`card h-100 border-0 position-relative overflow-hidden cursor-pointer${
          !inStock ? "opacity-75" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          borderRadius: "12px",
          backgroundColor: "#ffffff",
          transform: isHovered ? "translateY(-8px)" : "translateY(0)",
          boxShadow: isHovered
            ? "0 20px 40px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.08)"
            : "0 2px 8px rgba(0,0,0,0.06)",
          transition: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Stock Status Badge */}
        {!inStock && (
          <div className="position-absolute top-3 start-3 z-3">
            <span
              className="badge bg-dark text-white px-3 py-1 fw-medium"
              style={{ borderRadius: "20px" }}
            >
              Out of Stock
            </span>
          </div>
        )}

        {/* Rating Badge */}
        {inStock && (
          <div className="position-absolute top-3 end-3 z-3">
            <span
              className="badge bg-white text-dark px-2 py-1 small fw-medium shadow-sm"
              style={{ borderRadius: "20px" }}
            >
              ⭐ {rating.rate}
            </span>
          </div>
        )}

        {/* Product Image Container */}
        <div
          className="position-relative overflow-hidden"
          style={{
            height: "240px",
            borderRadius: "12px 12px 0 0",
            backgroundColor: "#f8f9fa",
          }}
        >
          <img
            className="w-100 h-100 p-4 object-fit-contain"
            src={image}
            alt={title}
            style={{
              transform: isHovered && inStock ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
              filter: !inStock ? "grayscale(100%)" : "none",
            }}
          />
        </div>

        {/* Product Information */}
        <div className="card-body p-4">
          {/* Product Title */}
          <h5
            className="card-title mb-2 fw-bold text-dark lh-sm"
            style={{
              fontSize: "1.1rem",
              minHeight: "2.6rem",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
            title={title}
          >
            {title}
          </h5>

          {/* Product Description */}
          <p
            className="text-muted mb-3 small lh-sm"
            style={{
              minHeight: "3rem",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description}
          </p>

          {/* Price Display */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <span className="h5 text-dark mb-0 fw-bold">
                ${price.toFixed(2)}
              </span>
            </div>
            {inStock && (
              <span className="badge bg-light text-dark border px-2 py-1 small">
                In Stock ({rating.count})
              </span>
            )}
          </div>

          {/* Variant Selection */}
          {variants.length > 1 && (
            <div className="mb-3">
              <label className="form-label small text-secondary mb-1 fw-medium">
                {category === "men's clothing" ||
                category === "women's clothing"
                  ? "Size:"
                  : category === "jewelery"
                  ? "Color:"
                  : "Version:"}
              </label>
              <div className="position-relative">
                <select
                  className={`form-select form-select-sm ${
                    !inStock ? "disabled" : ""
                  }`}
                  value={selectedVariant}
                  onChange={(e) => setSelectedVariant(e.target.value)}
                  disabled={!inStock}
                  style={{
                    borderRadius: "4px",
                    borderColor: "#6c757d",
                    backgroundColor: "white",
                  }}
                >
                  {variants.map((variant) => (
                    <option key={variant} value={variant}>
                      {variant}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="card-footer bg-transparent border-0 p-3 pt-0">
          <div className="d-grid gap-2">
            {inStock ? (
              <>
                <button
                  className="btn btn-dark fw-medium py-2"
                  onClick={handleAddToCart}
                  style={{ borderRadius: "4px" }}
                >
                  Add to Cart
                </button>
                <Link
                  to={`/product/${id}`}
                  className="btn btn-outline-dark btn-sm text-decoration-none"
                  style={{ borderRadius: "4px" }}
                >
                  View Details
                </Link>
              </>
            ) : (
              <>
                <button
                  className="btn btn-secondary fw-medium py-2"
                  disabled
                  style={{ borderRadius: "4px" }}
                >
                  Out of Stock
                </button>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  style={{ borderRadius: "4px" }}
                  onClick={() =>
                    toast.info(
                      "We'll notify you when this item is back in stock!"
                    )
                  }
                >
                  Notify When Available
                </button>
              </>
            )}
          </div>
        </div>

        {/* Click outside to close variants dropdown */}
        {showVariants && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 z-2"
            onClick={() => setShowVariants(false)}
            style={{ background: "transparent" }}
          />
        )}
      </div>
    </div>
  );
};

export default ProductCard;
