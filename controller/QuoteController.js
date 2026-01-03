const { find } = require("../model/BannerModal")
const quotemodal = require("../model/quotemodal")



exports.createQuote = async (req, res) => {
    const data = quotemodal(req.body)
    try {
        const result = await data.save()
        res.status(201).json({ message: "Your Quotes  has been created", error: 0 })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Error in creating Quote", error: 1 })
    }
}

exports.getallquote = async (req, res) => {
    try {
        const data = await quotemodal.find()
        res.status(201).json({ message: "Your Quotes has been Fetched", error: 0, data })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Error in fetching Quote", error: 1 })
    }
}



exports.updateQuote = async (req, res) => {
    const { id, ...updatedData } = req.body;

    if (!id) {
        return res.status(400).json({ message: "Quote ID is required", error: 1 });
    }

    try {
        const result = await quotemodal.findByIdAndUpdate(id, updatedData, { new: true });

        if (!result) {
            return res.status(404).json({ message: "Quote not found", error: 1 });
        }

        res.status(200).json({ message: "Quote has been updated", error: 0, data: result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error in updating Quote", error: 1 });
    }
};

exports.deleteQuote = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Quote ID is required", error: 1 });
        }

        // Find and delete the quote by ID
        const deletedQuote = await quotemodal.findByIdAndDelete(id);

        if (!deletedQuote) {
            return res.status(404).json({ message: "Quote not found", error: 1 });
        }

        res.status(200).json({ message: "Quote has been deleted", error: 0, data: deletedQuote });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error in deleting Quote", error: 1 });
    }
};


