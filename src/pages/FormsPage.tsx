import ExistingFormsSection from "../components/forms/ExistingFormsSection";
import NewFormSection from "../components/forms/NewFormSection";
import "./forms-page.css";

export default function FormsPage() {
  return (
    <>
      <FormsNav />
      <main className="forms__page">
        <section className="forms__body_content">
          <NewFormSection />
        </section>
        <section className="forms__body_content">
          <ExistingFormsSection />
        </section>
      </main>
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
