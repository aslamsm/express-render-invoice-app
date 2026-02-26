import "./MainSection.css";
function MainSection() {
  return (
    <main>
      <section id="articles">
        <h2>Latest Articles</h2>

        <article>
          <h3 className="text-primary">Why Semantic HTML Matters</h3>
          <p>
            Semantic tags improve accessibility, SEO, and developer
            understanding. Use tags like <code>&lt;section&gt;</code> and
            <code>&lt;article&gt;</code> wisely.
          </p>
        </article>

        <article>
          <h3>Getting Started with Web Design</h3>
          <p>
            Learn how to structure your page properly using semantic HTML and
            CSS to build beautiful layouts.
          </p>
        </article>
      </section>

      <section id="tutorials">
        <h2>Web Design Tutorials</h2>

        <article>
          <h3>HTML Basics</h3>
          <p>
            This tutorial covers the building blocks of HTML, including
            elements, tags, and structure.
          </p>
        </article>

        <article>
          <h3>CSS Box Model Explained</h3>
          <p>
            Understand how padding, border, and margin interact in the CSS box
            model.
          </p>
        </article>
      </section>
    </main>
  );
}
export default MainSection;
