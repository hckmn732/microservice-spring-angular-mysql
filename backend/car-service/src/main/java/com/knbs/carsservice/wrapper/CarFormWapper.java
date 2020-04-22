package com.knbs.carsservice.wrapper;

import org.springframework.web.multipart.MultipartFile;

public class CarFormWapper {
    private MultipartFile image;
    private String brand;
    private String model;
    private String color;
    private String plateNumber;
    private String price;
	private String description;

    public CarFormWapper(MultipartFile image, String brand, String model, String color, String plateNumber,
		String price,String description) {
		super();
		this.image = image;
		this.brand = brand;
		this.model = model;
		this.color = color;
		this.plateNumber = plateNumber;
		this.price = price;
		this.description = description;
	}
	
    public MultipartFile getImage() {
		return image;
	}
	
	public void setImage(MultipartFile image) {
		this.image = image;
	}
	
	public String getDescription() {
		return this.description;
	}
	public void setDescription(String desc) {
		this.description = desc;
	}

	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public String getPlateNumber() {
		return plateNumber;
	}
	public void setPlateNumber(String plateNumber) {
		this.plateNumber = plateNumber;
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
}