// controllers/propertyController.js
import axios from "axios";

export const getProperties = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.bridgedataoutput.com/api/v2/OData/fmls/Property",
      {
        params: {
          access_token: "3bd54ec671672c9ad62e3ec6d6296b8f",
          $select:
            "ListPrice,BedroomsTotal,BathroomsTotalInteger,BuildingAreaTotal,UnparsedAddress",
        },
      }
    );

    const properties = response.data.value.map((property) => ({
      price: property.ListPrice,
      bed: property.BedroomsTotal,
      bath: property.BathroomsTotalInteger,
      sqft: property.BuildingAreaTotal,
      address: property.UnparsedAddress,
      image: "https://via.placeholder.com/250", // Placeholder image
    }));

    res.json(properties);
    console.log(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("errors");
  }
};
