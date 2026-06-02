import "./contact.css";

function Contact() {
  return (
    <div className="contact-page">

      <h1 className="contact-title">Contact Our Team</h1>
      <p className="contact-subtitle">
        For any queries regarding our platform feel free to contact our team members.
      </p>

      <div className="contact-container">

        <div className="contact-card">
          <h3>Mansi Kawale</h3>
          <p>Email: mansikawle24@gmail.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Role: Project Developer</p>
        </div>

        <div className="contact-card">
          <h3>Vaidehi Shinde</h3>
          <p>Email: vaidehishinde@gmail.com</p>
          <p>Phone: +91 91234 56789</p>
          <p>Role: Frontend Developer</p>
        </div>

        <div className="contact-card">
          <h3>Tukaram Devkar</h3>
          <p>Email: tukaramdevkar@gmail.com</p>
          <p>Phone: +91 99876 54321</p>
          <p>Role: Backend Developer</p>
        </div>

      </div>

      <div className="contact-footer">
        <p>© 2026 LocalBiz Connect System </p>
      </div>

    </div>
  );
}

export default Contact;