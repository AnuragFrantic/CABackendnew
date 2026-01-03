const express = require('express');
const { CreateBanner, getAllBanner, updateBanner, deleteBanner } = require('../controller/BannerController');
const upload = require('../middleware/multerconfig');
const { createQuote, getallquote, updateQuote, deleteQuote } = require('../controller/QuoteController');
const { createApart, getAllAparts, getApartById, updateApart, deleteApart } = require('../controller/SetsApart');
const { createExpertise, getAllExpertise, updateExpertise, deleteExpertise } = require('../controller/Expertise');
const { createExpertiseContent, getAllExpertiseContent, getExpertiseContentById, updateExpertiseContent, deleteExpertiseContent, createExpertiseDetail, getAllExpertiseDetail, updateExpertiseDetail, deleteExpertiseDetail, getExpertiseByUrl } = require('../controller/ExpertiseDetailController');
const { CreateTestimonial, getAllTestimonial, updateTestimonial, deleteTestimonial } = require('../controller/TestimonialContent');
const { createInsight, getAllInsights, getInsightById, updateInsight, deleteInsight } = require('../controller/InsightController');
const { PostRegister, getallRegister, putRegister, deleteRegister, getbyUser } = require('../Auth/RegisterController');
const { verifyToken, LoginController, getProfile } = require('../Auth/LoginController');
const { Createblogs, getAllblogs, updateblogs, deleteblogs, getBlogsByurl } = require('../controller/BlogsController');
const { createContact, getAllContacts, getContactById, updateContact, deleteContact } = require('../controller/ContactUsController');
const { createProBono, getAllProBonos, getProBonoById, updateProBono, deleteProBono } = require('../controller/ProBono');
const { createLegalUpdate, getAllLegalUpdate, updateLegalUpdate, deleteLegalUpdate, getLegalUpdateById, getLegalUpdateByUrl } = require('../controller/LegalUpdateController');
const { Createprofile, getAllprofile, updateprofile, deleteprofile } = require('../controller/ProfileController');

const router = express.Router();



router.post('/banner', upload.single("image"), CreateBanner)
router.get('/banner', getAllBanner)
router.put('/banner', upload.single("image"), updateBanner)
router.delete('/banner/:id', deleteBanner);



// upload profile


router.post('/profile', upload.single("image"), Createprofile)
router.get('/profile', getAllprofile)
router.put('/profile', upload.single("image"), updateprofile)
router.delete('/profile/:id', deleteprofile);


//quotes

router.post('/quote', createQuote)
router.get('/quote', getallquote)
router.put('/quote', updateQuote)
router.delete('/quote/:id', deleteQuote);

//expertise

const expertiseUpload = upload.fields([
    { name: 'image', maxCount: 1 },  // Only 1 image allowed
    { name: 'icon', maxCount: 1 }    // Only 1 icon allowed
]);


router.post('/expertise', expertiseUpload, createExpertise);


router.get('/expertise', getAllExpertise);

// Update Expertise by ID with image upload
router.put('/expertise', expertiseUpload, updateExpertise);

// Delete Expertise by ID
router.delete('/expertise/:id', deleteExpertise);

//expertise content 


//legal Update


router.post('/legal-update', expertiseUpload, createLegalUpdate);


router.get('/legal-update', getAllLegalUpdate);

router.get('/legal-update/:url', getLegalUpdateByUrl);




router.put('/legal-update', expertiseUpload, updateLegalUpdate);

// Delete Expertise by ID
router.delete('/legal-update/:id', deleteLegalUpdate);



router.post('/expertise_content', upload.single('image'), createExpertiseDetail);

// Get all ExpertiseContent
router.get('/expertise_content', getAllExpertiseDetail);

// Get ExpertiseContent by ID
router.get('/expertise_content/:url', getExpertiseByUrl);

// Update ExpertiseContent
router.put('/expertise_content', upload.single('image'), updateExpertiseDetail);

// Delete ExpertiseContent
router.delete('/expertise_content/:id', deleteExpertiseDetail);


//setsaprt 

router.post('/apart', upload.single('image'), createApart)
router.get('/apart', getAllAparts)
router.get('/apart/:id', getApartById)
router.put('/apart/:id', upload.single('image'), updateApart)
router.delete('/apart/:id', deleteApart)


//testimonial


router.post('/testimonial', upload.single("image"), CreateTestimonial)
router.get('/testimonial', getAllTestimonial)
router.put('/testimonial/:id', upload.single("image"), updateTestimonial)
router.delete('/testimonial/:id', deleteTestimonial);


//insight

router.post('/insights', createInsight);
router.get('/insights', getAllInsights);
router.get('/insights/:id', getInsightById);
router.put('/insights/:id', updateInsight);
router.delete('/insights/:id', deleteInsight);








router.post('/register', PostRegister);

// Get all registered users (Admin access)
router.get('/users', verifyToken, getallRegister);

// Update User Information (Admin access)
router.put('/users', verifyToken, putRegister);

// Delete User (Admin access)
router.delete('/users', verifyToken, deleteRegister);

// Get User by Type
router.get('/users/type', getbyUser);

// User Login
router.post('/login', LoginController);

// Get User Profile
router.get('/profile', verifyToken, getProfile);




//blogs


router.post('/blogs', upload.single("image"), Createblogs)
router.get('/blogs', getAllblogs)
router.put('/blogs', upload.single("image"), updateblogs)
router.delete('/blogs/:id', deleteblogs);

router.get('/blogs/:url', getBlogsByurl)



//contact 

router.post('/contacts', expertiseUpload, createContact);
router.get('/contacts', getAllContacts);
router.get('/contacts/:id', getContactById);
router.put('/contacts/:id', expertiseUpload, updateContact);
router.delete('/contacts/:id', deleteContact);




router.post('/probono', createProBono);
router.get('/probono', getAllProBonos);
router.get('/probono/:id', getProBonoById);
router.put('/probono/:id', updateProBono);
router.delete('/probono/:id', deleteProBono);

module.exports = router;