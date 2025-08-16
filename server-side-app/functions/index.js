const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { getFirestore } = require("firebase-admin/firestore");
const { initializeApp } = require("firebase-admin/app");
const { Resend } = require("resend");

const cors = require("cors")({ origin: true });

initializeApp();

exports.form1 = onRequest(async (req, res) => {
  cors(req, res, async () => {
    logger.info("Hello form1!", { structuredData: true });

    try {
      const data = req.body;
      const { नाम } = req.body;
      const { ["मोबाइल नंबर"]: mobile } = req.body;

      await getFirestore()
        .collection("updhan-2024")
        .doc(`${नाम}${mobile}`)
        .set({
          ...data,
          timestamp: Date.now(),
        });

      return res.status(200).json({
        message: "form submitted successfully!",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "An error occurred while processing your request.",
        error: error.message,
      });
    }
  });
});

//-------------------------------------Membershipform----------------------------------------

exports.membershipForm = onRequest(async (req, res) => {
  cors(req, res, async () => {
    logger.info("Processing membership form submission", {
      structuredData: true,
    });

    try {
      const data = req.body;
      const { personal, service, dikshit } = data;

      // Validate required data
      if (!personal) {
        return res.status(400).json({
          success: false,
          message: "Missing required personal information",
        });
      }

      const db = getFirestore();
      const batch = db.batch();

      const personalInfo = personal.personalInfo || {};
      const name = personalInfo.firstName || "UnknownName";
      const mobile = personalInfo.phone1 || "UnknownMobile";
      const city = personalInfo.city || "";

      const userId = db.collection("users").doc().id;

      const userDocRef = db.collection("users").doc(userId);
      const mainUserData = {
        personal: personal,
        service: service || {},
        dikshit: {
          IsDikshaInFamily: dikshit?.IsDikshaInFamily || false,
          dikshitCount: dikshit?.dikshitCount || 0,
        },
        // Legacy fields for backward compatibility
        legacyDocId: `${name}${mobile}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        timestamp: Date.now(),
      };

      batch.set(userDocRef, mainUserData);

      const legacyDocRef = db
        .collection("ap-membershipform")
        .doc(`${name}${mobile}`);
      const legacyData = {
        ...data,
        userId: userId,
        timestamp: Date.now(),
      };

      batch.set(legacyDocRef, legacyData);

      let dikshitFamilyMembersCount = 0;

      if (
        dikshit?.IsDikshaInFamily &&
        dikshit.dikshitDetail &&
        Array.isArray(dikshit.dikshitDetail) &&
        dikshit.dikshitDetail.length > 0
      ) {
        dikshit.dikshitDetail.forEach((dikshitMember, index) => {
          const dikshitDetailId = `${name}${mobile}_${dikshitMember.dikshitdetailID || index + 1}`;
          const dikshitDocRef = db
            .collection("dikshitDetails")
            .doc(dikshitDetailId);

          const dikshitMemberData = {
            userId: userId,
            // registeredUserName: name,
            // registeredUserPhone: mobile,
            // registeredUserCity: city,

            dikshitdetailID: dikshitMember.dikshitdetailID || index + 1,
            dikshitName: dikshitMember.dikshitName || "",
            sansariName: dikshitMember.sansariName || "",
            gurusName: dikshitMember.gurusName || "",
            sansariRelation: dikshitMember.sansariRelation || "",
            samudayName: dikshitMember.samudayName || "",
            sadhuOrSadhvi: dikshitMember.sadhuOrSadhvi || "",

            createdAt: new Date(),
            updatedAt: new Date(),
          };

          batch.set(dikshitDocRef, dikshitMemberData);
          dikshitFamilyMembersCount++;
        });
      }

      await batch.commit();

      logger.info(`Successfully processed membership form for user: ${name}`, {
        userId: userId,
        dikshitFamilyMembersCount: dikshitFamilyMembersCount,
      });

      return res.status(200).json({
        success: true,
        message: "Membership form submitted successfully!",
        userId: userId,
        dikshitFamilyMembersCount: dikshitFamilyMembersCount,
        legacyDocId: `${name}${mobile}`,
      });
    } catch (error) {
      logger.error("Error processing membership form:", error);

      return res.status(500).json({
        success: false,
        message: "An error occurred while processing your membership form.",
        error: error.message,
      });
    }
  });
});

//-------------------------------------Membershipform----------------------------------------

exports.form2 = onRequest(async (req, res) => {
  cors(req, res, async () => {
    logger.info("Hello form1!", { structuredData: true });

    try {
      const data = req.body;
      const { नाम } = req.body;
      const { ["मोबाइल नंबर"]: mobile } = req.body;

      await getFirestore()
        .collection("vachana-2024")
        .doc(`${नाम}${mobile}`)
        .set({
          ...data,
          timestamp: Date.now(),
        });

      return res.status(200).json({
        message: "form2 submitted successfully!",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "An error occurred while processing your request.",
        error: error.message,
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
      const { ["मोबाइल नंबर"]: mobile } = req.body;

      // Check if a document with the same mobile number already exists
      const existingDoc = await getFirestore()
        .collection("mahabharat-bookorder")
        .doc(`${mobile}`)
        .get();

      if (existingDoc.exists) {
        return res.status(400).json({
          message: "you have already register for your Order.",
        });
      }

      // If no existing document, save the new record
      await getFirestore()
        .collection("mahabharat-bookorder")
        .doc(`${mobile}`)
        .set({
          ...data,
          timestamp: Date.now(),
        });

      return res.status(200).json({
        message: "mahabharatForm submitted successfully!",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "An error occurred while processing your request.",
        error: error.message,
      });
    }
  });
});

exports.udayanmantriForm = onRequest(async (req, res) => {
  cors(req, res, async () => {
    logger.info("Hello udayanmantriForm!", { structuredData: true });

    try {
      const data = req.body;
      const { नाम } = req.body;
      const { ["मोबाइल नंबर"]: mobile } = req.body;

      // Check if a document with the same mobile number already exists
      const existingDoc = await getFirestore()
        .collection("udayanmantri-bookorder")
        .doc(`${mobile}`)
        .get();

      if (existingDoc.exists) {
        return res.status(400).json({
          message: "you have already register for your Order.",
        });
      }

      // If no existing document, save the new record
      await getFirestore()
        .collection("udayanmantri-bookorder")
        .doc(`${mobile}`)
        .set({
          ...data,
          timestamp: Date.now(),
        });

      return res.status(200).json({
        message: "udayanmantriForm submitted successfully!",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "An error occurred while processing your request.",
        error: error.message,
      });
    }
  });
});

exports.ravanniBhitarmaForm = onRequest(async (req, res) => {
  cors(req, res, async () => {
    logger.info("Hello ravannibhitarma!", { structuredData: true });

    try {
      const data = req.body;
      const { नाम } = req.body;
      const { ["मोबाइल नंबर"]: mobile } = req.body;

      // Check if a document with the same mobile number already exists
      const existingDoc = await getFirestore()
        .collection("ravannibhitarma-bookorder")
        .doc(`${mobile}`)
        .get();

      if (existingDoc.exists) {
        return res.status(400).json({
          message: "you have already register for your Order.",
        });
      }

      // If no existing document, save the new record
      await getFirestore()
        .collection("ravannibhitarma-bookorder")
        .doc(`${mobile}`)
        .set({
          ...data,
          timestamp: Date.now(),
        });

      return res.status(200).json({
        message: "ravanniBhitarmaForm submitted successfully!",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "An error occurred while processing your request.",
        error: error.message,
      });
    }
  });
});

exports.bhagwanMahavirForm = onRequest(async (req, res) => {
  cors(req, res, async () => {
    logger.info("Hello bhagwanMahavirForm!", { structuredData: true });

    try {
      const data = req.body;
      const { नाम } = req.body;
      const { ["मोबाइल नंबर"]: mobile } = req.body;

      // Check if a document with the same mobile number already exists
      const existingDoc = await getFirestore()
        .collection("bhagwanmahavir-bookorder")
        .doc(`${mobile}`)
        .get();

      if (existingDoc.exists) {
        return res.status(400).json({
          message: "you have already register for your Order.",
        });
      }

      // If no existing document, save the new record
      await getFirestore()
        .collection("bhagwanmahavir-bookorder")
        .doc(`${mobile}`)
        .set({
          ...data,
          timestamp: Date.now(),
        });

      return res.status(200).json({
        message: "bhagwanmahavirForm submitted successfully!",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "An error occurred while processing your request.",
        error: error.message,
      });
    }
  });
});

exports.getAllMahabharatBookOrderData = onRequest(async (req, res) => {
  cors(req, res, async () => {
    const firestore = getFirestore();

    try {
      const totalRecordsSnapshot = await firestore
        .collection("mahabharat-bookorder")
        .orderBy("timestamp", "desc")
        .get();
      const totalRecords = totalRecordsSnapshot.size;
      const allRecords = totalRecordsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return res.status(200).json({
        message: "Fetched total registered count and all records successfully!",
        totalRecords,
        allRecords,
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

exports.getAllUdayanmantriBookOrderData = onRequest(async (req, res) => {
  cors(req, res, async () => {
    const firestore = getFirestore();

    try {
      const totalRecordsSnapshot = await firestore
        .collection("udayanmantri-bookorder")
        .orderBy("timestamp", "desc")
        .get();
      const totalRecords = totalRecordsSnapshot.size;
      const allRecords = totalRecordsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return res.status(200).json({
        message: "Fetched total registered count and all records successfully!",
        totalRecords,
        allRecords,
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
      const { ["संपर्क नंबर"]: mobile } = req.body;

      await getFirestore()
        .collection("self-details")
        .doc(`${mobile}`)
        .set({
          ...data,
          timestamp: Date.now(),
        });

      return res.status(200).json({
        message: "selfDetails submitted successfully!",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "An error occurred while processing your request.",
        error: error.message,
      });
    }
  });
});

exports.submitComment = onRequest((req, res) => {
  return cors(req, res, async () => {
    const firestore = getFirestore();
    const resend = new Resend("re_KeYyAfSV_NANX2XhQWXzYPZp7VAxhZJdK");

    if (req.method !== "POST") {
      return res.status(405).json({
        success: false,
        error: "Method not allowed. Use POST.",
      });
    }

    try {
      const data = req.body;

      // Store comment in Firestore
      const commentRef = await firestore.collection("comments").add(data);

      // Get the created comment with ID
      const createdComment = {
        id: commentRef.id,
        ...data,
        timestamp: new Date().toLocaleString(),
      };

      let emailResult = null;
      try {
        emailResult = await resend.emails.send({
          from: "Shasan Bhakti Ki Anjali <onboarding@resend.dev>",
          to: ["pratik.bagadia@email.adhyatmparivar.com"],
          subject: `New Comment on ${data.photoName || "Photo"}`,
          html: `<div style="max-width: 500px; margin: 1rem; padding: 1rem; background-color: #f1f5f9; border-radius: 0.75rem; box-shadow: 0 2px 6px rgba(0,0,0,0.1); font-family: sans-serif;">
  <div style="font-weight: bold; color: #1f2937;">@${data.username}</div>
  <div style="color: #64748b; font-size: 0.875rem; margin-bottom: 0.5rem;">
    Photo: <span style="font-style: italic;">${data.photoName || 'Unknown Photo'}</span>
  </div>
  <div style="font-size: 1rem; color: #111827; line-height: 1.5;">"${data.comment}"</div>
  <div 
    id="copy-id" 
    onclick="navigator.clipboard.writeText('${commentRef.id}').then(() => alert('Copied ID: ${commentRef.id}'))" 
    style="margin-top: 1rem; font-size: 0.875rem; color: #16a34a; cursor: pointer; text-decoration: underline;"
  >
    ID: ${commentRef.id}
  </div>
</div>
`,
        });

        console.log("Email sent successfully:", emailResult);
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
        // Don't fail the entire operation if email fails
      }

      // Return success response with email status
      return res.status(200).json({
        success: true,
        message: "Comment submitted successfully",
        data: {
          commentId: commentRef.id,
          comment: createdComment,
        },
        emailSent: emailResult ? true : false,
        emailId: emailResult ? emailResult.id : null,
      });
    } catch (error) {
      console.error("Error submitting comment:", error);

      return res.status(500).json({
        success: false,
        error: "Internal server error",
        message: "Failed to submit comment",
      });
    }
  });
});

//get the comments data
exports.getAllComments = onRequest(async (req, res) => {
  cors(req, res, async () => {
    const firestore = getFirestore();

    try {
      const totalRecordsSnapshot = await firestore
        .collection("comments")
        .orderBy("timestamp", "desc")
        .get();
      const totalRecords =
        totalRecordsSnapshot.size > 0 ? totalRecordsSnapshot.size : 0;
      const allRecords = totalRecordsSnapshot.docs
        .filter((doc) => doc.data().isApproved === true)
        .map((doc) => ({ id: doc.id, ...doc.data() }));

      return res.status(200).json({
        message: "Fetched total comments count and all comments successfully!",
        totalRecords,
        allRecords,
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
















// Function to get user with their dikshit family members
// exports.getUserWithDikshitFamilyMembers = onRequest(async (req, res) => {
//   cors(req, res, async () => {
//     try {
//       const { userId } = req.body;

//       if (!userId) {
//         return res.status(400).json({
//           success: false,
//           message: "User ID is required",
//         });
//       }

//       const db = getFirestore();

//       const userDoc = await db.collection("users").doc(userId).get();

//       if (!userDoc.exists) {
//         return res.status(404).json({
//           success: false,
//           message: "User not found",
//         });
//       }

//       const userData = userDoc.data();

//       // Get dikshit family members
//       const dikshitFamilySnapshot = await db
//         .collection("dikshitDetails")
//         .where("userId", "==", userId)
//         .orderBy("dikshitdetailID")
//         .get();

//       const dikshitFamilyMembers = [];
//       dikshitFamilySnapshot.forEach((doc) => {
//         dikshitFamilyMembers.push({
//           id: doc.id,
//           ...doc.data(),
//         });
//       });

//       return res.status(200).json({
//         success: true,
//         user: userData,
//         dikshitFamilyMembers: dikshitFamilyMembers,
//       });
//     } catch (error) {
//       logger.error("Error fetching user data:", error);
//       return res.status(500).json({
//         success: false,
//         message: "Failed to fetch user data",
//         error: error.message,
//       });
//     }
//   });
// });

// // Function to query dikshit family members
// exports.queryDikshitFamilyMembers = onRequest(async (req, res) => {
//   cors(req, res, async () => {
//     try {
//       const {
//         dikshitName,
//         gurusName,
//         sansariRelation,
//         sadhuOrSadhvi,
//         registeredUserCity,
//         registeredUserName,
//         limit = 50,
//       } = req.body;

//       const db = getFirestore();
//       let query = db.collection("dikshitDetails");

//       // Apply filters
//       if (dikshitName) {
//         query = query
//           .where("dikshitName", ">=", dikshitName)
//           .where("dikshitName", "<=", dikshitName + "\uf8ff");
//       }

//       if (gurusName) {
//         query = query
//           .where("gurusName", ">=", gurusName)
//           .where("gurusName", "<=", gurusName + "\uf8ff");
//       }

//       if (sansariRelation) {
//         query = query.where("sansariRelation", "==", sansariRelation);
//       }

//       if (sadhuOrSadhvi) {
//         query = query.where("sadhuOrSadhvi", "==", sadhuOrSadhvi);
//       }

//       if (registeredUserCity) {
//         query = query.where("registeredUserCity", "==", registeredUserCity);
//       }

//       if (registeredUserName) {
//         query = query
//           .where("registeredUserName", ">=", registeredUserName)
//           .where("registeredUserName", "<=", registeredUserName + "\uf8ff");
//       }

//       query = query.limit(limit);

//       const snapshot = await query.get();
//       const results = [];

//       snapshot.forEach((doc) => {
//         results.push({
//           id: doc.id,
//           ...doc.data(),
//         });
//       });

//       return res.status(200).json({
//         success: true,
//         results: results,
//         count: results.length,
//       });
//     } catch (error) {
//       logger.error("Error querying dikshit family members:", error);
//       return res.status(500).json({
//         success: false,
//         message: "Failed to query dikshit family members",
//         error: error.message,
//       });
//     }
//   });
// });