package com.klef.fsd.springboot.model;

import jakarta.persistence.*;

@Entity
@Table(name = "product_table")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String category;

    private Double price;       // Original Price
    private Double offerPrice;  // ✅ New discounted price

    private Integer stockQuantity;

    @Lob
    private String description; // Or use @ElementCollection for multiple points

    private String imageUrl; // ✅ Single image (or use List<String> if needed)

    // ✅ Link product to a seller (User)
    @ManyToOne
    @JoinColumn(name = "seller_id", nullable = false)
    private User seller;

    // ----- Constructors -----
    public Product() {}

    public Product(String name, String category, Double price, Double offerPrice,
                   Integer stockQuantity, String description, String imageUrl, User seller) {
        this.name = name;
        this.category = category;
        this.price = price;
        this.offerPrice = offerPrice;
        this.stockQuantity = stockQuantity;
        this.description = description;
        this.imageUrl = imageUrl;
        this.seller = seller;
    }

    // ----- Getters & Setters -----
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Double getOfferPrice() { return offerPrice; }
    public void setOfferPrice(Double offerPrice) { this.offerPrice = offerPrice; }

    public Integer getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public User getSeller() { return seller; }
    public void setSeller(User seller) { this.seller = seller; }
}
