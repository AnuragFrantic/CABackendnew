const BannerModal = require("../model/BannerModal")

exports.CreateBanner = async (req, res) => {
    try {
        // Create a new instance of BannerModal using the request body
        let data = new BannerModal(req.body);


        if (req.file) {
            data.image = req.file.path;
        }

        // Save the new banner to the database
        let result = await data.save();

        // Return success response with the created data
        res.status(201).json({ message: "Your Banner Successfully Created", error: 0, data: result });
    } catch (err) {
        // Log the error to the console for debugging
        console.error(err);

        // Return error response
        res.status(500).json({ message: "Your Banner Not Created", error: 1, detail: err.message });
    }
};


exports.getAllBanner = async (req, res) => {
    try {
        const data = await BannerModal.find()
        res.status(200).send({ message: "Banner Data Fetch Successfully", data: data, error: 0 })
    } catch (e) {
        res.status(500).send({ message: "Banner Data not  Fetch Successfully", "message": e.message, error: 1 })
    }
}


exports.updateBanner = async (req, res) => {
    try {
        const { id, ...updatedData } = req.body;


        if (!id) {
            return res.status(400).json({ status: "FAIL", message: "Banner ID is required", error: 1 });
        }

        // Find the banner by ID
        const banner = await BannerModal.findById(id);

        if (!banner) {
            return res.status(404).json({ status: "FAIL", message: "Banner not found", error: 1 });
        }




        if (req.file) {
            updatedData.image = req.file.path;  // Assuming image is uploaded and path is provided
        }

        // Update the banner with new data
        const updatedBanner = await BannerModal.findByIdAndUpdate(id, updatedData, { new: true });

        res.status(200).json({ status: "OK", data: updatedBanner, error: 0 });
    } catch (e) {
        res.status(500).json({ status: "FAIL", message: "Error updating banner", error: 1, detail: e.message });
    }
};



exports.deleteBanner = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ status: "FAIL", message: "Banner ID is required", error: 1 });
        }

        // Find and delete the banner by ID
        const deletedBanner = await BannerModal.findByIdAndDelete(id);

        if (!deletedBanner) {
            return res.status(404).json({ status: "FAIL", message: "Banner not found", error: 1 });
        }

        res.status(200).json({ status: "OK", message: "Banner deleted successfully", data: deletedBanner, error: 0 });
    } catch (e) {
        res.status(500).json({ status: "FAIL", message: "Error deleting banner", error: 1, detail: e.message });
    }
};
