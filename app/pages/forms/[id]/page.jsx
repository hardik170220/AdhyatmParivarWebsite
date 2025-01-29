import FormTempalte from "../../../_components/FormTemplate"
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
    "789": {
        name: "Updhan form",
        fields: [
          { id: "name", type: "text", label: "Full Name", required: true },
          { id: "email", type: "email", label: "Email Address", required: true },
          { id: "message", type: "textarea", label: "Message", required: false },
        ],
      },
  };
  
  export function generateStaticParams() {
    return Object.keys(forms).map((id) => ({ id }));
  }
  
  async function fetchForm(id) {
    // Fetch the form data using the id passed from the route
    const form = forms[id];
    return form || null;
  }
  
  export default async function FormPage({ params }) {
    const { id } = params;
    const formData = await fetchForm(id);
  
    if (!formData) {
      return <div>Form not found</div>;
    }
  
    return (
      <FormTempalte formData={formData}/>
    );
  }
  