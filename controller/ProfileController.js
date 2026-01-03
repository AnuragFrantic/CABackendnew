const ProfileModal = require("../model/Profile")

exports.Createprofile = async (req, res) => {
    try {
        // Create a new instance of ProfileModal using the request body
        let data = new ProfileModal(req.body);


        if (req.file) {
            data.image = req.file.path;
        }

        // Save the new profile to the database
        let result = await data.save();

        // Return success response with the created data
        res.status(201).json({ message: "Your profile Successfully Created", error: 0, data: result });
    } catch (err) {
        // Log the error to the console for debugging
        console.error(err);

        // Return error response
        res.status(500).json({ message: "Your profile Not Created", error: 1, detail: err.message });
    }
};


exports.getAllprofile = async (req, res) => {
    try {
        const data = await ProfileModal.find()
        res.status(200).send({ message: "profile Data Fetch Successfully", data: data, error: 0 })
    } catch (e) {
        res.status(500).send({ message: "profile Data not  Fetch Successfully", "message": e.message, error: 1 })
    }
}


exports.updateprofile = async (req, res) => {
    try {
        const { id, ...updatedData } = req.body;


        if (!id) {
            return res.status(400).json({ status: "FAIL", message: "profile ID is required", error: 1 });
        }

        // Find the profile by ID
        const profile = await ProfileModal.findById(id);

        if (!profile) {
            return res.status(404).json({ status: "FAIL", message: "profile not found", error: 1 });
        }




        if (req.file) {
            updatedData.image = req.file.path;  // Assuming image is uploaded and path is provided
        }

        // Update the profile with new data
        const updatedprofile = await ProfileModal.findByIdAndUpdate(id, updatedData, { new: true });

        res.status(200).json({ status: "OK", data: updatedprofile, error: 0 });
    } catch (e) {
        res.status(500).json({ status: "FAIL", message: "Error updating profile", error: 1, detail: e.message });
    }
};



exports.deleteprofile = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ status: "FAIL", message: "profile ID is required", error: 1 });
        }

        // Find and delete the profile by ID
        const deletedprofile = await ProfileModal.findByIdAndDelete(id);

        if (!deletedprofile) {
            return res.status(404).json({ status: "FAIL", message: "profile not found", error: 1 });
        }

        res.status(200).json({ status: "OK", message: "profile deleted successfully", data: deletedprofile, error: 0 });
    } catch (e) {
        res.status(500).json({ status: "FAIL", message: "Error deleting profile", error: 1, detail: e.message });
    }
};
