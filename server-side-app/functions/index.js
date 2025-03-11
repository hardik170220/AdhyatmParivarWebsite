const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { getFirestore } = require('firebase-admin/firestore');
const { initializeApp } = require('firebase-admin/app');

const cors = require('cors')({ origin: true });

initializeApp();

exports.form1 = onRequest(async (req, res) => {
    cors(req, res, async () => {
        logger.info("Hello form1!", { structuredData: true });

        try {
            const data = req.body;
            const {नाम} = req.body;
            const {['मोबाइल नंबर']:mobile} = req.body

            await getFirestore().collection("updhan-2024").doc(`${नाम}${mobile}`).set({
                ...data,
                timestamp: Date.now()
            });

            return res.status(200).json({
                message: "form submitted successfully!",
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "An error occurred while processing your request.",
                error: error.message 
            });
        }
    });
});

exports.form2 = onRequest(async (req, res) => {
    cors(req, res, async () => {
        logger.info("Hello form1!", { structuredData: true });

        try {
            const data = req.body;
            const {नाम} = req.body;
            const {['मोबाइल नंबर']:mobile} = req.body

            await getFirestore().collection('vachana-2024').doc(`${नाम}${mobile}`).set({
                ...data,
                timestamp: Date.now()
            });

            return res.status(200).json({
                message: "form2 submitted successfully!",
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "An error occurred while processing your request.",
                error: error.message 
            });
        }
    });
});

exports.mahabharatForm = onRequest(async (req, res) => {
    cors(req, res, async () => {
        logger.info("Hello mahabharatForm!", { structuredData: true });

        try {
            const data = req.body;
            const { नाम } = req.body;
            const { ['मोबाइल नंबर']: mobile } = req.body;

            // Check if a document with the same mobile number already exists
            const existingDoc = await getFirestore()
                .collection('mahabharat-bookorder')
                .doc(`${mobile}`)
                .get();

            if (existingDoc.exists) {
                return res.status(400).json({
                    message: "you have already register for your Order.",
                });
            }

            // If no existing document, save the new record
            await getFirestore().collection('mahabharat-bookorder').doc(`${mobile}`).set({
                ...data,
                timestamp: Date.now()
            });

            return res.status(200).json({
                message: "mahabharatForm submitted successfully!",
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "An error occurred while processing your request.",
                error: error.message 
            });
        }
    });
});


exports.getAllMahabharatBookOrderData = onRequest(async (req, res) => {
  cors(req, res, async () => {
    const firestore = getFirestore();

    try {
      const totalRecordsSnapshot = await firestore.collection("mahabharat-bookorder").get();
      const totalRecords = totalRecordsSnapshot.size;
      const allRecords = totalRecordsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      return res.status(200).json({
        message: "Fetched total registered count and all records successfully!",
        totalRecords,
        allRecords
      });
    } catch (error) {
      console.error("Error fetching total registered count: ", error);
      return res.status(500).json({
        message: "An error occurred while fetching the total registered count.",
        error: error.message,
      });
    }
  });
});




exports.selfDetails = onRequest(async (req, res) => {
    cors(req, res, async () => {
        logger.info("Hello selfDetails!", { structuredData: true });

        try {
            const data = req.body;
            const {['संपर्क नंबर']:mobile} = req.body

            await getFirestore().collection('self-details').doc(`${mobile}`).set({
                ...data,
                timestamp: Date.now()
            });

            return res.status(200).json({
                message: "selfDetails submitted successfully!",
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "An error occurred while processing your request.",
                error: error.message 
            });
        }
    });
});

