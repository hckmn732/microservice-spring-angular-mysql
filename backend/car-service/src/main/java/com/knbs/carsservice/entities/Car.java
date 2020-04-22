package com.knbs.carsservice.entities;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Car {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id ;
	private String brand;
    private String model;
    private String color;
    private String plateNumber;
    private double price;
    private String picture;
	private String description;

	public String getDescription() {
		return this.description;
	}
	public void setDescription(String desc) {
		this.description = desc;
	}


    public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
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
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public String getPicture() {
		return this.picture;
	}
	public void setPicture(String picture) {
		this.picture = picture;
	}
	
	public Car(Long id, String brand, String model, String color, String plateNumber, double price,
			String picture , String description) {
		super();
		this.id = id;
		this.brand = brand;
		this.model = model;
		this.color = color;
		this.plateNumber = plateNumber;
		this.price = price;
		this.picture = picture;
		this.description = description;
	}
	
	public Car() {
		
	}

	public Car(Long id) {
		
	}
}