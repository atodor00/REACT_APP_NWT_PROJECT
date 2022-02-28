import { useEffect } from "react";

function ContactAbout({ isLoged, name }) {
  return (
    <div className="centerDivClass">
      <h2>Tko smo mi?</h2>
      <p>
        {isLoged && <>Pozdrav kolega {name}</>}
        Naš tim (ja) ima nevjerovatnu želju da prođe <strong> nwt </strong>
        kolegiji na fesb fakultetu premda ima mnogo bug-ova no sve se da
        riješiti :)
      </p>
      <div>
        <h3>Kontakt:</h3>
        <p>E-mail: atodor00@fesb.hr</p>
      </div>
      <p>
        Hvala i lijep pozdrav
        <br></br>
      </p>
    </div>
  );
}

export default ContactAbout;
