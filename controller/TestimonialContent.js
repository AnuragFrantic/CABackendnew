const TestimonialModal = require("../model/Testimonial")

exports.CreateTestimonial = async (req, res) => {
    try {
        // Create a new instance of TestimonialModal using the request body
        let data = new TestimonialModal(req.body);


        if (req.file) {
            data.image = req.file.path;
        }

        // Save the new Testimonial to the database
        let result = await data.save();

        // Return success response with the created data
        res.status(201).json({ message: "Your Testimonial Successfully Created", error: 0, data: result });
    } catch (err) {
        // Log the error to the console for debugging
        console.error(err);

        // Return error response
        res.status(500).json({ message: "Your Testimonial Not Created", error: 1, detail: err.message });
    }
};


exports.getAllTestimonial = async (req, res) => {
    try {
        const data = await TestimonialModal.find()
        res.status(200).send({ message: "Testimonial Data Fetch Successfully", data: data, error: 0 })
    } catch (e) {
        res.status(500).send({ message: "Testimonial Data not  Fetch Successfully", "message": e.message, error: 1 })
    }
}


exports.updateTestimonial = async (req, res) => {
    try {
        const { id } = req.params;  // Get the ID from the URL parameters
        const updatedData = req.body;  // Get the updated data from the request body

        if (!id) {
            return res.status(400).json({ status: "FAIL", message: "Testimonial ID is required", error: 1 });
        }

        // Find the Testimonial by ID
        const testimonial = await TestimonialModal.findById(id);

        if (!testimonial) {
            return res.status(404).json({ status: "FAIL", message: "Testimonial not found", error: 1 });
        }

        // If an image is uploaded, update the image path
        if (req.file) {
            updatedData.image = req.file.path;  // Assuming image is uploaded and path is provided
        }

        // Update the Testimonial with new data
        const updatedTestimonial = await TestimonialModal.findByIdAndUpdate(id, updatedData, { new: true });

        return res.status(200).json({ status: "OK", data: updatedTestimonial, error: 0 });
    } catch (e) {
        return res.status(500).json({ status: "FAIL", message: "Error updating Testimonial", error: 1, detail: e.message });
    }
};




exports.deleteTestimonial = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ status: "FAIL", message: "Testimonial ID is required", error: 1 });
        }

        // Find and delete the Testimonial by ID
        const deletedTestimonial = await TestimonialModal.findByIdAndDelete(id);

        if (!deletedTestimonial) {
            return res.status(404).json({ status: "FAIL", message: "Testimonial not found", error: 1 });
        }

        res.status(200).json({ status: "OK", message: "Testimonial deleted successfully", data: deletedTestimonial, error: 0 });
    } catch (e) {
        res.status(500).json({ status: "FAIL", message: "Error deleting Testimonial", error: 1, detail: e.message });
    }
};
