import ExistingFormsSection from "../components/forms/ExistingFormsSection";
import NewFormSection from "../components/forms/NewFormSection";
import "./forms-page.css";

export default function FormsPage() {
  return (
    <>
      <FormsNav />
      <section className="forms__body_content">
        <NewFormSection />
      </section>
      <section>
        <ExistingFormsSection />
      </section>
    </>
  );
}

function FormsNav() {
  return (
    <nav>
      <span>Formularios</span>
    </nav>
  );
}
