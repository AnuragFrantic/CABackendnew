const Contact = require('../model/ContactUs');




// Create a new contact
exports.createContact = async (req, res) => {
    try {
        const newContact = new Contact(req.body);

        // Handle image and icon file uploads if present
        if (req.files) {
            if (req.files['image']) {
                newContact.image = req.files['image'][0].path;  // Store image path
            }
            if (req.files['icon']) {
                newContact.icon = req.files['icon'][0].path;    // Store icon path
            }
        }

        const savedContact = await newContact.save();
        res.status(201).json({
            success: true,
            message: 'Contact created successfully',
            data: savedContact
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to create contact',
            error: error.message
        });
    }
};

// Get all contacts
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json({
            success: true,
            data: contacts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve contacts',
            error: error.message
        });
    }
};

// Get a single contact by ID
exports.getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }
        res.status(200).json({
            success: true,
            data: contact
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve contact',
            error: error.message
        });
    }
};

// Update a contact by ID
exports.updateContact = async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        // Handle image and icon file uploads if present
        if (req.files) {
            if (req.files['image']) {
                updatedContact.image = req.files['image'][0].path;  // Store image path
            }
            if (req.files['icon']) {
                updatedContact.icon = req.files['icon'][0].path;    // Store icon path
            }
        }

        if (!updatedContact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Contact updated successfully',
            data: updatedContact
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to update contact',
            error: error.message
        });
    }
};

// Delete a contact by ID
exports.deleteContact = async (req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        if (!deletedContact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Contact deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete contact',
            error: error.message
        });
    }
};
