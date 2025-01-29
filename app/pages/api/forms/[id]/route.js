export default function handler(req, res) {
    const { id } = req.query;
  
    const forms = {
      "123": {
        name: "Contact Us",
        fields: [
          { id: "name", type: "text", label: "Full Name", required: true },
          { id: "email", type: "email", label: "Email Address", required: true },
          { id: "message", type: "textarea", label: "Message", required: false },
        ],
      },
      "456": {
        name: "Feedback Form",
        fields: [
          { id: "feedback", type: "textarea", label: "Your Feedback", required: true },
        ],
      },
    };
  
    const form = forms[id];
  
    if (form) {
      res.status(200).json(form);
    } else {
      res.status(404).json({ error: "Form not found" });
    }
  }
  