import axios from "axios";

export const getProperties = async (req, res) => {
  try {
    const { $select, ...restParams } = req.query;

    const response = await axios.get(
      "https://api.bridgedataoutput.com/api/v2/OData/fmls/Property",
      {
        params: {
          access_token: process.env.ACES_TKEN,
          $select:
            $select ||
            "ListPrice,BedroomsTotal,BathroomsTotalInteger,BuildingAreaTotal,UnparsedAddress",
          ...restParams, // Pass all other query parameters from the frontend
        },
      }
    );

    const filteredProperties = response.data.value.filter(
      (property) =>
        property.ListPrice &&
        property.BedroomsTotal &&
        property.BathroomsTotalInteger &&
        property.BuildingAreaTotal &&
        property.Media
    );

    const properties = filteredProperties.map((property) => ({
      price: property.ListPrice,
      bed: property.BedroomsTotal,
      bath: property.BathroomsTotalInteger,
      sqft: property.BuildingAreaTotal,
      address: property.UnparsedAddress,
      image:
        property.Media && property.Media.length > 0
          ? property.Media[0].MediaURL
          : "https://via.placeholder.com/250", // Placeholder image
      images: property.Media && property.Media.length > 0 ? property.Media : [],
    }));

    res.json(properties);
    console.log(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error:", error.message);
  }
};
