export default function TitleView({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="form_designer__title_card">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
