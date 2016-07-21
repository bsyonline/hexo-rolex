---
title: JAXB：对象和xml转换
toc: true
date: 2016-07-16 15:49:59
tags:
categories:
---


###1. 使用@XmlRootElement和@XmlElement标示根节点对象和属性节点对象

	@XmlRootElement(name = "DATA")
	public class Data {

	    List<DataItem> dataItems;

	    public Data() {
	    }

	    @XmlElement(name = "ITEM")
	    public List<DataItem> getDataItems() {
	        return dataItems;
	    }

	    public void setDataItems(List<DataItem> dataItems) {
	        this.dataItems = dataItems;
	    }
	}

###2. xml2obj

	public static Data fromXml(String xml){
	    Data data = null;
	    try {
	        JAXBContext context = JAXBContext.newInstance(Data.class);
	        Unmarshaller unmarshaller = context.createUnmarshaller();
	        data = (Data) unmarshaller.unmarshal(new StringReader(xml));
	    } catch (JAXBException e) {
	        e.printStackTrace();
	    }
	    return data;
	}

###3. obj2xml

	public static void toXml(String path) {
	    try {
	        JAXBContext context = JAXBContext.newInstance(Data.class);
	        Marshaller marshaller = context.createMarshaller();
	        marshaller.marshal(fromXml(xml), new File(path));
	    } catch (JAXBException e) {
	        e.printStackTrace();
	    }
	}

###4. 设置xml节点的顺序

	@XmlType(propOrder = {"orderList", "basic", "shareholder", "person"})
	public class DataItem {

	    OrderList orderList;
	    Basic basic;
	    Shareholder shareholder;
	    Person person;

	     //getter and setter
	}
