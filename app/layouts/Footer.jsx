import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-purple mt-10 font-Teko text-gray-600 p-6 text-center relative   antialiased">
      <h2 className="text-lg font-semibold mb-4">...अध्यात्म परिवार मुख्य सदन...</h2>
      
      <div className="flex text-base  justify-between flex-col md:flex-row">
        <div className="mb-4 md:mb-0">
          <h3 className="font-bold mb-2">::: सुरत :::</h3>
          <p>अध्यात्म भवन,</p>
          <p>तीसरी मंजिल, आनंद श्रावक आराधना भवन,</p>
          <p>संजीवकुमार ओडिटोरियम के पास, पाल, सुरत - 395 009.</p>
          <p className="mt-2">M.7676 76 96 00</p>
        </div>
        
        <div className="mb-4 md:mb-0">
          <h3 className="font-bold mb-2">::: मुंबई :::</h3>
          <p>संभव दर्शन, ग्राउन्ड फ्लोर,</p>
          <p>हेमुकलानी मेइन रोड, ईरानी वाडी,</p>
          <p>कांदीवली वेस्ट, मुंबई - 400 067</p>
          <p className="mt-2">M.844 844 40 50</p>
        </div>
        
        <div>
          <h3 className="font-bold mb-2">::: अमदावाद :::</h3>
          <p>वल्लभ अपार्टमेन्ट,</p>
          <p>ग्राउन्ड फ्लोर, स्कारलेट कोम्प्लेक्स के पीछे,</p>
          <p>अंकुर स्कूल के सामने, फतेपुरा, पालडी, अमदावाद - 380 007.</p>
          <p className="mt-2">M.72270 70704</p>
        </div>
      </div>
      
      <p className="mt-6 text-lg font-semibold">अध्यात्म परिवार के बारे में अधिक जानकारी हेतु... M.844 844 40 50</p>
    </footer>
  );
};

export default Footer;